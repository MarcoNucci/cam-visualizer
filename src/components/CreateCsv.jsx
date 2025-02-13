import React from 'react';

const CreateCsv = ({ camData }) => {
    const generateCsv = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "sep=,\n";
        csvContent += "MasterPosition,SlavePosition,SlaveVelocity,SlaveAcceleration\n";

        for (let i = 0; i < camData.x.length; i++) {
            csvContent += `${camData.x[i]},${camData.y[i]},${camData.v[i]},${camData.a[i]}\n`;
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "cam_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button onClick={generateCsv} className="ComputeButton">
            Download CSV
        </button>
    );
};

export default CreateCsv;
