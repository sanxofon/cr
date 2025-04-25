const circulos = document.getElementById('circulos');
// Obtener contexto del segundo canvas
function drawClaveOnCircle(claveStr, containerElement, removeOld = false) {
    // Remove existing claves if removeOld is true
    if(removeOld) {
        const existing = containerElement.querySelectorAll('.canvas-container');
        existing.forEach(c => c.remove());
    }

    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'canvas-container';
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'clave-canvas';

    // Set canvas dimensions
    canvas.width = "200";
    canvas.height = "200";

    // Generate unique ID and append to container
    canvas.id = `clave-canvas-${Date.now()}`;
    canvasContainer.appendChild(canvas);
    const canvasTitle = document.createElement('div');
    canvasTitle.className = 'canvas-title';
    canvasTitle.innerText = claveStr;
    canvasContainer.appendChild(canvasTitle);
    containerElement.appendChild(canvasContainer);

    try {
        const clave = cr.fullParse(claveStr, true, true);
        if (verbose) console.log("Clave:", clave);
        
        const degreesToRadians = (deg) => deg * Math.PI / 180;
        const centerX = canvas.width/2;
        const centerY = canvas.height/2;
        const radius = Math.min(canvas.width, canvas.height)/2 - 10;

        // Dibujar círculo base
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dibujar marcas de la clave
        const positions = [];
        const binaryPattern = clave.binaryResult.split('.')[1].split('').map(Number);
        const binaryLength = parseInt(clave.binaryResult.split('.')[0]);

        binaryPattern.forEach((isActive, index) => {
            if (isActive === 1) {
                const angle = -91 + (index * 360 / binaryLength);
                const x = centerX + Math.cos(degreesToRadians(angle)) * radius;
                const y = centerY + Math.sin(degreesToRadians(angle)) * radius;
                positions.push({x, y});
                
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI*2);
                ctx.fillStyle = '#ff4444';
                ctx.fill();
            }
        });

        // Dibujar polígono conectando las marcas
        if(positions.length > 1) {
            ctx.beginPath();
            ctx.moveTo(positions[0].x, positions[0].y);
            positions.forEach(pos => ctx.lineTo(pos.x, pos.y));
            ctx.closePath();
            ctx.strokeStyle = '#ff4444';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(positions[positions.length-1].x, positions[positions.length-1].y);
            ctx.lineTo(positions[0].x, positions[0].y);
            ctx.stroke();
        }
    } catch (error) {
        console.error('Error al dibujar clave:', error);
        containerElement.removeChild(canvas);
    }
}

function printClaves() {
    const savedClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
    if (savedClaves.length === 0) {
        alert('No hay claves guardadas para imprimir.');
        return;
    }

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    invertBody = "";
    if(document.getElementById('inptLightDark').checked) {
        invertBody = " class='invert'";
    }
    printWindow.document.write(`
        <html>
            <head>
                <title>Claves Guardadas</title>
                <link href="cr-style.css" rel="stylesheet">
                <style>
                    .grid-container {
                        display: grid;
                        grid-template-columns: repeat(4,auto);
                        gap: 20px;
                        padding: 20px;
                    }
                    canvas { margin: 0 auto; }
                </style>
            </head>
            <body`+invertBody+`>
                <div class="grid-container" id="clavesGrid"></div>
            </body>
        </html>
    `);
    printWindow.document.close();

    const container = printWindow.document.getElementById('clavesGrid');
    savedClaves.forEach(clave => {
        drawClaveOnCircle(clave.clave, container, false);
    });
}