import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { loadPyodide } from "pyodide";
import { jsPDF } from "jspdf";

function PdfGenerator() {
    const [pyodide, setPyodide] = useState(null);

    useEffect(() => {
        async function initPyodide() {
            const pyodideInstance = await loadPyodide();
            await pyodideInstance.loadPackage(["matplotlib"]);
            setPyodide(pyodideInstance);
        }
        initPyodide();
    }, []);

    const generatePdf = async () => {
        if (!pyodide) return;
        
        const pythonCode = `
        import matplotlib.pyplot as plt
        import io
        import base64

        # Create a simple plot
        fig, ax = plt.subplots()
        ax.plot([1, 2, 3, 4], [10, 20, 25, 30])
        ax.set_title("Sample Graph")

        # Save to a buffer
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        base64_img = base64.b64encode(buf.read()).decode()
        base64_img
        `;

        const base64Image = await pyodide.runPythonAsync(pythonCode);
        const pdf = new jsPDF();
        pdf.text("My PDF with a Graph", 10, 10);
        pdf.addImage(`data:image/png;base64,${base64Image}`, "PNG", 15, 20, 180, 100);
        pdf.save("generated.pdf");
    };

    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>
        </div>
    );
}

export default PdfGenerator;
