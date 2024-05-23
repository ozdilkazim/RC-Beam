console.log('CODE MOVED TO AN OTHER REPOSITORY IN NAME OF `REACT STRUCTURAL ENGINEERING PROJECT. THANK YOU`')
console.log('Calculator')
// const height = $("#height").value();
// const width = $("#width").value();
// const thickness = $("#thickness").value();


// If the section is RECTANGULAR
const calcRect = (h, w) => {
    area = h * w ;
    momentofInartiaX = (w ^ 3 * h ) / 12;
    momentofInartiaY = (w * h ^ 3 ) / 12;

    // Radii of gyration
    ix = Math.sqrt(momentofInartiaX / area);
    iy = Math.sqrt(momentofInartiaY / area);

    // Section Modulus 
    welxb = welxt = momentofInartiaX / (w/2);
    welyb = welyt = momentofInartiaY / (h/2); 
}

// If the section is TUBE
const calcTube = (h, w, t) => {
    area = h * w - (h - 2 * t) * (w - 2 * t);
    momentofInartiaX = (w ^ 3 * h - (w - 2 * t) ^ 3 * (h - 2 * t) ) / 12;
    momentofInartiaY = (w * h ^ 3 - (w - 2 * t) * (h - 2 * t) ^ 3 ) / 12;
    
    // Radii of gyration
    ix = Math.sqrt(momentofInartiaX / area);
    iy = Math.sqrt(momentofInartiaY / area);

    // Section Modulus 
    welxb = welxt = momentofInartiaX / (w/2);
    welyb = welyt = momentofInartiaY / (h/2); 
}

// IF the section is CIRCULAR
const calcCircular = (D) => {
    area = PI() * Math.pow(D, 2) / 4;
    momentofInartiaX = PI() * Math.pow(D, 4) / 64;
    momentofInartiaY = PI() * Math.pow(D, 4) / 64;    

    // Radii of gyration
    ix = Math.sqrt(momentofInartiaX / area);
    iy = Math.sqrt(momentofInartiaY / area);
    
    // Section Modulus 
    welxb = welxt = momentofInartiaX / (D/2);
    welyb = welyt = momentofInartiaY / (D/2); 
}

// If the section is PIPE
const calcPipe = (D, t) => {
    area = PI() * (Math.pow(D , 2) - Math.pow((D - t),2)) / 4;
    momentofInartiaX = PI() * (Math.pow(D , 4) - Math.pow((D - t),4)) / 64;
    momentofInartiaY = PI() * (Math.pow(D , 4) - Math.pow((D - t),4)) / 64;

    // Radii of gyration
    ix = Math.sqrt(momentofInartiaX / area);
    iy = Math.sqrt(momentofInartiaY / area);
    
    // Section Modulus 
     welxb = welxt = momentofInartiaX / (D/2);
     welyb = welyt = momentofInartiaY / (D/2); 
}

