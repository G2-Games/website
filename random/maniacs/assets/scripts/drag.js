/* This script was originally found on Stack Overflow
 *
 * https://stackoverflow.com/a/63425707
 *
 * Modified by me, G2.
 */

function filter(e) {
    if (e.button != 0) {
        return;
    }

    // Find the element that was clicked on, and the parent of that element
    let target = e.target;
    let parent = target.parentElement;

    if (target.classList.contains("app")) {
        taskbarAppClicked(target, zIndex);
        return;
    }

    if (parent == null) {
        return;
    }

    let mainWindow = parent.closest('.window');

    if (mainWindow == null) {
        return;
    }

    // Move windows to front if clicked, this solution isn't great but it does work.
    moveToFront(mainWindow);

    if (!target.classList.contains("draggable") | mainWindow.classList.contains("maximized")) {
        return;
    }

    target.style.cursor = "url(assets/images/cursors/windows7_move.webp) 11 12, auto";

    parent.moving = true;

    if (e.clientX) {
        parent.oldX = e.clientX; // If they exist then use Mouse input
        parent.oldY = e.clientY;
    } else {
        parent.oldX = e.touches[0].clientX; // Otherwise use touch input
        parent.oldY = e.touches[0].clientY;
    }

    parent.oldLeft = window.getComputedStyle(parent).getPropertyValue('left').split('px')[0] * 1;
    parent.oldTop = window.getComputedStyle(parent).getPropertyValue('top').split('px')[0] * 1;

    document.onmousemove = dr;
    document.ontouchmove = dr;

    function dr(event) {
        event.preventDefault();

        if (!parent.moving) {
        return;
        }
        if (event.clientX) {
        parent.distX = event.clientX - parent.oldX;
        parent.distY = event.clientY - parent.oldY;
        } else {
        parent.distX = event.touches[0].clientX - parent.oldX;
        parent.distY = event.touches[0].clientY - parent.oldY;
        }

        parent.style.left = parent.oldLeft + parent.distX + "px";
        parent.style.top = parent.oldTop + parent.distY + "px";
    }

    function endDrag() {
        target.style.cursor = "url(assets/images/cursors/windows7_arrow.webp), auto";
        parent.moving = false;
    }

    parent.onmouseup = endDrag;
    parent.ontouchend = endDrag;
}

document.onmousedown = filter;
document.ontouchstart = filter;
