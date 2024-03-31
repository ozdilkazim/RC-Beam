console.log('Calculator')

// const height = $("#height").value();
// const width = $("#width").value();
// const thickness = $("#thickness").value();
let area;
let momentofInartiaX;
let momentofInartiaY;

// If the section is RECTANGULAR
const calcRect = (h, w) => {
    area = h * w ;
    momentofInartiaX = (w ^ 3 * h ) / 12;
    momentofInartiaY = (w * h ^ 3 ) / 12;
}

// If the section is TUBE
const calcTube = (h, w, t) => {
    area = h * w - (h - 2 * t) * (w - 2 * t);
    momentofInartiaX = (w ^ 3 * h - (w - 2 * t) ^ 3 * (h - 2 * t) ) / 12;
    momentofInartiaY = (w * h ^ 3 - (w - 2 * t) * (h - 2 * t) ^ 3 ) / 12;
}

// IF the section is CIRCULAR
const calcCircular = (D) => {
    area = PI() * Math.pow(D, 2) / 4;
    momentofInartiaX = PI() * Math.pow(D, 4) / 64;
    momentofInartiaY = PI() * Math.pow(D, 4) / 64;
}
// If the section is PIPE
const calcPipe = (D, t) => {
    area = PI() * (Math.pow(D , 2) - Math.pow((D - t),2)) / 4;
    momentofInartiaX = PI() * (Math.pow(D , 4) - Math.pow((D - t),4)) / 64;
    momentofInartiaY = PI() * (Math.pow(D , 4) - Math.pow((D - t),4)) / 64;
}

// If the section is I-BEAM
const calcIBeam = (h, tw, wfb, tfb, wft, tft) => {
    let hw = h - tfb - tft;

    // Lets calculate centroid of section 

    // Segment 1 
    let A1 = wft * tft;
    let y1 = h - tft/2;
    let x1 = Math.max(wfb, wft) / 2;
    I1 = wft * Math.pow(tft , 3) / 12

    // Segment 2
    let A2 = hw * tw;
    let y2 = tfb + hw / 2;
    let x2 = Math.max(wfb, wft) / 2;
    I2 = tw * Math.pow(hw , 3) / 12

    // Segment 3 
    let A3 = wfb * tfb;
    let y3 = tfb / 2;
    let x3 = Math.max(wfb, wft) / 2
    I3 = wfb * Math.pow(tfb , 3) / 12

    // Area 
    area = A1 + A2 + A3;

    // Centroid
    let ym = (A1 * y1 + A2 * y2 + A3 * y3) / (A1 + A2 + A3)
    let xm = (A1 * x1 + A2 * x2 + A3 * x3) / (A1 + A2 + A3)

    // Distance to centroid

    // S1
    d1y = Math.abs((h - tft / 2) - ym);
    d1x = Math.abs(wft / 2 - xm);
    // S2
    d2y = Math.abs((tfb + hw / 2) - ym);
    d2x = Math.abs((tw / 2) - xm);
    // S3
    d3y = Math.abs((tfb / 2) - ym);
    d3x = Math.abs((wfb / 2) - xm);

    // Moment of Inertia
    momentofInartiaY = I1 + I2 + I3 + A1 * Math.pow(d1y , 2) + A2 * Math.pow(d2y , 2) + A3 * Math.pow(d3y , 2); 
    momentofInartiaX = I1 + I2 + I3 + A1 * Math.pow(d1x , 2) + A2 * Math.pow(d2x , 2) + A3 * Math.pow(d3x , 2); 
    momentofInartiaY = momentofInartiaY.toExponential();
    momentofInartiaX = momentofInartiaX.toExponential();

    console.log(h, tw, wfb, tfb, wft, tft, hw);
    console.log(A1, y1, x1, I1, d1y, d1x);
    console.log(A2, y2, x2, I2, d2y, d2x);
    console.log(A3, y3, x3, I3, d3y), d3x;
    console.log(area, ym, xm, momentofInartiaY, momentofInartiaX);
}
calcIBeam(376,25,150,38,250,38);
// If the section is L-SECTION

// If the section is TRAPEZOID