// If the section is I-BEAM
const calcIBeam = (h, tw, wfb, tfb, wft, tft) => {
    hw = h - tfb - tft;

    // Lets calculate centroid of section 

    // Segment 1 
    A1 = wft * tft;
    y1 = h - tft/2;
    x1 = Math.max(wfb, wft) / 2;
    I1x = tft * Math.pow(wft , 3) / 12
    I1y = wft * Math.pow(tft , 3) / 12

    // Segment 2
    A2 = hw * tw;
    y2 = tfb + hw / 2;
    x2 = Math.max(wfb, wft) / 2;
    I2x = hw * Math.pow(tw , 3) / 12
    I2y = tw * Math.pow(hw , 3) / 12

    // Segment 3 
    A3 = wfb * tfb;
    y3 = tfb / 2;
    x3 = Math.max(wfb, wft) / 2
    I3x = tfb * Math.pow(wfb , 3) / 12
    I3y = wfb * Math.pow(tfb , 3) / 12

    // Area 
    area = A1 + A2 + A3;

    // Centroid
    ym = (A1 * y1 + A2 * y2 + A3 * y3) / (A1 + A2 + A3)
    xm = (A1 * x1 + A2 * x2 + A3 * x3) / (A1 + A2 + A3)

    // Distance to centroid

    // S1
    d1y = Math.abs((h - tft / 2) - ym);
    d1x = Math.abs(Math.max(wft, wfb) / 2 - xm);
    // S2
    d2y = Math.abs((tfb + hw / 2) - ym);
    d2x = Math.abs(Math.max(wft, wfb) / 2 - xm);
    // S3
    d3y = Math.abs((tfb / 2) - ym);
    d3x = Math.abs(Math.max(wft, wfb) / 2 - xm);

    // Moment of Inertia
    momentofInartiaY = I1y + I2y + I3y + A1 * Math.pow(d1y , 2) + A2 * Math.pow(d2y , 2) + A3 * Math.pow(d3y , 2); 
    momentofInartiaX = I1x + I2x + I3x + A1 * Math.pow(d1x , 2) + A2 * Math.pow(d2x , 2) + A3 * Math.pow(d3x , 2); 
    momentofInartiaY = momentofInartiaY.toExponential();
    momentofInartiaX = momentofInartiaX.toExponential();

    // Radii of gyration
    ix = Math.sqrt(momentofInartiaX / area);
    iy = Math.sqrt(momentofInartiaY / area);

    // Section Modulus 
     // Bottom 
    welxb = momentofInartiaX / xm;
    welyb = momentofInartiaY / ym; 
     // Top
    welxt = momentofInartiaX / (Math.max(wfb, wft) - xm);
    welyt = momentofInartiaY / (h - ym);

    // Logs
    console.log("A1 = ", A1, "y1 = ", y1,"x1 = ", x1, "I1x= ", I1x, "I1y = ", I1y, "d1y = ", d1y, "d1x = ", d1x);
    console.log("A2 = ", A2, "y2 = ", y2,"x2 = ", x2, "I2x= ", I2x, "I2y = ", I2y, "d2y = ", d2y, "d2x = ", d2x);
    console.log("A3 = ", A3, "y3 = ", y3,"x3 = ", x3, "I3x= ", I3x, "I3y = ", I3y, "d3y = ", d3y, "d3x = ", d3x);
    console.log("Area = ", area, "ym = ", ym,"xm = ", xm);
    console.log("Iyy = ", momentofInartiaY, "Ixx = ", momentofInartiaX);
    console.log("ix = ", ix, "iyy =", iy);
    console.log("Wel,xb = ", welxb, "Wel,yb =", welyb);
    console.log("Wel,xt = ", welxt, "Wel,yt =", welyt);
}
// h, tw, wfb, tfb, wft, tft
// calcIBeam(376,25,150,38,250,38);

// If the section is L-SECTION
const calcLBeam = (h, tw, wfb, tfb) => {
    hw = h - tfb;

    // Lets calculate centroid of section 

    // Segment 2
    A2 = hw * tw;
    y2 = tfb + hw / 2;
    x2 = tw / 2;
    I2x = hw * Math.pow(tw , 3) / 12
    I2y = tw * Math.pow(hw , 3) / 12

    // Segment 3 
    A3 = wfb * tfb;
    y3 = tfb / 2;
    x3 = wfb / 2
    I3x = tfb * Math.pow(wfb , 3) / 12
    I3y = wfb * Math.pow(tfb , 3) / 12

    // Area 
    area = A2 + A3;

    // Centroid
    ym = (A2 * y2 + A3 * y3) / (A2 + A3)
    xm = (A2 * x2 + A3 * x3) / (A2 + A3)

    // Distance to centroid

    // S2
    d2y = Math.abs((tfb + hw / 2) - ym);
    d2x = tw / 2 - xm;
    // S3
    d3y = Math.abs((tfb / 2) - ym);
    d3x = wfb / 2 - xm;

    // Moment of Inertia
    momentofInartiaY = I2y + I3y + A2 * Math.pow(d2y , 2) + A3 * Math.pow(d3y , 2); 
    momentofInartiaX = I2x + I3x + A2 * Math.pow(d2x , 2) + A3 * Math.pow(d3x , 2); 
    momentofInartiaY = momentofInartiaY.toExponential();
    momentofInartiaX = momentofInartiaX.toExponential();

    // Radii of gyration
    ix = Math.sqrt(momentofInartiaX / area);
    iy = Math.sqrt(momentofInartiaY / area);

    // Section Modulus 
     // Bottom 
    welxb = momentofInartiaX / xm;
    welyb = momentofInartiaY / ym; 
     // Top
    welxt = momentofInartiaX / (wfb - xm);
    welyt = momentofInartiaY / (h - ym);

    // Logs
    console.log("A2 = ", A2, "y2 = ", y2,"x2 = ", x2, "I2x= ", I2x, "I2y = ", I2y, "d2y = ", d2y, "d2x = ", d2x);
    console.log("A3 = ", A3, "y3 = ", y3,"x3 = ", x3, "I3x= ", I3x, "I3y = ", I3y, "d3y = ", d3y, "d3x = ", d3x);
    console.log("Area = ", area, "ym = ", ym,"xm = ", xm);
    console.log("Iyy = ", momentofInartiaY, "Ixx = ", momentofInartiaX);
    console.log("ix = ", ix, "iyy =", iy);
    console.log("Wel,xb = ", welxb, "Wel,yb =", welyb);
    console.log("Wel,xt = ", welxt, "Wel,yt =", welyt);
}
// h, tw, wfb, tfb
// calcLBeam(376,25,150,38);


