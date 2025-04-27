
// -----------------------------------------------
// MEMORIA LOCALSTORAGE --------------------------
// Save clave to localStorage when it changes
function saveClaveToLocalStorage(clave) {
    try {
        localStorage.setItem('lastClave', clave);
        if (verbose) console.log('Se guardó la clave en localStorage:', clave);
    } catch (e) {
        if (verbose) console.error('Error guardando la clave en localStorage:', e);
    }
}
// Load clave from localStorage
function loadClaveFromLocalStorage() {
    try {
        const clave = localStorage.getItem('lastClave') || '';
        if (verbose) console.log('Clave cargada de localStorage:', clave);
        return clave;
    } catch (e) {
        if (verbose) console.error('Error cargando clave de localStorage:', e);
        return '';
    }
}

// Function to download the current clave visualization as PNG
function downloadClaveAsPNG(claveValue) {
    // Get the visualization canvas
    const canvas = document.getElementById('circle');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    // Create a safe filename from the clave value
    const safeFilename = createSafeFilename(claveValue);
    
    // Convert canvas to data URL
    try {
        const dataURL = canvas.toDataURL('image/png');
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = `clave_${safeFilename}.png`;
        
        // Append to body, click, and remove
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        if (verbose) console.log('Imagen de clave descargada como PNG');
    } catch (e) {
        console.error('Error al descargar la imagen:', e);
    }
}

// Function to create a safe filename for Windows
function createSafeFilename(input) {
    if (!input) return 'unnamed';
    
    // Replace invalid Windows filename characters: \ / : * ? " < > |
    let safeString = input.replace(/[\\/:*?"<>|]/g, '_');
    
    // Replace spaces with underscores
    safeString = safeString.replace(/\s+/g, '_');
    
    // Limit length to avoid issues with long filenames
    if (safeString.length > 50) {
        safeString = safeString.substring(0, 50);
    }
    
    return safeString;
}

// Share current clave URL
function shareClave() {
    // Get the current clave value
    const claveValue = document.getElementById('clave').value;
    
    if (!claveValue || claveValue.trim() === '') {
        alert('No hay clave para compartir');
        return;
    }
    
    // Create the shareable URL with the encoded clave
    const baseUrl = 'https://lengua.la/cr/';
    const shareableUrl = `${baseUrl}?c=${encodeURIComponent(claveValue)}`;

    // Create a modal window with the shareable URL and QR code image with id 'qrcode'
    // Create a modal container
    let modal = document.createElement('div');
    modal.className = 'share-modal';
    
    // Create modal content
    let modalContent = document.createElement('div');
    modalContent.className = 'share-modal-content';
    
    // Create close button
    let closeBtn = document.createElement('span');
    closeBtn.className = 'share-close-button';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
    // Create title
    let title = document.createElement('h2');
    title.textContent = 'Compartir Clave';
    
    // Create URL display
    let urlContainer = document.createElement('div');
    urlContainer.className = 'share-url-container';
    
    let urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.value = shareableUrl;
    urlInput.readOnly = true;
    urlInput.className = 'share-url-input';
    urlInput.onclick = function() {
        this.select();
    };
    
    // Create copy button
    let copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copiar';
    copyBtn.onclick = function() {
        urlInput.select();
        document.execCommand('copy');
        this.textContent = 'Copiado!';
        setTimeout(() => {
            this.textContent = 'Copiar';
        }, 2000);
    };
    
    // Add URL elements to container
    urlContainer.appendChild(urlInput);
    urlContainer.appendChild(copyBtn);
    
    // Create QR code container
    let qrContainer = document.createElement('div');
    qrContainer.className = 'qr-container';
    
    let qrDiv = document.createElement('div');
    qrDiv.id = 'qrcode';
    
    qrContainer.appendChild(qrDiv);
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(urlContainer);
    modalContent.appendChild(qrContainer);
    modal.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // QR CODE
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 200,
        height : 200
    });
    qrcode.makeCode(shareableUrl);

}

