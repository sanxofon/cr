// Claves Rítmicas
// By: La Lengua
// www.lengua.la

// Canvas sobre el que vamos a dibujar
const canvas = document.getElementById('circle');
// Contexto del canvas
const ctx = canvas.getContext('2d');
// Proporción
// const ZZ = 100;
// Centro del círculo
var WW = null;
var HH = null;
var XX = null;
var YY = null;
// Longitud del radio del círculo
var RR = null;
// Tau, longitud de la circunferencia
var CC = null;

// SQUARES VISUALIZATION global variables
let currentHighlightedSquare = null;
let currentTempoUnit = 0; // Track current tempo unit
let totalTempoUnits = 0; // Total tempo units in the clave

// -----------------------------------------------
// MEMORIA LOCALSTORAGE --------------------------
// Save clave to localStorage when it changes
function saveClaveToLocalStorage(clave) {
    try {
        localStorage.setItem('lastClave', clave);
        if (verbose) console.log('Saved clave to localStorage:', clave);
    } catch (e) {
        if (verbose) console.error('Error saving clave to localStorage:', e);
    }
}
// Load clave from localStorage
function loadClaveFromLocalStorage() {
    try {
        const clave = localStorage.getItem('lastClave') || '';
        if (verbose) console.log('Loaded clave from localStorage:', clave);
        return clave;
    } catch (e) {
        if (verbose) console.error('Error loading clave from localStorage:', e);
        return '';
    }
}

// Save checkbox state to localStorage
function saveCheckboxState(id, checked) {
    localStorage.setItem(id, checked);
}

// Load checkbox state from localStorage
function loadCheckboxState(id) {
    const state = localStorage.getItem(id);
    return state === 'true'; // Convert string to boolean
}
// -----------------------------------------------

function doResize() {
    WW = window.innerWidth*0.9;
    HH = window.innerHeight*0.85;
    if(WW<360)WW=360;
    if(HH<360)HH=360;
    if(WW<HH)HH=WW-0;
    else WW=HH-0;
    canvas.width = WW;
    canvas.height = HH;
    XX = WW / 2;
    YY = HH / 2;
    RR = WW / 2.3;// Longitud del radio del círculo
    CC = 2*Math.PI*RR;// Tau, longitud de la circunferencia
    redraw();
    // if(verbose) console.log(WW,XX,YY,RR,CC);
}
window.onresize = function(event) {
    doResize();
};
let colores = [
    '#00FFFF',
    '#FF0000',
    '#FFFF00',
    '#00FF00',
    '#FF7700',
    '#0077FF',
];

var imperceptible = 1;

// GLOBALES PREFERENCIAS
window.addClavesOperacion = true;
window.addClaveResultado = true;
window.addCircleMarks = true;

// ---------------------------------------------------------------
// Variables for the rotating arrow
var arrowAngle = -91; // Start at top (12 o'clock) with sound sync hack (90-1)
var isPlaying = false;
var animationId = null;
var tempo = 20; // BPM
var lastFrameTime = 0;
var vertexPoints = []; // Will store all vertex points of all claves
var soundsPlayed = {}; // To track which sounds have been played
var currentHighlightedVertex = null; // track the currently highlighted vertex
let tolerance = 5; // Increased tolerance for better detection
let soundsPlayedFlagDelay = 200; // Delay before resetting the flag
// ---------------------------------------------------------------

// // Convert a number range to another range, maintaining ratio
// NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
function range2another(OldValue,OldMin,OldMax,NewMin,NewMax){
    return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
}

