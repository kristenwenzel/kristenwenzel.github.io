#js file for tools, Kristen Wenzel 2018

# -*- coding: utf-8 -*-
# ---------------------------------------------------------------------------
# pipedraw.py
# Created on: 2018-09-24 07:00:25.00000
#   (generated by ArcGIS/ModelBuilder)
# Usage: pipedraw <Input_From_Fulcrum__Pipe_Connections_Table> <wastewater_acoustic_sounding_manhole_inspection> <pipeconn_lines_material_mismatch__3_> <pipeconn_lines_LATERALS__3_> <pipeconn_lines_MAINS__3_> <pipeconn_lines_diameter_mismatch__3_> <pipeconn_lines_STUBOUTS__2_> 
# Description: 
# ---------------------------------------------------------------------------
# Import Tkinter
from Tkinter import *
# Import arcpy module
import arcpy

# Script arguments

Input_From_Fulcrum__Pipe_Connections_Table = arcpy.GetParameterAsText(0)
if Input_From_Fulcrum__Pipe_Connections_Table == '#' or not Input_From_Fulcrum__Pipe_Connections_Table:
    Input_From_Fulcrum__Pipe_Connections_Table = "wastewater_acoustic_sounding_manhole_inspection_pipe_connectivity_" # provide a default value if unspecified

wastewater_acoustic_sounding_manhole_inspection = arcpy.GetParameterAsText(1)
if wastewater_acoustic_sounding_manhole_inspection == '#' or not wastewater_acoustic_sounding_manhole_inspection:
    wastewater_acoustic_sounding_manhole_inspection = "wastewater_acoustic_sounding_manhole_inspection" # provide a default value if unspecified

pipeconn_lines_material_mismatch__3_ = arcpy.GetParameterAsText(2)
if pipeconn_lines_material_mismatch__3_ == '#' or not pipeconn_lines_material_mismatch__3_:
    pipeconn_lines_material_mismatch__3_ = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_material_mismatch" # provide a default value if unspecified

pipeconn_lines_LATERALS__3_ = arcpy.GetParameterAsText(3)
if pipeconn_lines_LATERALS__3_ == '#' or not pipeconn_lines_LATERALS__3_:
    pipeconn_lines_LATERALS__3_ = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_LATERALS" # provide a default value if unspecified

pipeconn_lines_MAINS__3_ = arcpy.GetParameterAsText(4)
if pipeconn_lines_MAINS__3_ == '#' or not pipeconn_lines_MAINS__3_:
    pipeconn_lines_MAINS__3_ = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_MAINS" # provide a default value if unspecified

pipeconn_lines_diameter_mismatch__3_ = arcpy.GetParameterAsText(5)
if pipeconn_lines_diameter_mismatch__3_ == '#' or not pipeconn_lines_diameter_mismatch__3_:
    pipeconn_lines_diameter_mismatch__3_ = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_diameter_mismatch" # provide a default value if unspecified

pipeconn_lines_STUBOUTS__2_ = arcpy.GetParameterAsText(6)
if pipeconn_lines_STUBOUTS__2_ == '#' or not pipeconn_lines_STUBOUTS__2_:
    pipeconn_lines_STUBOUTS__2_ = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_STUBOUTS" # provide a default value if unspecified

# Local variables:
Temporary_Pipe_Connection_Output_Table = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\pipe_conn_table.xls"
Output_Pipe_Conn_Table_To_Main_Geodatabase = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn"
pipeconn__7_ = Output_Pipe_Conn_Table_To_Main_Geodatabase
pipeconn__4_ = wastewater_acoustic_sounding_manhole_inspection
TREKK_Connectivity__2_ = pipeconn__4_
pipeconn = TREKK_Connectivity__2_
pipeconn__5_ = pipeconn
pipeconn__2_ = pipeconn
pipeconn__3_ = pipeconn
pipeconn_duplicatecheck = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_duplicatecheck"
pipeconn_size_mismatch_check = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_size_mismatch_check"
pipeconn_material_mismatch_check = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_material_mismatch_check"
pipeconn_lines_merged__3_ = pipeconn__2_
pipeconn_could_not_draw = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_could_not_draw"
pipeconn_to_draw_out = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_to_draw_out"
pipeconn_lines_out = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out"
pipeconn_to_draw_in = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_to_draw_in"
pipeconn_lines_in = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in"
pipeconn_lines_merged = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_merged"
pipeconn_lines_material_mismatch = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_material_mismatch"
pipeconn_lines_LATERALS = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_LATERALS"
pipeconn_lines_MAINS = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_MAINS"
pipeconn_lines_diameter_mismatch = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_diameter_mismatch"
pipeconn_lines_STUBOUTS = "G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_STUBOUTS"

