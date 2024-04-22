document.addEventListener('contextmenu', event => event.preventDefault());
var img1 = document.getElementById("image1");
var img2 = document.getElementById("image2");
var poke = document.getElementById("poke");

if (/Mobi|Android/i.test(navigator.userAgent)) {
    $("#example").on('touchstart',function() {
        poke.cloneNode().play();
        img1.style.display = "none"
        img2.style.display = "block"
        poke.currentTime = 0;
    }).on('touchend',function() {
        img1.style.display = "block"
        img2.style.display = "none"
    });
    $().mouseleave(function() {
        img1.style.display = "block"
        img2.style.display = "none"
    });
}

else {
    $("#example").mousedown(function() {
        poke.cloneNode().play();
        img1.style.display = "none"
        img2.style.display = "block"
        poke.currentTime = 0;
    }).mouseup(function() {
        img1.style.display = "block"
        img2.style.display = "none"
    });
    $().mouseleave(function() {
        img1.style.display = "block"
        img2.style.display = "none"
    });
}
