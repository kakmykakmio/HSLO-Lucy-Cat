// Funciones para simular clics en botones
function continue2() {
    const continueButton = document.getElementById("continue-button");
    if (continueButton) {
        continueButton.click();
    } else {
        console.error("No se encontró el botón 'continue-button'");
    }
}

function espectate2() {
    const spectateButton = document.getElementById("spectate");
    if (spectateButton) {
        spectateButton.click();
    } else {
        console.error("No se encontró el botón 'spectate'");
    }
}

function play2() {
    const playButton = document.getElementById("play");
    if (playButton) {
        playButton.click();
    } else {
        console.error("No se encontró el botón 'play'");
    }
}

// Variable de control para activar o desactivar la función en la vista 2
let isCheckRespawnActive2 = false;

// Función para mostrar mensajes emergentes en la parte central baja de la pantalla con colores dinámicos
function showMessage(status, isActive) {
    const message = document.createElement('div');

    // Dividir el texto en líneas y centrar la primera línea
    const lines = status.split('<br>');
    const firstLine = lines[0];
    const secondLine = lines[1] || '';

    message.innerHTML = `
        <div style="text-align: center; font-weight: bold;">${firstLine}</div>
        <div>${secondLine}</div>
    `;

    Object.assign(message.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: isActive ? '#4caf50' : 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 9999,
        fontSize: '16px',
    });

    // Agrega el mensaje al documento
    document.body.appendChild(message);

    // Elimina el mensaje después de 2 segundos
    setTimeout(() => {
        document.body.removeChild(message);
    }, 2000);
}

// Crear el nuevo botón para la vista 2
const newButton = document.createElement('button');
newButton.className = 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium main-btns css-1hw9j7s';
newButton.tabIndex = 0;
newButton.type = 'button';
newButton.id = 'changeV';
Object.assign(newButton.style, {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: '2px solid #000000',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '308px',
    height: '200px',
});
newButton.accessKey = '3';
newButton.innerHTML = '<i class="fas fa-power-off"></i> View 1 <br> Auto Respawn <br> (Off) <span class="MuiTouchRipple-root css-w0pj6f"></span>';

// Animación del botón
function animateButton(button) {
    button.style.transition = 'transform 0.2s ease';
    button.style.transform = 'scale(0.95)';

    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Agregar evento click para iniciar la animación y cambiar el estado
newButton.addEventListener('click', () => {
    animateButton(newButton);
    isCheckRespawnActive2 = !isCheckRespawnActive2;

    if (isCheckRespawnActive2) {
        newButton.style.backgroundColor = '#4caf50';
        newButton.innerHTML = '<i class="fas fa-redo-alt"></i> View 1 <br> Auto Respawn <br> (On) ';
        console.log('Botón ChangeV activado en vista 2');
        showMessage('[View 1]<br>Auto Respawn Activated', true);
    } else {
        newButton.style.backgroundColor = '#000000';
        newButton.innerHTML = '<i class="fas fa-power-off"></i> View 1 <br> Auto Respawn <br> (Off) ';
        console.log('Botón ChangeV desactivado en vista 2');
        showMessage('[View 1]<br>Auto Respawn Deactivated', false);
    }
});

// Insertar el nuevo botón cuando el contenedor esté disponible
const buttonInterval = setInterval(() => {
    const buttonContainer = document.querySelector('.panel.center');
    if (buttonContainer) {
        buttonContainer.appendChild(newButton);
        clearInterval(buttonInterval);
    }
}, 100);

// Función para verificar la ventana de respawn cuando está en estado activo en la vista 2
function checkRespawnWindowActiveView2() {
    if (!isCheckRespawnActive2) return;

    const menuElement = document.querySelector("#menu");
    const modalElement = document.querySelector(".modal");

    if (!modalElement || !menuElement) return;

    modalElement.style.display = 'none';

    const menuStyle = getComputedStyle(menuElement);
    const modalStyle = getComputedStyle(modalElement);

    const menuDisplay = menuStyle.display;
    const modalOpacity = modalStyle.opacity;
    const menuBackgroundColor = menuStyle.backgroundColor;

    if (menuDisplay === 'none' && modalOpacity === '0') {
        return;
    }

    if (menuBackgroundColor === 'rgba(0, 0, 0, 0.75)') {
        return;
    }

    if (menuDisplay !== 'none' && modalOpacity === '1') {
        continue2();
        play2();
    }
}

// Función para verificar la ventana de respawn cuando está en estado inactivo en la vista 2
function checkRespawnWindowInactiveView2() {
    if (isCheckRespawnActive2) return;

    const menuElement = document.querySelector("#menu");
    const modalElement = document.querySelector(".modal");

    if (!modalElement || !menuElement) return;

    modalElement.style.display = 'none';

    const menuStyle = getComputedStyle(menuElement);
    const modalStyle = getComputedStyle(modalElement);

    const menuDisplay = menuStyle.display;
    const modalOpacity = modalStyle.opacity;
    const menuBackgroundColor = menuStyle.backgroundColor;

    if (menuDisplay === 'none' && modalOpacity === '0') {
        return;
    }

    if (menuBackgroundColor === 'rgba(0, 0, 0, 0.75)') {
        return;
    }

    if (menuDisplay !== 'none' && modalOpacity === '1') {
        continue2();
        espectate2();
    }
}

// Intervalo principal para verificar el estado de la ventana de respawn
setInterval(() => {
    if (isCheckRespawnActive2) {
        checkRespawnWindowActiveView2();
    } else {
        checkRespawnWindowInactiveView2();
    }
}, 100); // Verifica cada 100ms

// Función para eliminar anuncios y ajustar elementos de la interfaz
function removeAdsAndSocialSidebar() {
    const endGameDiv = document.getElementById("endGame");
    if (endGameDiv) {
        // endGameDiv.remove(); // Si deseas eliminarlo
    }

    const roomStatsDisplay = document.querySelector(".room-stats-display");
    if (roomStatsDisplay) {
        // roomStatsDisplay.remove(); // Si deseas eliminarlo
    }

    const captchaOverlay = document.getElementById("captcha-overlay");
    if (captchaOverlay) {
        //captchaOverlay.remove();
    }

    const playButton = document.getElementById('play');
    if (playButton) {
        Object.assign(playButton.style, {
            backgroundColor: '#4CAF50',
            color: '#ffffff',
            border: '2px solid #4CAF50',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '150px',
            height: '200px',
        });
        playButton.accessKey = '1';
    }

    const spectateButton = document.getElementById('spectate');
    if (spectateButton) {
        Object.assign(spectateButton.style, {
            backgroundColor: '#f44336',
            color: '#ffffff',
            border: '2px solid #f44336',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '150px',
            height: '200px',
        });
        spectateButton.accessKey = '2';
    }
}

// Eliminar anuncios al cargar la página
window.addEventListener('load', removeAdsAndSocialSidebar);

// Observador de mutaciones para eliminar anuncios dinámicamente
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            removeAdsAndSocialSidebar();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