if (canvas.getContext){

    // ---------------------------------------------------------------
    // Setup Howler sounds
    var sounds = {
        s1: new Howl({
            src: [base64Beat[0]], // Usar el lista base64Beat
            format: ['mp3'],      // Especificar el formato
            preload: true,        // Precargar los sonidos !!
        }),
        s2: new Howl({
            src: [base64Beat[1]], // Usar el lista base64Beat
            format: ['mp3'],      // Especificar el formato
            preload: true,        // Precargar los sonidos !!
        }),
        s3: new Howl({
            src: [base64Beat[2]], // Usar el lista base64Beat
            format: ['mp3'],      // Especificar el formato
            preload: true,
        }),
        s4: new Howl({
            src: [base64Beat[3]], // Usar el lista base64Beat
            format: ['mp3'],      // Especificar el formato
            preload: true,
        }),
        s5: new Howl({
            src: [base64Beat[4]], // Usar el lista base64Beat
            format: ['mp3'],      // Especificar el formato
            preload: true,
        }),
        s6: new Howl({
            src: [base64Beat[5]], // Usar el lista base64Beat
            format: ['mp3'],      // Especificar el formato
            preload: true,
        })
    };
    
    // Function to update the tempo
    function updateTempo() {
        tempo = parseInt(document.getElementById('tempoSlider').value);
        document.getElementById('tempoValue').textContent = tempo + ' BPM';
    }
    
    // Function to toggle play/pause
    function togglePlay() {
        isPlaying = !isPlaying;
        const playButton = document.getElementById('playButton');
        
        if (isPlaying) {
            playButton.textContent = "⏸";
            lastFrameTime = performance.now();
            
            // Reset current tempo unit
            currentTempoUnit = 0;
            
            // Start animation
            animateArrow();
        } else {
            // Return to start position of clave
            arrowAngle = -91; // Hack so it starts an instant earlier and the sound sync works better
            playButton.textContent = "▶";
            cancelAnimationFrame(animationId);
            
            // Reset all squares when stopping
            document.querySelectorAll('.square').forEach(square => {
                square.classList.remove('highlighted');
                square.style.opacity = '0.3';
                square.style.borderColor = square.style.backgroundColor;
                square.style.transform = 'scale(1)';
            });
            
            redraw(); // Redraw to clear the arrow
        }
    }
    
    // Function to draw the rotating arrow
    function drawArrow(angle) {
        // No need for additional offset since we want to match the vertex points
        const adjustedAngle = angle;
        
        // Calculate arrow points
        const arrowTip = findPoint(adjustedAngle, RR);
        const arrowBase = findPoint(adjustedAngle, RR * 0.2);
        
        // Draw the arrow line
        drawLine(arrowBase, arrowTip, '#FF0000', 3);
        
        // Draw arrowhead
        const headSize = RR * 0.1;
        const headAngle1 = adjustedAngle + 150;
        const headAngle2 = adjustedAngle - 150;
        const head1 = findPoint(headAngle1, headSize);
        const head2 = findPoint(headAngle2, headSize);
        
        // Fix arrowhead drawing
        ctx.beginPath();
        ctx.moveTo(arrowTip[0], arrowTip[1]);
        ctx.lineTo(arrowTip[0] + (head1[0] - arrowTip[0]), arrowTip[1] + (head1[1] - arrowTip[1]));
        ctx.lineTo(arrowTip[0] + (head2[0] - arrowTip[0]), arrowTip[1] + (head2[1] - arrowTip[1]));
        ctx.closePath();
        ctx.fillStyle = '#FF0000';
        ctx.fill();
    }

    // Function to check if the arrow is passing a vertex
    function checkVertexCollision() {
        // Normalize arrow angle to 0-360 range
        const normalizedArrowAngle = ((arrowAngle % 360) + 360) % 360;
        
        // Update current tempo unit based on arrow angle
        updateCurrentTempoUnit(normalizedArrowAngle);
        
        // Check each vertex
        for (let i = 0; i < vertexPoints.length; i++) {
            const vertex = vertexPoints[i];
            
            // Calculate vertex angle
            const vertexX = vertex[0] - XX;
            const vertexY = vertex[1] - YY;
            let vertexAngle = Math.degrees(Math.atan2(vertexY, vertexX));
            
            // Normalize vertex angle to 0-360
            vertexAngle = ((vertexAngle % 360) + 360) % 360;
            
            // Calculate the smallest angle difference (handling the 0/360 boundary)
            const angleDiff = Math.abs(normalizedArrowAngle - vertexAngle);
            const wrappedDiff = Math.min(angleDiff, 360 - angleDiff);
            
            // If we're passing a vertex and haven't played this sound recently
            if (wrappedDiff < tolerance && !soundsPlayed[i]) {
                // Play sound based on which clave the vertex belongs to
                const claveIndex = vertex[2] || 0;
                const soundKeys = ['s1', 's2', 's3', 's4', 's5', 's6'];
                const soundKey = soundKeys[claveIndex % soundKeys.length];
                
                try {
                    // Play the sound
                    sounds[soundKey].play();
                    
                    // Store the current vertex for highlighting
                    currentHighlightedVertex = {
                        x: vertex[0],
                        y: vertex[1],
                        claveIndex: claveIndex,
                        time: performance.now()
                    };
                    
                    if(verbose) console.log("Playing sound at angle:", normalizedArrowAngle, "for vertex at:", vertexAngle);
                } catch(e) {
                    if(verbose) console.error("Error playing sound:", e);
                }
                
                // Mark this sound as played
                soundsPlayed[i] = true;
                
                // Schedule to reset this flag after a short delay
                setTimeout(() => {
                    soundsPlayed[i] = false;
                }, soundsPlayedFlagDelay);
            }
        }
        
        // Update square visualization based on current tempo unit
        updateSquareHighlights();
    }

    // Function to update the current tempo unit based on the arrow angle
    function updateCurrentTempoUnit(arrowAngle) {
        // Get the clave to determine total tempo units
        const clave = leerClave(document.getElementById('clave').value, true);
        if (!clave || !clave.length) return;
        
        // Calculate total tempo units if not already done
        if (totalTempoUnits === 0) {
            totalTempoUnits = clave[0][0]; // First element is the total number of tempo units
        }
        
        // Calculate current tempo unit based on arrow angle
        // Map 0-360 degrees to 0-totalTempoUnits
        currentTempoUnit = Math.floor((arrowAngle / 360) * totalTempoUnits);
        
        // Ensure it's within bounds
        currentTempoUnit = currentTempoUnit % totalTempoUnits;
    }

    // Function to highlight a vertex when it's hit
    function highlightVertex(x, y, claveIndex) {
        const originalColor = colores[claveIndex % colores.length];
        
        // Draw highlight
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = originalColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Animation function for the arrow
    function animateArrow(timestamp) {
        if (!isPlaying) {
            return;
        }

        // Calculate time delta
        const deltaTime = timestamp ? timestamp - lastFrameTime : 16.67;
        lastFrameTime = timestamp || performance.now();
        
        // Calculate angle increment based on tempo
        // 60000 ms / tempo = ms per beat
        // 360 degrees / ms per beat = degrees per ms
        const degreesPerMs = (tempo / 60000) * 360;
        arrowAngle += degreesPerMs * deltaTime;
        
        // Keep angle normalized but preserve direction for animation
        if (arrowAngle >= 360) {
            arrowAngle -= 360;
        }
        
        // Check if we're passing any vertices
        checkVertexCollision();
        
        // Redraw everything
        redraw();
        
        // Continue animation
        animationId = requestAnimationFrame(animateArrow);
    }
    

    // Converts from degrees to radians.
    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };
    // Converts from radians to degrees.
    Math.degrees = function(radians) {
        return radians * 180 / Math.PI;
    };
    // ---------------------------------------------------------------

    function redraw() {
        ctx.clearRect(0, 0, WW, HH);
        draw();
    }
    function drawCircle(i,r,b=3,c='#aaaaaa'){
        ctx.beginPath();
        ctx.arc(i[0], i[1], r, 0, 2 * Math.PI, false);
        ctx.lineWidth = b;
        ctx.strokeStyle = c;
        ctx.stroke();
    }
    function drawLine(i,f,c='#FFFFFF',b=1){
        ctx.beginPath();
        ctx.moveTo(i[0], i[1]); // Move the point
        ctx.lineTo(f[0], f[1]);
        ctx.lineWidth = b;
        ctx.strokeStyle = c;
        ctx.stroke();
    }
    function drawPolygon(pp,c='#FFFFFF',b=1){
        for (var i = 0; i < pp.length; i++) {
            if(i < pp.length-1)drawLine(pp[i],pp[i+1],c,b);
            else drawLine(pp[i],pp[0],c,b);
        }
    }
    function findPoint(a,d) { // a = angle
        const p = [
        Math.round(Math.cos(a * Math.PI / 180) * d + XX),
        Math.round(Math.sin(a * Math.PI / 180) * d + YY)
        ];
        // if(verbose) console.log(p);
        return p;
    }
    // Texto: txt; center: x, y; Ángulo: a; Distancia: d
    function drawTextAngle(txt,x,y,a,d,f="12px Arial",c="#999999") {
        ctx.font = f;
        ctx.fillStyle = c;
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(Math.radians(a+0.5));
        // ctx.textAlign = "right";
        ctx.fillText(txt, d+5, 0);
        // ctx.translate(p[0], p[1]);
        ctx.restore();
    }
    function drawTextVertical(txt,f="12px Arial",c="#999999") {
        if(verbose) console.log("drawTextVertical",txt,f,c);
        ctx.font = f;
        ctx.fillStyle = c;
        ctx.save();
        ctx.translate(XX, YY);
        ctx.rotate(Math.radians(a+0.5));
        // ctx.textAlign = "right";
        ctx.fillText(txt, d+5, 0);
        // ctx.translate(p[0], p[1]);
        ctx.restore();
    }
    // function drawMark(prefix,a,aa,l=0.53,b=1){
    function drawMark(a,txt,l=0.53,b=1,c='#FF0000'){
        a-=91; // start at top 12 o'clock with sound sync hack (90-1)
        const p1 = findPoint(a,RR);
        const p2 = findPoint(a,RR+(l));
        drawLine(p1,p2,c,b);
        if(addCircleMarks) {
            drawTextAngle(txt,XX,YY,a,RR+(l),"12px Arial","#999999");
        }
        return p1;
    }
    // Converts from degrees to radians.
    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };
    
    // Converts from radians to degrees.
    Math.degrees = function(radians) {
        return radians * 180 / Math.PI;
    };
    function q2h(q) {
        var h = range2another(q,1,2,CMIDDLE,CMIDDLE*2);
        if(h==CMIDDLE*2)h=CMIDDLE;
        return h;
    }
    function q2a(q) {
        return q*360;
    }
    function calcStep(s,w) { // Recives number of steps (semitonos)
        return Math.pow(2,s/w);
    }
    function angleRadians2XY(ar,r=1) {
        // Mediante una transformación polar obtenemos
        var x = r * Math.sin(ar);
        var y = r * Math.cos(ar);
        return [x,y];
    }
    function distance2angleRadians(d=1,t=1) {
        // d = distancia parcial
        // t = distancia total
        // r = radio de la circunferencia
        // Si: t = (2*Math.PI*r), por lo tanto:
        var r = t/(2*Math.PI);
        // Toda la circunferencia de un círculo mide 2*π*radio
        // la distancia d debe terminar dentro de este rango
        // El número de vueltas completas en la circunferencia es:		
        var vc = Math.floor(d/t);
        // El resto en la circunferencia es:		
        var rc = d % t;
        // El ángulo en radianes es:
        var ar = rc/r;
        return ar;
        // 
        // drawLine(i,f,c='#FFFFFF',2);
    }

    function leerClave(clave,resonly=false) {
        // Check if clave is empty and return empty array if so
        if (!clave || clave.trim() === '') {
            document.getElementById('claveExpand').value = '';
            document.getElementById('claveResult').value = '';
            return [];
        }
        
        const full = cr.fullParse(clave,true,true);
        if(verbose) console.log("full:",full);
        /* if(full.operation=='/') {
        if(!addClavesOperacion) {
        document.getElementById('addClavesOperacion').click();
        }
        } else */
        if(full.operation=='+') {
            if(addClavesOperacion) {
                document.getElementById('addClavesOperacion').click();
            }
        }
        const r = full.legacy;
        if(verbose) console.log("r:",r);
        
        const cr_obj = [];
        const completas = [];
        for (let i = 0; i < r[1].length; i++) {
            const x = r[1][i].split('.');
            completas.push(x[0]+'.'+cr.binary2clave(x[1]).join(''));
            if(window.addClavesOperacion) {
                cr_obj.push([
                parseInt(x[0]),
                cr.binary2clave(x[1]),
                parseInt(x[0]) // ? What is this third entry for?
                ]);
            }
        }
        
        const claveRes = r[0][0]+'.'+r[0][1].join('_');
        document.getElementById('claveExpand').value = claveRes;
        document.getElementById('claveResult').value = cr.base62contract(claveRes);
        // Agregamos el resultado a la lista como clave nueva
        // cr_obj.push([
        if(resonly || window.addClaveResultado || !window.addClavesOperacion) {
            cr_obj.unshift([
            parseInt(r[0][0]),
            r[0][1],
            parseInt(r[0][0]) // ? What is this third entry for?
            ]);
        }
        if(verbose) console.log("cr_obj:",cr_obj);
        
        return cr_obj;
    }

    function draw(){
        // Dibujamos el centro
        drawCircle([XX, YY],2,4);
        // Dibujamos el círculo
        drawCircle([XX, YY],RR,2);
        
        // Reset vertex points
        vertexPoints = [];
        
        // Captura la clave
        var clave = leerClave(document.getElementById('clave').value);
        
        imperceptible = 1;
        for (var c = 0; c < clave.length; c++) {
            imperceptible*=clave[c][0];
            var k = 0;
            var kk = 0;
            var poly = [];
            var co = window.addClaveResultado ? c:c+1;
            
            for (var j = 0; j < clave[c][0]; j++) {
                if(j<1){
                    var p = drawMark(
                    q2a(0),
                    "1",
                    0.3,
                    2,
                    colores[co],
                    );
                    poly.push(p);
                    // Store vertex point with clave index and angle
                    vertexPoints.push([p[0], p[1], co]);
                } else {
                    var p = drawMark(
                    q2a(j/clave[c][2]),
                    (j+1)+"/"+clave[c][2],
                    0.3,
                    2,
                    colores[co],
                    );
                }
                if(clave[c][1][k]==kk) {
                    poly.push(p);
                    // Store vertex point with clave index
                    vertexPoints.push([p[0], p[1], co]);
                    kk=0;
                    k++;
                    if(k>clave[c][1].length-1)k=0;
                }
                kk++;
            }
            drawPolygon(poly,colores[co],2);
        }
        // Draw the arrow if playing
        if (isPlaying) {
            drawArrow(arrowAngle);
        }

        // Draw highlight if there's a recently hit vertex
        if (currentHighlightedVertex && performance.now() - currentHighlightedVertex.time < 150) {
            const x = currentHighlightedVertex.x;
            const y = currentHighlightedVertex.y;
            const claveIndex = currentHighlightedVertex.claveIndex;
            
            // Draw a bright highlight
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.strokeStyle = colores[claveIndex % colores.length];
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        // SQUARES VISUALIZATION -  Add at the end of the function:
        var claveres = leerClave(document.getElementById('clave').value, true);
        createSquareVisualization(claveres);

        if(verbose) console.log("Vertex points:", vertexPoints.length);

    }

    // SQUARES VISUALIZATION - DRAW SQUARES VISUALIZATION
    // Function to update square highlights based on current tempo unit
    function updateSquareHighlights() {
        // Remove all previous highlights
        document.querySelectorAll('.square.highlighted').forEach(square => {
            square.classList.remove('highlighted');
            square.style.opacity = '0.3';
            square.style.borderColor = square.style.backgroundColor;
            square.style.transform = 'scale(1)';
        });
        
        // Get the clave
        const clave = leerClave(document.getElementById('clave').value, true);
        if (!clave || !clave.length) return;
        
        // For the result clave (always the first one)
        const resultClave = clave[0];
        const numbers = resultClave[1];
        
        // Calculate total tempo units
        totalTempoUnits = resultClave[0];
        
        // Normalize arrow angle to 0-360 range, accounting for the -91 offset
        let normalizedAngle = ((arrowAngle + 91) % 360 + 360) % 360;
        
        // Calculate current tempo unit based on normalized angle
        // Map 0-360 degrees to 0-totalTempoUnits
        currentTempoUnit = Math.floor((normalizedAngle / 360) * totalTempoUnits);
        
        // Ensure it's within bounds
        currentTempoUnit = currentTempoUnit % totalTempoUnits;
        
        // Find which column and square corresponds to the current tempo unit
        let currentPosition = 0;
        let foundColumn = -1;
        let foundSquare = -1;
        
        // Find which column and position within column
        for (let i = 0; i < numbers.length; i++) {
            const columnSize = numbers[i];
            
            // Check if current tempo unit falls within this column
            if (currentTempoUnit >= currentPosition && currentTempoUnit < currentPosition + columnSize) {
                foundColumn = i;
                foundSquare = currentTempoUnit - currentPosition;
                break;
            }
            
            currentPosition += columnSize;
        }
        
        // If we found the column and square, highlight it
        if (foundColumn >= 0 && foundSquare >= 0) {
            const columns = document.querySelectorAll('.clave-column');
            if (foundColumn < columns.length) {
                const column = columns[foundColumn];
                // Skip the first two elements (number and figure)
                const squares = Array.from(column.querySelectorAll('.square'));
                
                // Find the square with the correct position
                // We need to adjust the index since we're creating squares in reverse order
                const square = squares.find(sq => parseInt(sq.dataset.position) === foundSquare);
                
                if (square) {
                    square.classList.add('highlighted');
                    square.style.opacity = '1';
                    square.style.borderColor = '#FFFFFF';
                    square.style.transform = 'scale(1.1)';
                }
            }
        }
    }

    // DRAW SQUARES VISUALIZATION
    function createSquareVisualization(clave, claveIndex) {
        if (verbose) console.log("createSquareVisualization", clave);
        const container = document.getElementById('squareVisualization');
        container.innerHTML = ''; // Clear previous visualization
        
        if (!clave || !clave.length) return;
        
        // For superposition (/) or mixed operations, only show result
        if (clave.length > 1 && cr.fullParse(document.getElementById('clave').value).operation !== '+') {
            clave = [clave[0]];
        }
        
        // Calculate total tempo units for the clave
        totalTempoUnits = clave[0][0];

        // Function to get musical figure based on duration
        function getMusicalFigure(duration) {
            switch(duration) {
                case 1: return '♪';
                case 2: return '♩';
                case 3: return '♩·';
                case 4: return '𝅗𝅥';
                case 5: return '𝅗𝅥¹';
                case 6: return '𝅗𝅥';
                case 7: return '𝅗𝅥··';
                case 8: return '𝅝';
                case 9: return '𝅝¹';
                default: return duration + '/8';
            }
        }
        
        // Always use the result clave (first one)
        const resultClave = clave[0];
        const numbers = resultClave[1];
        
        numbers.forEach((num, columnIdx) => {
            const column = document.createElement('div');
            column.className = 'clave-column';
            column.dataset.column = columnIdx;
            
            // Create squares from bottom to top
            for (let j = 0; j < num; j++) {
                const square = document.createElement('div');
                square.className = 'square';
                
                // Add special class for bottom square (first one in each column)
                if (j === 0) {
                    square.classList.add('bottom-square');
                }
                
                square.dataset.column = columnIdx;
                square.dataset.position = j;
                square.style.backgroundColor = colores[0]; // Always use first color for result
                square.style.borderColor = colores[0];
                square.style.opacity = '0.3';
                
                column.appendChild(square);
            }
            
            // Add musical figure below number
            const figureDiv = document.createElement('div');
            figureDiv.className = 'column-figure';
            figureDiv.textContent = getMusicalFigure(num);
            column.appendChild(figureDiv);
            
            // Add number below column
            const numberDiv = document.createElement('div');
            numberDiv.className = 'column-number';
            numberDiv.textContent = num;
            column.appendChild(numberDiv);
            
            container.appendChild(column);
        });
        
        // Update highlights based on current tempo unit
        updateSquareHighlights();
    }

    function go() {
        // Save current clave to localStorage before redrawing
        const claveValue = document.getElementById('clave').value;
        if (claveValue && claveValue.trim() !== '') {
            saveClaveToLocalStorage(claveValue);
        }
        
        redraw();
        var max = 48;
        if(imperceptible<max) {
            max=imperceptible;
        }
    }
}