# Process: Table To Excel
arcpy.TableToExcel_conversion(Input_From_Fulcrum__Pipe_Connections_Table, Temporary_Pipe_Connection_Output_Table, "NAME", "CODE")

# Process: Excel To Table
arcpy.ExcelToTable_conversion(Temporary_Pipe_Connection_Output_Table, Output_Pipe_Conn_Table_To_Main_Geodatabase, "")

# Process: Join Field
arcpy.JoinField_management(Output_Pipe_Conn_Table_To_Main_Geodatabase, "fulcrum_parent_id", wastewater_acoustic_sounding_manhole_inspection, "fulcrum_id", "latitude;longitude;manhole_id_number")

# Process: Join Field (2)
arcpy.JoinField_management(pipeconn__7_, "connecting_manhole_id_number", wastewater_acoustic_sounding_manhole_inspection, "manhole_id_number", "latitude;longitude")

# Process: Add Field
arcpy.AddField_management(pipeconn__4_, "TREKK_ID", "TEXT", "", "", "30", "", "NULLABLE", "NON_REQUIRED", "")

# Process: Calculate Field
arcpy.CalculateField_management(TREKK_Connectivity__2_, "TREKK_ID", "calc(!direction_!, !manhole_id_number!, !connecting_manhole_id_number!)", "PYTHON_9.3", "def calc(x,y,z):\\n    if \"Out\" in x:\\n        return y + '_' + z\\n    else:\\n        return z + '_' + y")

# Process: Summary Statistics
arcpy.Statistics_analysis(pipeconn, pipeconn_duplicatecheck, "TREKK_ID COUNT", "TREKK_ID")

# Process: Join Field (3)
arcpy.JoinField_management(pipeconn, "TREKK_ID", pipeconn_duplicatecheck, "TREKK_ID", "COUNT_TREKK_ID")

# Process: Summary Statistics (3)
arcpy.Statistics_analysis(pipeconn, pipeconn_size_mismatch_check, "pipe_size_ COUNT", "TREKK_ID;pipe_size_")

# Process: Join Field (5)
arcpy.JoinField_management(pipeconn, "TREKK_ID", pipeconn_size_mismatch_check, "TREKK_ID", "COUNT_pipe_size_")

# Process: Summary Statistics (2)
arcpy.Statistics_analysis(pipeconn, pipeconn_material_mismatch_check, "pipe_material_ COUNT", "TREKK_ID;pipe_material_")

# Process: Join Field (4)
arcpy.JoinField_management(pipeconn, "TREKK_ID", pipeconn_material_mismatch_check, "TREKK_ID", "COUNT_pipe_material_")

# Process: Table Select (2)
arcpy.TableSelect_analysis(pipeconn__2_, pipeconn_could_not_draw, "latitude_1 IS NULL OR latitude_12 IS NULL")

# Process: Table Select (3)
arcpy.TableSelect_analysis(pipeconn__2_, pipeconn_to_draw_out, "(direction_ = 'Out ' AND latitude_1 IS NOT NULL AND latitude_12 IS NOT NULL)")

# Process: XY To Line (2)
arcpy.XYToLine_management(pipeconn_to_draw_out, pipeconn_lines_out, "longitude_1", "latitude_1", "longitude_12", "latitude_12", "0", "fulcrum_id", "GEOGCS['GCS_WGS_1984',DATUM['D_WGS_1984',SPHEROID['WGS_1984',6378137.0,298.257223563]],PRIMEM['Greenwich',0.0],UNIT['Degree',0.0174532925199433]];-400 -400 1000000000;-100000 10000;-100000 10000;8.98315284119522E-09;0.001;0.001;IsHighPrecision")