// Save clave to localStorage array of saved claves
function saveClave() {
    const claveValue = document.getElementById('clave').value;
    const claveResult = document.getElementById('claveResult').value;
    
    if (!claveValue || claveValue.trim() === '') {
        alert('No hay clave para guardar');
        return;
    }
    
    try {
        // Get existing saved claves or initialize empty array
        let savedClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
        
        // Check if clave already exists to avoid duplicates
        const exists = savedClaves.some(c => 
            typeof c === 'object' ? c.clave === claveValue : c === claveValue
        );
        
        if (!exists) {
            // Prompt for a title
            const title = prompt('Ingrese un título para esta clave:', '');
            // If user cancels the prompt, abort saving
            if (title === null) return;

            // Create clave object with title, clave value, result and date
            const claveObj = {
                title: title || 'Sin título', // Default if empty
                clave: claveValue,
                result: claveResult,
                date: new Date().toISOString()
            };
            // Handle transition from old format (string) to new format (object)
            savedClaves = savedClaves.map(c => 
                typeof c === 'string' ? { title: 'Sin título', clave: c, date: new Date().toISOString() } : c
            );
            
            savedClaves.push(claveObj);
            localStorage.setItem('savedClaves', JSON.stringify(savedClaves));
            if (verbose) console.log('Clave guardada correctamente');
        } else {
            console.log('Esta clave ya está guardada',exists);
        }
            
        // Download the visualization as PNG
        downloadClaveAsPNG(claveValue);

    } catch (e) {
        console.error('Error guardando clave en array:', e);
        alert('Error al guardar la clave');
    }
}

// Open a specific clave
function openClave(clave) {
    document.getElementById('clave').value = clave;
    saveClaveToLocalStorage(clave);
    go();
    closeModal();
}

// Clear all saved claves
function clearClaves() {
    if (confirm('¿Estás seguro de que deseas borrar todas las claves guardadas?')) {
        localStorage.removeItem('savedClaves');
        closeModal();
        console.log('Todas las claves han sido borradas');
    }
}

