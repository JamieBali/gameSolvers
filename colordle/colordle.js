javascript:(function(){function getPercentage(rgb_object) {
    const candidates = document.querySelectorAll('.selected-color-contianer');

    const targetDiv = Array.from(candidates).find(div => {
        const bg = div.style.backgroundColor || getComputedStyle(div).backgroundColor;
        return bg === rgb_object;
    });

    if (!targetDiv) {
        console.error("No box found with that colour.");
        return null;
    }

    const h1 = targetDiv.querySelector('h1');
    if (!h1) return null;

    let split = h1.innerText.split("-");

    return split[split.length - 1].split("%")[0].trim();
}

const candidates = document.querySelectorAll('.color-input');

candidates.forEach((element) => element.setAttribute("value","Processing has begun."));

/**
 * Thank you, Generative AI, for doign this for me.
 */
function deltaE00(lab1, lab2) {
    const rad = deg => deg * (Math.PI / 180);
    const deg = rad => rad * (180 / Math.PI);

    const L1 = lab1.L, a1 = lab1.a, b1 = lab1.b;
    const L2 = lab2.L, a2 = lab2.a, b2 = lab2.b;

    const C1 = Math.sqrt(a1 ** 2 + b1 ** 2);
    const C2 = Math.sqrt(a2 ** 2 + b2 ** 2);
    const avgC = (C1 + C2) / 2;

    const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));

    const a1p = (1 + G) * a1;
    const a2p = (1 + G) * a2;

    const C1p = Math.sqrt(a1p ** 2 + b1 ** 2);
    const C2p = Math.sqrt(a2p ** 2 + b2 ** 2);

    const h_angle = (a, b) => {
        if (a === 0 && b === 0) return 0;
        let angle = deg(Math.atan2(b, a));
        return angle >= 0 ? angle : angle + 360;
    };

    const h1p = h_angle(a1p, b1);
    const h2p = h_angle(a2p, b2);

    const dLp = L2 - L1;
    const dCp = C2p - C1p;

    let dhp;
    if (C1p * C2p === 0) dhp = 0;
    else if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p;
    else if (h2p - h1p > 180) dhp = h2p - h1p - 360;
    else dhp = h2p - h1p + 360;

    const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(rad(dhp / 2));

    const avgLp = (L1 + L2) / 2;
    const avgCp = (C1p + C2p) / 2;

    let avgHp;
    if (C1p * C2p === 0) avgHp = h1p + h2p;
    else if (Math.abs(h1p - h2p) <= 180) avgHp = (h1p + h2p) / 2;
    else if (h1p + h2p < 360) avgHp = (h1p + h2p + 360) / 2;
    else avgHp = (h1p + h2p - 360) / 2;

    const T = 1 - 0.17 * Math.cos(rad(avgHp - 30)) +
              0.24 * Math.cos(rad(2 * avgHp)) +
              0.32 * Math.cos(rad(3 * avgHp + 6)) -
              0.20 * Math.cos(rad(4 * avgHp - 63));

    const dTheta = 30 * Math.exp(-Math.pow((avgHp - 275) / 25, 2));
    const RC = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
    const SL = 1 + ((0.015 * Math.pow(avgLp - 50, 2)) / Math.sqrt(20 + Math.pow(avgLp - 50, 2)));
    const SC = 1 + 0.045 * avgCp;
    const SH = 1 + 0.015 * avgCp * T;
    const RT = -Math.sin(rad(2 * dTheta)) * RC;

    return Math.sqrt(
        Math.pow(dLp / SL, 2) +
        Math.pow(dCp / SC, 2) +
        Math.pow(dHp / SH, 2) +
        RT * (dCp / SC) * (dHp / SH)
    );
}

function RGB2LAB({ r, g, b }) {
    let [lr, lg, lb] = [r, g, b].map(v => {
        v /= 255;
        return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
    });

    let x = (lr * 0.4124 + lg * 0.3576 + lb * 0.1805) * 100;
    let y = (lr * 0.2126 + lg * 0.7152 + lb * 0.0722) * 100;
    let z = (lr * 0.0193 + lg * 0.1192 + lb * 0.9505) * 100;

    const ref = { x: 95.047, y: 100.000, z: 108.883 };
    [x, y, z] = [x / ref.x, y / ref.y, z / ref.z].map(v => 
        v > 0.008856 ? Math.pow(v, 1/3) : (7.787 * v) + (16 / 116)
    );

    return {
        L: (116 * y) - 16,
        a: 500 * (x - y),
        b: 200 * (y - z)
    };
}



/**
 * Okay, this is my code again now.
 */

function HEX2OBJ(rgbstring){
    if (rgbstring[0] == "#"){
        rgbstring = rgbstring.substring(1);
    }

    rgbstringsplit = rgbstring.match(/.{2}/g);

    let rval = parseInt(rgbstringsplit[0], 16);
    let gval = parseInt(rgbstringsplit[1], 16);
    let bval = parseInt(rgbstringsplit[2], 16);

    return { r: rval, g: gval, b: bval };
}


let oiabm_val = getPercentage("rgb(0, 68, 187)");
let lg_val = getPercentage("rgb(119, 119, 119)");
let rd_val = getPercentage("rgb(255, 69, 0)");

red_lab = RGB2LAB( HEX2OBJ("#0044bb") )   ;
green_lab = RGB2LAB( HEX2OBJ("#777777") ) ;
blue_lab = RGB2LAB( HEX2OBJ("#ff4500") )   ;

red_diff = (100 - oiabm_val );
green_diff = (100 - lg_val );
blue_diff = (100 - rd_val );

best_diff = 300;
best_hex = { r:300, g: 300, b:300 };

for (let testing_r = 0; testing_r < 256; testing_r++) {
  for (let testing_g = 0; testing_g < 256; testing_g++) {
    for (let testing_b = 0; testing_b < 256; testing_b++) {
      let testing_rgb = { r: testing_r, g: testing_g, b: testing_b};
      let testing_lab = RGB2LAB(testing_rgb);

      testdiff_red = deltaE00(testing_lab, red_lab).toFixed(2);
      testdiff_green = deltaE00(testing_lab, green_lab).toFixed(2);
      testdiff_blue = deltaE00(testing_lab, blue_lab).toFixed(2);

      total_diff = Math.abs(testdiff_red - red_diff) +  Math.abs(testdiff_green - green_diff) +  Math.abs(testdiff_blue - blue_diff);

      if (total_diff < best_diff){
        best_diff = total_diff;
        best_hex = testing_rgb;
      }

    } 
  }
}

best_r = "0" + best_hex.r.toString(16) ;
best_g = "0" + best_hex.g.toString(16) ;
best_b = "0" + best_hex.b.toString(16);

best_hex_code = "" + best_r.substring(best_r.length - 2) + best_g.substring(best_g.length - 2) + best_b.substring(best_b.length - 2);

let notice = "Best hex code: " + best_hex_code;
candidates.forEach((element) => element.setAttribute("value",notice));})();