function toggleInputVisibility() {
    const resultInpt = document.getElementById('claveResult');
    const expandInpt = document.getElementById('claveExpand');
    if (resultInpt.style.display === 'none') {
        resultInpt.style.display = '';
        expandInpt.style.display = 'none';
    } else {
        resultInpt.style.display = 'none';
        expandInpt.style.display = '';
    }
}
function toggleLightDark() {
    if(document.getElementById('inptLightDark').checked) {
        document.body.classList.add("invert");
        colores = [
        '#00cccc',
        '#cc0000',
        '#cccc00',
        '#00cc00',
        '#cc5500',
        '#0055cc',
        ];
    } else {
        document.body.classList.remove("invert");
        colores = [
        '#00FFFF',
        '#FF0000',
        '#FFFF00',
        '#00FF00',
        '#FF7700',
        '#0077FF',
        ];
    }
    go();
}
// Initialize when document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load checkbox states from localStorage
    const checkboxIds = ['addClavesOperacion', 'addClaveResultado', 'addCircleMarks', 'inptLightDark'];
    
    checkboxIds.forEach(id => {
        const savedState = loadCheckboxState(id);
        const checkbox = document.getElementById(id);
        
        // Set checkbox state
        checkbox.checked = savedState;
        
        // Update global variables for the first three checkboxes
        if (id !== 'inptLightDark') {
            window[id] = savedState;
        }
    });
    
    // Apply light/dark theme if needed
    if (document.getElementById('inptLightDark').checked) {
        toggleLightDark();
    }
    
    // Initialize the canvas
    doResize();
    
    // Load last clave from localStorage
    const savedClave = loadClaveFromLocalStorage();
    if (savedClave && savedClave.trim() !== '') {
        document.getElementById('clave').value = savedClave;
        setTimeout(function() {
            go(); // Process the loaded clave with a slight delay
        }, 200);
    }
});