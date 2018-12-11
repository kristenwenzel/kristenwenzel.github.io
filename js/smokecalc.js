function getData(defect, smokeQuantity,tribArea, rainfallIntensity, cFactor){

    getII();
    getAbatementCost();

    function getII(defect, smokeQuantity,tribArea, rainfallIntensity, cFactor){

    var cFactor;
    var defect = document.getElementById('defect').value;
    var smokeQuantity = document.getElementById('smokeQuantity').value;

    if(defect =="1" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "1" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.73';
    }else if (defect == "1" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.95';
    }else if (defect == "2" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.15';
    }else if (defect == "2" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.33';
    }else if (defect == "2" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "3" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0';
    }else if (defect == "3" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0';
    }else if (defect == "3" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0';
    }else if (defect == "4"){
        document.getElementById('cFactor').value = '0.98';
    }else if (defect == "5"){
        document.getElementById('cFactor').value = '0.9';
    }else if (defect == "6" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "6" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "6" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.8';
    }else if (defect == "7"){
        document.getElementById('cFactor').value = '0.3';
    }else if (defect == "8" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "8" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "8" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.8';
    }else if (defect == "9"){
        document.getElementById('cFactor').value = '0';
    }else if (defect == "10"){
        document.getElementById('cFactor').value = '0.98';
    }else if (defect == "11" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.15';
    }else if (defect == "11" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.33';
    }else if (defect == "11" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "12"){
        document.getElementById('cFactor').value = '0.98';
    }else if (defect == "13" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.1';
    }else if (defect == "13" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "13" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.3';
    }else if (defect == "14" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.15';
    }else if (defect == "14" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.33';
    }else if (defect == "14" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "15"){
        document.getElementById('cFactor').value = '0.98';
    }else if (defect == "16" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.15';
    }else if (defect == "16" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.33';
    }else if (defect == "16" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "17" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "17" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "17" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.8';
    }else if (defect == "18" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.1';
    }else if (defect == "18" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "18" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "19" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.1';
    }else if (defect == "19" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "19" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "20" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.1';
    }else if (defect == "20" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "20" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "21" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "21" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "21" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.8';
    }else if (defect == "22" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.15';
    }else if (defect == "22" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.33';
    }else if (defect == "22" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "23" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "23" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.74';
    }else if (defect == "23" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.98';
    }else if (defect == "24" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.2';
    }else if (defect == "24" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.4';
    }else if (defect == "24" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.8';
    }else if (defect == "25" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.17';
    }else if (defect == "25" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.34';
    }else if (defect == "25" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.5';
    }else if (defect == "26" && smokeQuantity == "1"){
        document.getElementById('cFactor').value = '0.15';
    }else if (defect == "26" && smokeQuantity == "2"){
        document.getElementById('cFactor').value = '0.33';
    }else if (defect == "26" && smokeQuantity == "3"){
        document.getElementById('cFactor').value = '0.5';
    }else{
        document.getElementById('cFactor').value = 'NaN';
    }

    var tribArea = document.getElementById('tribArea').value;
    var rainfallIntensity = document.getElementById('rainfallIntensity').value;
    var cFactor = document.getElementById('cFactor').value;

    var msg = (tribArea * cFactor * rainfallIntensity)*.0104;

    document.getElementById('iIElimination').innerHTML = msg;
        }

    function getAbatementCost(defect){
        var defect = document.getElementById('defect').value;
        if (defect == "1"){
            document.getElementById('Abatement').innerHTML = '$3,600.00';
        }else if (defect == '2'){
            document.getElementById('Abatement').innerHTML = "$650.00";
        }else if (defect == '3'){
            document.getElementById('Abatement').innerHTML = "Need Further Investigation";
        }else if (defect == '4'){
            document.getElementById('Abatement').innerHTML = "$550.00";
        }else if (defect == '5'){
            document.getElementById('Abatement').innerHTML = "$4,000.00";
        }else if (defect == '6'){
            document.getElementById('Abatement').innerHTML = "$2,000.00";
        }else if (defect == '7'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '8'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '9'){
            document.getElementById('Abatement').innerHTML = "Need Further Investigation";
        }else if (defect == '10'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '11'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '12'){
            document.getElementById('Abatement').innerHTML = "$650.00";
        }else if (defect == '13'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '14'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '15'){
            document.getElementById('Abatement').innerHTML = "$3,000.00";
        }else if (defect == '16'){
            document.getElementById('Abatement').innerHTML = "$3,000.00";
        }else if (defect == '17'){
            document.getElementById('Abatement').innerHTML = "$400.00";
        }else if (defect == '18'){
            document.getElementById('Abatement').innerHTML = "$200.00";
        }else if (defect == '19'){
            document.getElementById('Abatement').innerHTML = "$400.00";
        }else if (defect == '20'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '21'){
            document.getElementById('Abatement').innerHTML = "$3,000.00";
        }else if (defect == '22'){
            document.getElementById('Abatement').innerHTML = "$3,000.00";
        }else if (defect == '23'){
            document.getElementById('Abatement').innerHTML = "$3,000.00";
        }else if (defect == '24'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else if (defect == '25'){
            document.getElementById('Abatement').innerHTML = "$3,000.00";
        }else if (defect == '26'){
            document.getElementById('Abatement').innerHTML = "$2,500.00";
        }else{
            document.getElementById('Abatement').innerHTML = "Need Further Investigation";
        }
    }
}

function getPrint(){
    var divContents = $("#calculator").html();
    var printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>Smoke Defect Calculator</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
};
