const HELPER_MODE_COUNT = 3;

const card = document.getElementById("card");
const back = document.getElementById("card-back");
const helper = document.getElementById("card-helper");

let helperMode = 0;

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "magenta",
    "purple",
    "black",
    "gray",
    "white"
];

const step = card.clientHeight / colors.length;

function updateHelper() {
    switch (helperMode) {
        case 0:
            helper.style.opacity = 0;
            helper.style.background = "none";
            break;
        case 1:
            helper.style.opacity = 0.2;
            helper.style.background = `repeating-linear-gradient(${
                colors.toReversed().map((color, i) => `${color} ${i * step}px, ${color} ${(i + 1) * step}px`).join(", ")
            })`;
            break;
        case 2:
            helper.style.opacity = 0.1;
            helper.style.background = `repeating-linear-gradient(${
                colors.map((_, i) => {
                    const start = i * step;
                    const end = start + step;
                    return `transparent ${start}px, transparent ${end - 1}px, black ${end - 1}px, black ${end}px, transparent ${end}px`;
                }).join(", ")
            })`;
            break;
    }
}

document.addEventListener("mousemove", (ev) => {
    let rotation = ev.clientX / document.body.clientWidth - .5;
    if (Math.abs(rotation) <= .25)
        back.style.backgroundColor = colors[~~((document.body.clientHeight / 2 - ev.clientY) / step + colors.length / 2)];
    card.style.transform = `rotateY(${rotation}turn)`;
});

document.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    ++helperMode;
    if (helperMode >= HELPER_MODE_COUNT)
        helperMode = 0;
    updateHelper();
});

updateHelper();