# Process: Table Select
arcpy.TableSelect_analysis(pipeconn__2_, pipeconn_to_draw_in, "(direction_ = 'In ' AND COUNT_TREKK_ID = 1 AND latitude_1 IS NOT NULL AND latitude_12 IS NOT NULL)")

# Process: XY To Line
arcpy.XYToLine_management(pipeconn_to_draw_in, pipeconn_lines_in, "longitude_12", "latitude_12", "longitude_1", "latitude_1", "0", "fulcrum_id", "GEOGCS['GCS_WGS_1984',DATUM['D_WGS_1984',SPHEROID['WGS_1984',6378137.0,298.257223563]],PRIMEM['Greenwich',0.0],UNIT['Degree',0.0174532925199433]];-400 -400 1000000000;-100000 10000;-100000 10000;8.98315284119522E-09;0.001;0.001;IsHighPrecision")

# Process: Merge
arcpy.Merge_management("G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out;G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in", pipeconn_lines_merged, "fulcrum_id \"fulcrum_id\" true true false 255 Text 0 0 ,First,#,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out,fulcrum_id,-1,-1,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in,fulcrum_id,-1,-1;latitude_1 \"latitude\" true true false 8 Double 0 0 ,First,#,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out,latitude_1,-1,-1,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in,latitude_1,-1,-1;longitude_1 \"longitude\" true true false 8 Double 0 0 ,First,#,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out,longitude_1,-1,-1,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in,longitude_1,-1,-1;latitude_12 \"latitude\" true true false 8 Double 0 0 ,First,#,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out,latitude_12,-1,-1,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in,latitude_12,-1,-1;longitude_12 \"longitude\" true true false 8 Double 0 0 ,First,#,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out,longitude_12,-1,-1,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in,longitude_12,-1,-1;Shape_Length \"Shape_Length\" false true true 8 Double 0 0 ,First,#,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_out,Shape_Length,-1,-1,G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_in,Shape_Length,-1,-1")

# Process: Join Field (6)
arcpy.JoinField_management(pipeconn_lines_merged, "fulcrum_id", pipeconn__2_, "fulcrum_id", "fulcrum_id;fulcrum_parent_id;fulcrum_record_id;pipe_number_;clock_position_;direction_;connecting_manhole_id_number;invert_depth_feet_;pipe_size_;pipe_material_;special_condition_;acoustic_sounding_complete;acoustic_sounding_test_number_;acoustic_sounding_score_;acoustic_sounding_date_;comments_;manhole_id_number;TREKK_ID;COUNT_TREKK_ID;COUNT_pipe_size_;COUNT_pipe_material_")

# Process: Select
arcpy.Select_analysis(pipeconn_lines_merged__3_, pipeconn_lines_material_mismatch, "COUNT_TREKK_ID <> COUNT_pipe_material_")

# Process: Merge Branch
arcpy.MergeBranch_management("G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_material_mismatch")

# Process: Select (3)
arcpy.Select_analysis(pipeconn_lines_merged__3_, pipeconn_lines_LATERALS, "TREKK_ID LIKE '%SL%'")

# Process: Merge Branch (2)
arcpy.MergeBranch_management("G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_LATERALS")

# Process: Select (4)
arcpy.Select_analysis(pipeconn_lines_merged__3_, pipeconn_lines_MAINS, "TREKK_ID NOT LIKE '%SL%' OR TREKK_ID NOT LIKE '%SO%'")

# Process: Merge Branch (3)
arcpy.MergeBranch_management("G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_MAINS")

# Process: Select (2)
arcpy.Select_analysis(pipeconn_lines_merged__3_, pipeconn_lines_diameter_mismatch, "COUNT_TREKK_ID <> COUNT_pipe_size_")

# Process: Merge Branch (4)
arcpy.MergeBranch_management("G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_diameter_mismatch")

# Process: Select (5)
arcpy.Select_analysis(pipeconn_lines_merged__3_, pipeconn_lines_STUBOUTS, "TREKK_ID LIKE '%SO%'")

# Process: Merge Branch (5)
arcpy.MergeBranch_management("G:\\ArcGIS\\Standards\\Tools_and_Scripts\\TempData_DO_NOT_DELETE\\TempQCQA.gdb\\pipeconn_lines_STUBOUTS")

