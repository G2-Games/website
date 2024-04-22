function absorbEvent_(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation
    e.cancelBubble = false;
    e.returnValue = false;
    return true;
}
function preventLongPressMenu(node) {
    node.ontouchstart = absorbEvent_;
    node.ontouchmove = absorbEvent_;
    node.ontouchend = absorbEvent_;
    node.ontouchcancel = absorbEvent_;
}
function init() {
    preventLongPressMenu(document.getElementById('image1'));
    preventLongPressMenu(document.getElementById('image2'));
}
