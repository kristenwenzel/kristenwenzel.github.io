import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import axios from 'axios'; // https://github.com/axios/axios HTTP requests
import chroma from 'chroma-js'; // https://github.com/gka/chroma.js Chroma color library
import regression from 'regression'; // https://github.com/Tom-Alexander/regression-js
import stats from 'stats-lite'; // https://github.com/brycebaril/node-stats-lite

// Turf.js tools
import interpolate from '@turf/interpolate';
import * as meta from '@turf/meta';
import * as helpers from '@turf/helpers';
import centroid from '@turf/centroid';
import collect from '@turf/collect';
import nearestPoint from '@turf/nearest-point';

import './map.css';

class Map extends Component {
  constructor(props) {
    super(props);

    // TODO: Changes to regression settings should trigger a reset; re-process current results layer, if any
    // This should probably not be in state, but just a regular variable updated with the k-value handler
    this.state = {
      reset: false
    };

    // References to the map and legends
    this.map = null;
    this.residualsLegend = null;
    this.wellsLegend = null;
    this.cancerLegend = null;
    this.nitrateLegend = null;

    // Arrays for caching data
    this.tracts = null;
    this.wells = null;
    this.cancerGrid = null;
    this.nitrateGrid = null;

    // Cache Leaflet layers for easy adding/removing
    this.tractsLayer = null;
    this.wellsLayer = null;
    this.cancerGridLayer = null;
    this.nitrateGridLayer = null;
    this.regressionLayer = null;

    // Default marker style
    this.defaultMarkerStyle = {
      radius: 4,
      fillColor: '#0000ff',
      color: '#ffffff',
      weight: 0,
      opacity: 0.5,
      fillOpacity: 0.75,
      pane: 'markerPane'
    };

    // Default polygon style
    this.defaultPolygonStyle = {
      fillColor: '#0000ff',
      color: '#0000ff',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.2,
      pane: 'overlayPane'
    };

    // Default results polygon style
    this.defaultResultsStyle = {
      fillColor: '#0000ff',
      color: '#0000ff',
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.5,
      pane: 'resultsPane'
    };
  }

  // Map component was mounted -> create the Leaflet map
  componentDidMount() {
    this.createMap();
  }

  // State changed -> see if anything needs to be loaded or unloaded
  componentDidUpdate() {
    // Show tracts layer?
    (this.props.showTractsLayer) ? this.loadTracts() : this.unloadTracts();

    // Show well layer?
    (this.props.showWellsLayer) ? this.loadWells() : this.unloadWells();

    // Show a results layer?
    (this.props.showRegressionLayer) ? this.loadRegressionLayer() : this.unloadRegressionLayer();
    (this.props.showNitrateLayer) ? this.loadNitrateGrid() : this.unloadNitrateGrid();
    (this.props.showCancerLayer) ? this.loadCancerGrid() : this.unloadCancerGrid();
  }

  // HTTP request to retrieve census tract polygons
  getTracts() {
    return axios.get('http://206.189.163.171:3001/gis/tracts');
  }

  // HTTP request to retrieve well sample points
  getWells() {
    return axios.get('http://206.189.163.171:3001/gis/wells');
  }

  // Is something loading? -> update the App state to show the loading box
  // FIXME: This is horribly broken, as changing state on App updates all components; should have used Redux to manage state
  // isLoading(show) {
  //   this.props.onLoading(show);
  // }

  // Called after the map is created to initialize starting layers
  loadStartingLayers() {
    const that = this;
    axios.all([this.getTracts(), this.getWells()])
      .then(axios.spread(function (tractsResult, wellsResult) {
        that.tracts = tractsResult.data[0].jsonb_build_object;
        that.wells = wellsResult.data[0].jsonb_build_object;

        that.loadTracts();
        that.loadWells();
      })).catch((error) => {
        console.error(error);
        // TODO: Add an error message for the user
      });
  }

  // Load the census tract polygons layer
  loadTracts() {
    if (!this.tractsLayer) {
      const polygonStyle = this.defaultPolygonStyle; // Get the default style for polygons

      this.tractsLayer = L.geoJSON(this.tracts, {
        style() {
          return polygonStyle;
        }
      }).addTo(this.map);
    }
  }

