function fullscreen(current) {
    let mainWindow = current.closest('.window');

    if (mainWindow == null) {
        return;
    }

    if (mainWindow.classList.contains("maximized")) {
        mainWindow.classList.remove("maximized");
    } else {
        mainWindow.classList.add("maximized");
    }
}

function moveToFront(target) {
    target.style.zIndex = zIndex + 1;
    zIndex++;
    let activeWindow = setActive();
    return activeWindow;
}

function setActive() {
    let active = 0;
    let max_index = 0;

    for (let i = 0; i < d.length; i++) {
        let current_index = parseInt(d[i].parentElement.style.zIndex);
        d[i].parentElement.classList.remove("active-window");
        toggleButtons(i, false);

        if (current_index > max_index) {
            max_index = current_index;
            active = i;
        }
    }

    toggleButtons(active, true);
    d[active].parentElement.classList.add("active-window");

    return active;
}

function toggleButtons(element, state) {
    let mainWindow = d[element].parentElement;
    let titleBar = d[element];
    let controls = $(d[element]).find('.window-controls')[0];
    let close = $(d[element]).find('.close')[0];
    let fullscreen = $(d[element]).find('.fullscreen')[0];
    let minimize = $(d[element]).find('.minimize')[0];

    if (state) {
        mainWindow.style.backgroundColor = "";
        controls.style.cssText = "";
        titleBar.style.cssText = "";

        if (close) {
            close.style.cssText = `
                background-image: url('assets/images/window-styles/close-button.png');
                box-shadow: unset;
            `;
        }
        if (fullscreen) {
            fullscreen.style.cssText = `
                background-image: url('assets/images/window-styles/fullscreen-button.png');
                box-shadow: unset;
            `;
        }
        if (minimize) {
            minimize.style.cssText = `
                background-image: url('assets/images/window-styles/minimize-button.png');
                box-shadow: unset;
            `;
        }
    } else {
        mainWindow.style.backgroundColor = "#fffa";
        controls.style.cssText = `
            background-color: #ccf8;
            box-shadow: 0 0.2px 0px black, 0.2px 0 0px black, -0.2px 0 0px black;
            border: 0.1px solid white;
            border-width: 1px;
            border-top: none;
        `;
        titleBar.style.cssText = `
            color: #313131;
            filter: saturate(75%);
        `;

        if (close) {
            close.style.cssText = `
                background-image: url('assets/images/window-styles/close-button-inactive.png');
                box-shadow: unset;
            `;
        }
        if (fullscreen) {
            fullscreen.style.cssText = `
                background-image: url('assets/images/window-styles/fullscreen-button-inactive.png');
                box-shadow: unset;
            `;
        }
        if (minimize) {
            minimize.style.cssText = `
                background-image: url('assets/images/window-styles/minimize-button-inactive.png');
                box-shadow: unset;
            `;
        }
    }
}

function minimizeWindow(target) {
    target.closest('.window').classList.add("minimized");
}
