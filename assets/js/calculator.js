console.log('Calculator')

const height = $("#height").value();
const width = $("#width").value();
const thickness = $("#thickness").value();

// If the section is RECTANGULAR
const calcRect(h, w) => {
    let area = h * w ;
    let momentofInartiaX = (w ^ 3 * h ) / 12;
    let momentofInartiaY = (w * h ^ 3 ) / 12;
}

// If the section is TUBE
const calcTube(h, w, t) => {
    let area = h * w - (h - 2 * t) * (w - 2 * t);
    let momentofInartiaX = (w ^ 3 * h - (w - 2 * t) ^ 3 * (h - 2 * t) ) / 12;
    let momentofInartiaY = (w * h ^ 3 - (w - 2 * t) * (h - 2 * t) ^ 3 ) / 12;
}