// Open modal with list of saved claves
function openClaves() {
    // Get saved claves from localStorage
    let savedClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
    
    if (savedClaves.length === 0) {
        alert('No hay claves guardadas.');
        return;
    }
    
    // Create modal container
    let modal = document.createElement('div');
    modal.className = 'modal';
    
    // Create modal content
    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create close button
    let closeBtn = document.createElement('span');
    closeBtn.className = 'close-button';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
    // Create table
    let table = document.createElement('table');
    table.className = 'claves-table';
    
    // Create table header
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    
    // Add headers including the new Title column
    ['Título', 'Clave', 'Resultado', 'Fecha', 'Acciones'].forEach(text => {
        let th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    let tbody = document.createElement('tbody');
    
    // Add rows for each saved clave
    savedClaves.forEach((clave, index) => {
        let row = document.createElement('tr');
        
        // Title cell
        let titleCell = document.createElement('td');
        titleCell.textContent = clave.title || 'Sin título';
        row.appendChild(titleCell);
        
        // Clave cell
        let claveCell = document.createElement('td');
        claveCell.textContent = clave.clave || '-';
        row.appendChild(claveCell);
        
        // Result cell
        let resultCell = document.createElement('td');
        resultCell.textContent = clave.result || '-';
        row.appendChild(resultCell);
        
        // Date cell
        let dateCell = document.createElement('td');
        dateCell.textContent = new Date(clave.date).toLocaleDateString();
        row.appendChild(dateCell);
        
        // Actions cell
        let actionsCell = document.createElement('td');
        
        // Load button
        let loadBtn = document.createElement('button');
        loadBtn.textContent = '🖋';
        loadBtn.onclick = function() {
            loadClave(index);
            document.body.removeChild(modal);
        };
        actionsCell.appendChild(loadBtn);
        
        // Delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.onclick = function() {
            if (confirm('¿Está seguro de eliminar esta clave?')) {
                deleteClave(index);
                document.body.removeChild(modal);
                openClaves(); // Reopen the modal with updated list
            }
        };
        actionsCell.appendChild(deleteBtn);
        
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(table);
    modal.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(modal);
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('clavesModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Populate modal with saved claves
function populateClavesModal() {
    const modalBody = document.getElementById('clavesModalBody');
    if (!modalBody) return;
    
    modalBody.innerHTML = '';
    
    try {
        const savedClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
        
        if (savedClaves.length === 0) {
            const noClaves = document.createElement('p');
            noClaves.textContent = 'No hay claves guardadas';
            modalBody.appendChild(noClaves);
            return;
        }
        
        // Create list of claves
        const clavesList = document.createElement('ul');
        clavesList.className = 'claves-list';
        
        savedClaves.forEach((clave, index) => {
            const listItem = document.createElement('li');
            
            // Create clave text
            const claveText = document.createElement('span');
            claveText.textContent = clave;
            claveText.className = 'clave-text';
            
            // Create open button
            const openBtn = document.createElement('button');
            openBtn.textContent = '📂';
            openBtn.onclick = function() { openClave(clave); };
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            // deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = function() { deleteClave(index); };
            
            // Assemble list item
            listItem.appendChild(claveText);
            listItem.appendChild(openBtn);
            listItem.appendChild(deleteBtn);
            
            clavesList.appendChild(listItem);
        });
        
        modalBody.appendChild(clavesList);
        
    } catch (e) {
        console.error('Error loading saved claves:', e);
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Error al cargar las claves guardadas';
        modalBody.appendChild(errorMsg);
    }
}

// Function to load a clave
function loadClave(index) {
    let savedClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
    if (index >= 0 && index < savedClaves.length) {
        document.getElementById('clave').value = savedClaves[index].clave || '';
        document.getElementById('claveResult').value = savedClaves[index].result || '';
        go(); // Assuming this function updates the visualization
    }
}

// Function to delete a clave
function deleteClave(index) {
    let savedClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
    if (index >= 0 && index < savedClaves.length) {
        savedClaves.splice(index, 1);
        localStorage.setItem('savedClaves', JSON.stringify(savedClaves));
    }
}

// Save checkbox state to localStorage
function saveCheckboxState(id, checked) {
    localStorage.setItem(id, checked);
}

// Exports all saved claves from localStorage to a downloadable JSON file
function exportClaves() {
    // Get all saved claves from localStorage
    const savedClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
    
    if (savedClaves.length === 0) {
        alert('No hay claves guardadas para exportar.');
        return;
    }
    
    // Create a JSON string with proper formatting
    const jsonData = JSON.stringify(savedClaves, null, 2);
    
    // Create a Blob with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'claves_ritmicas_' + new Date().toISOString().slice(0, 10) + '.json';
    
    // Append to the body, click it, and remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Imports claves from a JSON file selected by the user and adds them to localStorage
function importClaves() {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                // Parse the JSON data
                const importedClaves = JSON.parse(e.target.result);
                
                // Validate that it's an array
                if (!Array.isArray(importedClaves)) {
                    throw new Error('El formato del archivo no es válido. Se esperaba un array de claves.');
                }
                
                // Get existing claves
                const existingClaves = JSON.parse(localStorage.getItem('savedClaves') || '[]');
                
                // Merge the imported claves with existing ones
                // This will avoid duplicates by checking name property
                const mergedClaves = [...existingClaves];
                let newCount = 0;
                
                importedClaves.forEach(importedClave => {
                    // Check if this clave already exists (by name)
                    const exists = existingClaves.some(existing => 
                        existing.name === importedClave.name && 
                        existing.clave === importedClave.clave);
                    
                    if (!exists) {
                        mergedClaves.push(importedClave);
                        newCount++;
                    }
                });
                
                // Save the merged claves back to localStorage
                localStorage.setItem('savedClaves', JSON.stringify(mergedClaves));
                
                // Notify the user
                if (newCount > 0) {
                    alert(`Importación exitosa: ${newCount} nueva(s) clave(s) añadida(s).`);
                } else {
                    alert('No se añadieron nuevas claves. Todas ya existían en la memoria.');
                }
                
            } catch (error) {
                alert('Error al importar el archivo: ' + error.message);
                console.error('Import error:', error);
            }
        };
        
        reader.readAsText(file);
    });
    
    // Trigger the file selection dialog
    fileInput.click();
}