  // Load the well sample points layer
  loadWells() {
    if (!this.wellsLayer) {
      const markerStyle = this.defaultMarkerStyle; // Get the default style for markers

      this.wellsLayer = L.geoJSON(this.wells, {
        pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, markerStyle);
        }
      }).addTo(this.map);

      // Create a legend for the layer
      this.createWellsLegend();
    }
  }

  // Load the layer for the interpolated cancer rates grid
  loadCancerGrid() {
    // Check if the grid needs to be re-interpolated -> prevents double render of layer on state change
    if (!this.cancerGridLayer || this.state.reset) {
      // Interpolate the grid of cancer values
      this.interpolateCancer();

      // Grab all cancer rate values from the grid
      const gridValues = [];
      meta.featureEach(this.cancerGrid, (currentFeature, featureIndex) => {
        gridValues.push(currentFeature.properties.canrate);
      });

      // Get the min/max values for the color scale domain
      const domainMin = Math.min(...gridValues);
      const domainMax = Math.max(...gridValues);

      const polygonStyle = this.defaultResultsStyle; // Get the default style for polygons
      const limits = chroma.limits(gridValues, 'k', 12); // Use the k-means method to classify the grid values
      const scale = chroma.scale('YlGnBu').domain([domainMin, domainMax]).classes(limits); // Create the Chroma color scale
      const colors = chroma.scale('YlGnBu').domain([domainMin, domainMax]).colors(12); // Grab scale colors for the legend

      // Create a legend for the layer
      this.createCancerLegend(colors);

      // Create a new Leaflet geoJSON layer
      this.cancerGridLayer = L.geoJSON(this.cancerGrid, {
        style(feature) {
          // Dynamically set fill color based on nitrate value
          const color = scale(feature.properties.canrate).hex();
          polygonStyle.fillColor = color;
          polygonStyle.color = color;

          return polygonStyle;
        }
      }).bindTooltip((ele) => {
        return '<strong>Cancer Incidences:</strong> ' + parseFloat(ele.feature.properties.canrate).toFixed(5) + '<br/>';
      }, {
        sticky: true,
        direction: 'top',
        offset: [0, -2]
      }).addTo(this.map);
    }

    // Remove other layers if necessary
    this.unloadRegressionLayer();
    this.unloadNitrateGrid();
  }

  // Load the layer for the interpolated nitrate rates grid
  loadNitrateGrid() {
    // Check if the grid needs to be re-interpolated -> prevents double render of layer on state change
    if (!this.nitrateGridLayer || this.state.reset) {
      // Interpolate the grid of nitrate values
      this.interpolateNitrate();

      // Grab all nitrate rate values from the grid
      const gridValues = [];
      meta.featureEach(this.nitrateGrid, (currentFeature, featureIndex) => {
        gridValues.push(currentFeature.properties.nitr_ran);
      });

      // Get the min/max values for the color scale domain
      const domainMin = Math.min(...gridValues);
      const domainMax = Math.max(...gridValues);

      const polygonStyle = this.defaultResultsStyle; // Get the default style for polygons
      const limits = chroma.limits(gridValues, 'k', 12); // Use the k-means method to classify the grid values
      const scale = chroma.scale('YlGnBu').domain([domainMin, domainMax]).classes(limits); // Create the Chroma color scale
      const colors = chroma.scale('YlGnBu').domain([domainMin, domainMax]).colors(12); // Grab scale colors for the legend

      // Create a legend for the layer
      this.createNitrateLegend(colors);

      // Create a new Leaflet geoJSON layer
      this.nitrateGridLayer = L.geoJSON(this.nitrateGrid, {
        style(feature) {
          // Dynamically set fill color based on nitrate value
          const color = scale(feature.properties.nitr_ran).hex();
          polygonStyle.fillColor = color;
          polygonStyle.color = color;

          return polygonStyle;
        }
      }).bindTooltip((ele) => {
        return '<strong>Nitrate Value:</strong> ' + parseFloat(ele.feature.properties.nitr_ran).toFixed(5) + '<br/>';
      }, {
        sticky: true,
        direction: 'top',
        offset: [0, -2]
      }).addTo(this.map);
    }

    // Remove other layers if necessary
    this.unloadRegressionLayer();
    this.unloadCancerGrid();
  }

  unloadTracts() {
    if (this.tractsLayer) {
      this.props.toggleTractsLayer(false);
      this.map.removeLayer(this.tractsLayer);
      this.tractsLayer = null;
    }
  }

  unloadWells() {
    if (this.wellsLayer) {
      this.props.toggleWellsLayer(false);
      this.map.removeLayer(this.wellsLayer);
      this.wellsLayer = null;
      this.unloadWellsLegend();
    }
  }

  unloadCancerGrid() {
    if (this.cancerGridLayer) {
      this.props.toggleCancerLayer(false);
      this.map.removeLayer(this.cancerGridLayer);
      this.cancerGridLayer = null;
      this.unloadCancerLegend();
    }
  }

  unloadNitrateGrid() {
    if (this.nitrateGridLayer) {
      this.props.toggleNitrateLayer(false);
      this.map.removeLayer(this.nitrateGridLayer);
      this.nitrateGridLayer = null;
      this.unloadNitrateLegend();
    }
  }

  unloadRegressionLayer() {
    if (this.regressionLayer) {
      this.props.toggleRegressionLayer(false);
      this.map.removeLayer(this.regressionLayer);
      this.regressionLayer = null;
      this.unloadResidualsLegend();
    }
  }

  unloadResidualsLegend() {
    if (this.residualsLegend) {
      this.residualsLegend.remove();
      this.residualsLegend = null;
    }
  }

  unloadWellsLegend() {
    if (this.wellsLegend) {
      this.wellsLegend.remove();
      this.wellsLegend = null;
    }
  }

  unloadCancerLegend() {
    if (this.cancerLegend) {
      this.cancerLegend.remove();
      this.cancerLegend = null;
    }
  }

  unloadNitrateLegend() {
    if (this.nitrateLegend) {
      this.nitrateLegend.remove();
      this.nitrateLegend = null;
    }
  }

  interpolateCancer(_gridType = 'hex') {
    // Array to save the centroid points of each tract
    const points = [];

    // Get the centroid of each tract -> save to the points array
    meta.featureEach(this.tracts, (currentFeature, featureIndex) => {
      points.push(centroid(currentFeature, currentFeature.properties));
    });

    // Convert the points array into a proper feature collection
    const centroids = helpers.featureCollection(points);

    // Create the grid of interpolated nitrate values
    const options = {
      gridType: _gridType,
      property: 'canrate',
      units: 'kilometers',
      weight: 1
    };
    const cancerGrid = interpolate(centroids, this.props.kValue, options);

    this.cancerGrid = cancerGrid;
  }

  interpolateNitrate(_gridType = 'hex') {
    // Create the grid of interpolated nitrate values
    const options = {
      gridType: _gridType,
      property: 'nitr_ran',
      units: 'kilometers',
      weight: 1
    };
    const nitrateGrid = interpolate(this.wells, this.props.kValue, options);

    this.nitrateGrid = nitrateGrid;
  }

  aggregateNitrate() {
    if (!this.nitrateGrid) this.interpolateNitrate();

    // Aggregate nitrate values by tract polygon
    const collected = collect(this.tracts, this.nitrateGrid, 'nitr_ran', 'values');

    meta.featureEach(collected, (currentFeature, featureIndex) => {
      const length = currentFeature.properties.values.length;

      // If tract is so small that it has no interpolate values to aggregate -> grab the nearest value
      if (length === 0) {
        // Find the center of the tract, and then get the nearest value from the nitrate grid
        const center = centroid(currentFeature, currentFeature.properties);
        const nearest = nearestPoint(center, this.nitrateGrid);
        currentFeature.properties.nitrate = nearest.properties.nitr_ran;
      }
      else {
        // Average the collected nitrate values for the tract
        const sum = currentFeature.properties.values.reduce((total, num) => (total + num), 0);
        currentFeature.properties.nitrate = sum / length;
      }

      // Delete the temporary collected values array
      delete currentFeature.properties.values;
    });

    // Update tracts with the aggregated nitrate value
    this.tracts = collected;
  }

  loadRegressionLayer() {
    if (!this.regressionLayer || this.state.reset) {
      // Interpolate nitrate values
      this.interpolateNitrate('point');

      // Aggregate nitrate grid values by tract
      this.aggregateNitrate();

      // Regression
      const regressionInput = [];
      meta.featureEach(this.tracts, (currentFeature, featureIndex) => {
        regressionInput.push([currentFeature.properties.nitrate, currentFeature.properties.canrate]);
      });

      const result = regression.linear(regressionInput, { precision: 8 });
      const residuals = [];

      meta.featureEach(this.tracts, (currentFeature, featureIndex) => {
        currentFeature.properties.predicted = result.points[featureIndex][1];

        // Residual = Observed - Predicted
        const residual = (currentFeature.properties.canrate - result.points[featureIndex][1]).toFixed(5);
        currentFeature.properties.residual = residual;

        residuals.push(parseFloat(residual));
      });

      // Calculate standard deviation breaks for residuals -> use for Chroma class breaks
      const stdev = stats.stdev(residuals).toFixed(5);
      const stdevHalf = (stdev / 2.0).toFixed(5);
      const median = stats.median(residuals).toFixed(5);
      // const median = 0;
      // FIXME: Shouldn't this be 0? A perfect model would result in residuals of 0?

      // FIXME: Addition in array was leading to string concatenation, so parseFloat everything for now!
      const chromaClasses = [
        -999,
        parseFloat(median) - parseFloat(2.0 * stdev) - parseFloat(stdevHalf),
        parseFloat(median) - parseFloat(stdev) - parseFloat(stdevHalf),
        parseFloat(median) - parseFloat(stdevHalf),
        parseFloat(median) + parseFloat(stdevHalf),
        parseFloat(median) + parseFloat(stdev) + parseFloat(stdevHalf),
        parseFloat(median) + parseFloat(2.0 * stdev) + parseFloat(stdevHalf),
        999
      ];

      const polygonStyle = this.defaultResultsStyle; // Get the default style for polygons

      // Define colors manually; using a domain to flip the color scale was interfering with the custom classes
      const scale = chroma.scale(['313695', '649ac7', 'bde2ee', 'ffffbf', 'fdbf71', 'ea593a', 'a50026']).classes(chromaClasses);

      this.regressionLayer = L.geoJSON(this.tracts, {
        style(feature) {
          // Dynamically set fill color based on nitrate value
          const color = scale(feature.properties.residual).hex();
          polygonStyle.fillColor = color;
          polygonStyle.color = color;

          return polygonStyle;
        }
      }).bindTooltip((ele) => {
        let tooltip = '<strong>Nitrate Value:</strong> ' + parseFloat(ele.feature.properties.nitrate).toFixed(5) + '<br/>';
        tooltip += '<strong>Cancer Incidences:</strong> ' + parseFloat(ele.feature.properties.canrate).toFixed(2) + '<br/>';
        tooltip += '<strong>Residual:</strong> ' + parseFloat(ele.feature.properties.residual).toFixed(5);
        return tooltip;
      }, {
        sticky: true,
        direction: 'top',
        offset: [0, -2]
      }).addTo(this.map);
    }

    // Create a legend for the residuals layer
    this.createResidualsLegend();

    // Remove other layers if necessary
    this.unloadCancerGrid();
    this.unloadNitrateGrid();
  }

  // Create a legend for the regression result
  createResidualsLegend() {
    if (!this.residualsLegend) {
      this.residualsLegend = L.control({ position: 'bottomleft' });

      this.residualsLegend.onAdd = () => {
        const div = L.DomUtil.create('div', 'legend');

        let content = '<div class="title">Standard Deviation<br/>of Residuals (&sigma;)</div>';
        content += '<div><table class="residuals-legend">';
        content += '<tr><td class="scale scale-0"></td><td>< -2.5</td></tr>';
        content += '<tr><td class="scale scale-1"></td><td>-2.5 to -1.5</td></tr>';
        content += '<tr><td class="scale scale-2"></td><td>-1.5 to -0.5</td></tr>';
        content += '<tr><td class="scale scale-3"></td><td>-0.5 to 0.5</td></tr>';
        content += '<tr><td class="scale scale-4"></td><td>0.5 to 1.5</td></tr>';
        content += '<tr><td class="scale scale-5"></td><td>1.5 to 2.5</td></tr>';
        content += '<tr><td class="scale scale-6"></td><td>> 2.5</td></tr>';
        content += '</table></div>';

        div.innerHTML = content;
        return div;
      };

      this.residualsLegend.addTo(this.map);
    }
    else {
      this.residualsLegend.addTo(this.map);
    }
  }

  // Create a simple legend for the well sample points layer
  createWellsLegend() {
    if (!this.wellsLegend) {
      this.wellsLegend = L.control({ position: 'bottomleft' });

      this.wellsLegend.onAdd = () => {
        const div = L.DomUtil.create('div', 'legend');

        let content = '<div><table class="wells-legend">';
        content += '<tr><td class="point-scale"></td><td> Nitrate Sample Point</td></tr>';
        content += '</table></div>';

        div.innerHTML = content;
        return div;
      };

      this.wellsLegend.addTo(this.map);
    }
    else {
      this.wellsLegend.addTo(this.map);
    }
  }

  // Create a dynamic legend for the interpolated cancer layer
  createCancerLegend(colors) {
    // Is there already a legend? -> unload it
    (this.cancerLegend) && this.unloadCancerLegend();

    this.cancerLegend = L.control({ position: 'bottomleft' });

    this.cancerLegend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend');

      let content = '<div class="title">Cancer Incidences</div>';
      content += '<div><table class="generic-legend">';
      for (let i = 0; i < colors.length; i++) {
        content += '<tr><td class="scale" style="background-color:' + colors[i] + '"></td>';
        (i === 0) && (content += '<td> Low</td>');
        (i === colors.length - 1) && (content += '<td> High</td>');
        content += '</tr>';
      }
      content += '</table></div>';

      div.innerHTML = content;
      return div;
    };

    this.cancerLegend.addTo(this.map);
  }

  // Create a dynamic legend for the interpolated nitrate layer
  createNitrateLegend(colors) {
    // Is there already a legend? -> unload it
    (this.nitrateLegend) && this.unloadNitrateLegend();

    this.nitrateLegend = L.control({ position: 'bottomleft' });

    this.nitrateLegend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend');

      let content = '<div class="title">Nitrate Values</div>';
      content += '<div><table class="generic-legend">';
      for (let i = 0; i < colors.length; i++) {
        content += '<tr><td class="scale" style="background-color:' + colors[i] + '"></td>';
        (i === 0) && (content += '<td> Low</td>');
        (i === colors.length - 1) && (content += '<td> High</td>');
        content += '</tr>';
      }
      content += '</table></div>';

      div.innerHTML = content;
      return div;
    };

    this.nitrateLegend.addTo(this.map);
  }

  createMap() {
    // Create the Leaflet map
    this.map = L.map('map', {
      doubleClickZoom: false
    }).setView([44.5, -90], 7);

    // Add the tile layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://mapbox.com">Mapbox</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1IjoiYXRobXBzbiIsImEiOiJjajZ5bWVjOHgwNGp4MnhzZzMxa2pkeDBiIn0.MIHVmqU0AzpJTACceAr4Zg'
    }).addTo(this.map);

    // Create Leaflet pane to display results layer
    this.map.createPane('resultsPane');
    this.map.getPane('resultsPane').style.zIndex = 450;

    this.loadStartingLayers();
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

Map.propTypes = {
  kValue: PropTypes.number.isRequired,
  showTractsLayer: PropTypes.bool.isRequired,
  toggleTractsLayer: PropTypes.func.isRequired,
  showWellsLayer: PropTypes.bool.isRequired,
  toggleWellsLayer: PropTypes.func.isRequired,
  showRegressionLayer: PropTypes.bool.isRequired,
  toggleRegressionLayer: PropTypes.func.isRequired,
  showNitrateLayer: PropTypes.bool.isRequired,
  toggleNitrateLayer: PropTypes.func.isRequired,
  showCancerLayer: PropTypes.bool.isRequired,
  toggleCancerLayer: PropTypes.func.isRequired
};

export default Map;