// If the section is CHANNEL
const calcCBeam = (h, tw, wfb, tfb, wft, tft) => {
    hw = h - tfb - tft;

    // Lets calculate centroid of section 

    // Segment 1 
    A1 = wft * tft;
    y1 = h - tft/2;
    x1 = wft / 2;
    I1x = tft * Math.pow(wft , 3) / 12
    I1y = wft * Math.pow(tft , 3) / 12

    // Segment 2
    A2 = hw * tw;
    y2 = tfb + hw / 2;
    x2 = tw / 2;
    I2x = hw * Math.pow(tw , 3) / 12
    I2y = tw * Math.pow(hw , 3) / 12

    // Segment 3 
    A3 = wfb * tfb;
    y3 = tfb / 2;
    x3 = wfb / 2
    I3x = tfb * Math.pow(wfb , 3) / 12
    I3y = wfb * Math.pow(tfb , 3) / 12

    // Area 
    area = A1 + A2 + A3;

    // Centroid
    ym = (A1 * y1 + A2 * y2 + A3 * y3) / (A1 + A2 + A3)
    xm = (A1 * x1 + A2 * x2 + A3 * x3) / (A1 + A2 + A3)

    // Distance to centroid

    // S1
    d1y = Math.abs((h - tft / 2) - ym);
    d1x = wft / 2 - xm;
    // S2
    d2y = Math.abs((tfb + hw / 2) - ym);
    d2x =tw / 2 - xm;
    // S3
    d3y = Math.abs((tfb / 2) - ym);
    d3x = wfb / 2 - xm;

    // Moment of Inertia
    momentofInartiaY = I1y + I2y + I3y + A1 * Math.pow(d1y , 2) + A2 * Math.pow(d2y , 2) + A3 * Math.pow(d3y , 2); 
    momentofInartiaX = I1x + I2x + I3x + A1 * Math.pow(d1x , 2) + A2 * Math.pow(d2x , 2) + A3 * Math.pow(d3x , 2); 
    momentofInartiaY = momentofInartiaY.toExponential();
    momentofInartiaX = momentofInartiaX.toExponential();

    // Radii of gyration
    ix = Math.sqrt(momentofInartiaX / area);
    iy = Math.sqrt(momentofInartiaY / area);

    // Section Modulus 
     // Bottom 
    welxb = momentofInartiaX / xm;
    welyb = momentofInartiaY / ym; 
     // Top
    welxt = momentofInartiaX / (Math.max(wfb, wft) - xm);
    welyt = momentofInartiaY / (h - ym);

    // Logs
    console.log("A1 = ", A1, "y1 = ", y1,"x1 = ", x1, "I1x= ", I1x, "I1y = ", I1y, "d1y = ", d1y, "d1x = ", d1x);
    console.log("A2 = ", A2, "y2 = ", y2,"x2 = ", x2, "I2x= ", I2x, "I2y = ", I2y, "d2y = ", d2y, "d2x = ", d2x);
    console.log("A3 = ", A3, "y3 = ", y3,"x3 = ", x3, "I3x= ", I3x, "I3y = ", I3y, "d3y = ", d3y, "d3x = ", d3x);
    console.log("Area = ", area, "ym = ", ym,"xm = ", xm);
    console.log("Iyy = ", momentofInartiaY, "Ixx = ", momentofInartiaX);
    console.log("ix = ", ix, "iyy =", iy);
    console.log("Wel,xb = ", welxb, "Wel,yb =", welyb);
    console.log("Wel,xt = ", welxt, "Wel,yt =", welyt);
}
// h, tw, wfb, tfb, wft, tft
calcCBeam(376,25,150,38,250,38);
