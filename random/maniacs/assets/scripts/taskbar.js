function updateTaskbar() {
    for (let i = d.length - 1; i >= 0; i--) {

        let icon = $(d[i]).find(".window-icon").attr('src');

        $('<div>', {
            id: 'app' + i,
            class: 'app',
            style: 'background-image: url(' + icon + ');',
        }).insertAfter($(".placeholder")).html();
    }
}

function taskbarAppClicked(target, zIndex) {
    let number = target.id.slice(3);
    let mainWindow = d[number].parentElement;

    if (mainWindow.style.zIndex != zIndex) {
        mainWindow.classList.remove("minimized");
        moveToFront(mainWindow);
    } else {
        if (mainWindow.classList.contains("minimized")) {
            mainWindow.classList.remove("minimized");
        } else {
            mainWindow.classList.add("minimized");
        }
    }

    return zIndex;
}
