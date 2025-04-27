// Settings Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Default values
    const defaultSettings = {
        arrowAngle: -92,
        tolerance: 7,
        soundsPlayedFlagDelay: 200,
        colores: [
            '#00FFFF',
            '#FF0000',
            '#FFFF00',
            '#00FF00',
            '#FF7700',
            '#0077FF'
        ]
    };

    // DOM Elements
    const modal = document.getElementById('settings-modal');
    const openBtn = document.getElementById('settings-open-btn');
    const closeBtn = document.getElementById('settings-close');
    const saveBtn = document.getElementById('settings-save');
    const cancelBtn = document.getElementById('settings-cancel');
    const resetColorsBtn = document.getElementById('settings-reset-colors');

    // Input Elements
    arrowAngle
    const arrowAngleInput = document.getElementById('settings-arrowAngle');
    const arrowAngleValue = document.getElementById('settings-arrowAngle-value');
    const toleranceInput = document.getElementById('settings-tolerance');
    const toleranceValue = document.getElementById('settings-tolerance-value');
    const soundDelayInput = document.getElementById('settings-sound-delay');
    const soundDelayValue = document.getElementById('settings-sound-delay-value');
    const colorInputs = [
        document.getElementById('settings-color-1'),
        document.getElementById('settings-color-2'),
        document.getElementById('settings-color-3'),
        document.getElementById('settings-color-4'),
        document.getElementById('settings-color-5'),
        document.getElementById('settings-color-6')
    ];

    // Load settings from localStorage or use defaults
    function loadSettings() {
        let settings = {};
        try {
            const savedSettings = localStorage.getItem('crSettings');
            if (savedSettings) {
                settings = JSON.parse(savedSettings);
            }
        } catch (e) {
            console.error('Error loading settings:', e);
            settings = {};
        }
        
        // Apply settings to form (with fallbacks to defaults)
        arrowAngleInput.value = settings.arrowAngle || defaultSettings.arrowAngle;
        arrowAngleValue.textContent = arrowAngleInput.value;
        
        toleranceInput.value = settings.tolerance || defaultSettings.tolerance;
        toleranceValue.textContent = toleranceInput.value;
        
        soundDelayInput.value = settings.soundsPlayedFlagDelay || defaultSettings.soundsPlayedFlagDelay;
        soundDelayValue.textContent = soundDelayInput.value;
        
        const colors = settings.colores || defaultSettings.colores;
        for (let i = 0; i < colorInputs.length; i++) {
            colorInputs[i].value = colors[i] || defaultSettings.colores[i];
        }
    }

    // Save settings to localStorage and apply to app
    function saveSettings() {
        const settings = {
            arrowAngle: parseInt(arrowAngleInput.value),
            tolerance: parseInt(toleranceInput.value),
            soundsPlayedFlagDelay: parseInt(soundDelayInput.value),
            colores: colorInputs.map(input => input.value)
        };

        // Save to localStorage
        localStorage.setItem('crSettings', JSON.stringify(settings));

        // Apply settings to the app
        window.arrowAngle = settings.arrowAngle;
        window.tolerance = settings.tolerance;
        window.soundsPlayedFlagDelay = settings.soundsPlayedFlagDelay;
        window.colores = settings.colores;

        // Close modal
        modal.style.display = 'none';
        
        // Redraw if needed
        if (typeof redraw === 'function') {
            redraw();
        }
    }

    // Reset colors to defaults
    function resetColors() {
        for (let i = 0; i < colorInputs.length; i++) {
            colorInputs[i].value = defaultSettings.colores[i];
        }
    }

    // Update display values for range inputs
    arrowAngleInput.addEventListener('input', function() {
        arrowAngleValue.textContent = this.value;
    });

    toleranceInput.addEventListener('input', function() {
        toleranceValue.textContent = this.value;
    });

    soundDelayInput.addEventListener('input', function() {
        soundDelayValue.textContent = this.value;
    });

    // Event Listeners
    openBtn.addEventListener('click', function() {
        loadSettings();
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    saveBtn.addEventListener('click', saveSettings);

    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    resetColorsBtn.addEventListener('click', resetColors);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Apply settings on page load
    function applySettingsOnLoad() {
        let settings = {};
        try {
            const savedSettings = localStorage.getItem('crSettings');
            if (savedSettings) {
                settings = JSON.parse(savedSettings);
                
                // Apply settings to the app
                if (settings.arrowAngle) window.arrowAngle = settings.arrowAngle;
                if (settings.tolerance) window.tolerance = settings.tolerance;
                if (settings.soundsPlayedFlagDelay) window.soundsPlayedFlagDelay = settings.soundsPlayedFlagDelay;
                if (settings.colores) window.colores = settings.colores;
            }
        } catch (e) {
            console.error('Error applying settings on load:', e);
        }
    }

    // Apply settings when page loads
    applySettingsOnLoad();
});