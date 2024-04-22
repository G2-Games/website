/*
 * Positions the windows randomly at start. Remove this to prevent that behavior.
 */

const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  ) - 50;
}

for (let i = 0; i < d.length; i++) {
    let width = d[i].parentElement.offsetWidth;
    let height = d[i].parentElement.offsetHeight;

    if (d[i].parentElement.classList.contains("maximized")) {
        continue;
    }

    d[i].parentElement.style.left = getRandom(0,  getWidth() - width)+'px';
    d[i].parentElement.style.top = getRandom(0, getHeight() - height - (height / 2))+'px';
}
