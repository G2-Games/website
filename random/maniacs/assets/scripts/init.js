console.log("Initializing windows and arrays...")

const d = document.getElementsByClassName("draggable");

for (let i = 0; i < d.length; i++) {
    d[i].parentElement.style.position = "absolute";
    d[i].parentElement.style.zIndex = 1;
}
let zIndex = 1;

console.log("Done!")
