/*
* Control brightness to ColorCode
*
* @param string cCode ColorCode(CSS format #000000 or #000)
* @param float value Brightness offset value
* @return string ColorCode(CSS format #000000)
*/
function ctrlBrightness(cCode, value) {
    var ycbcr = colorCode2Ycbcr(formatColorCode(cCode));
    ycbcr[0] = roundOff(ycbcr[0]+value, 255, -255);
    return ycbcr2ColorCode(ycbcr);
}

/**
* Brightness set to ColorCode
*
* @param string cCode ColorCode(CSS format #000000 or #000)
* @param float value Brightness value(0 to 255)
* @return string ColorCode(CSS format #000000)
*/
function setBrightness(cCode, value) {
    var ycbcr = colorCode2Ycbcr(formatColorCode(cCode));
    ycbcr[0] = roundOff(value);
    return ycbcr2ColorCode(ycbcr);
}

/**
* Convert ColorCode to YCbCr value
*
* @param string cCode ColorCode(CSS format #000000 or #000)
* @return array YCbCr value([0]==Y, [1]==Cb, [2]==Cr)
*/
function colorCode2Ycbcr(cCode) {
    var rgb = colorCode2Rgb(formatColorCode(cCode));
    return rgb2Ycbcr(rgb);
}

/**
* Convert YCbCr value to ColorCode
*
* @param array YCbCr value([0]==Y, [1]==Cb, [2]==Cr)
* @return string ColorCode(CSS format #000000)
*/
function ycbcr2ColorCode(ycbcr) {
    var rgb = ycbcr2Rgb(ycbcr);
    return rgb2ColorCode(rgb);
}

/**
* Convert RGB value to YCbCr value
*
* @param array RGB value([0]==R, [1]==G, [2]==B)
* @return array YCbCr value([0]==Y, [1]==Cb, [2]==Cr)
*/
function rgb2Ycbcr(rgb) {
    var y = 0.298912 * rgb[0] + 0.586611 * rgb[1] + 0.114477 * rgb[2];
    var cb = -0.16877709556951089920871620499976 * rgb[0] - 0.33122290443048910079128379500024 * rgb[1] + 0.5 * rgb[2];
    var cr = 0.5 * rgb[0] - 0.41835760988634807613309598795016 * rgb[1] - 0.081642390113651923866904012049843 * rgb[2];
    return new Array(y, cb, cr);
}

/**
* Convert YCbCr value to RGB value
*
* @param array YCbCr value([0]==Y, [1]==Cb, [2]==Cr)
* @return array RGB value([0]==R, [1]==G, [2]==B)
*/
function ycbcr2Rgb(ycbcr) {
    var r = ycbcr[0] + 1.402176 * ycbcr[2];
    var g = ycbcr[0] - 0.71448921433795138515984187135938 * ycbcr[2] - 0.34561921433795138515984187135938 * ycbcr[1];
    var b = ycbcr[0] + 1.771046 * ycbcr[1];
    return new Array(roundOff(r), roundOff(g), roundOff(b));
}

/**
* Convert ColorCode to RGB value
*
* @param string cCode ColorCode(CSS format #000000 or #000)
* @return array RGB value([0]==R, [1]==G, [2]==B)
*/
function colorCode2Rgb(cCode) {
    cCode = formatColorCode(cCode);
    return new Array(
                parseInt(cCode[1]+cCode[2], 16)
                ,parseInt(cCode[3]+cCode[4], 16)
                ,parseInt(cCode[5]+cCode[6], 16)
                );
}

/**
* Convert RGB value to ColorCode
*
* @param array RGB value([0]==R, [1]==G, [2]==B)
* @return string cCode ColorCode(CSS format #000000)
*/
function rgb2ColorCode(rgb) {
    return '#'+('0'+rgb[0].toString(16).toUpperCase()).slice(-2)
            +('0'+rgb[1].toString(16).toUpperCase()).slice(-2)
            +('0'+rgb[2].toString(16).toUpperCase()).slice(-2);
}

/**
* Round off value(0 - 255)
*
* @param int value integer value
* @return int integer value(0...255)
*/
function roundOff(value, high, low) {
    if (high == undefined) { high = 255; }
    if (low == undefined) { low = 0; }
    if (value > high) {
        return high;
    } else if (value < low) {
        return low;
    }
    return Math.floor(value);
}

/**
* ColorCode formatting
*
* @param string cCode ColorCode(CSS format #000000 or #000)
* @return string cCode ColorCode(CSS format #000000)
*/
function formatColorCode(cCode) {
    if (cCode.match(/^#[0-9A-F]{6}/i)) {
        return cCode;
    } else if (cCode.match(/^#[0-9A-F]{3}/i)) {
        return '#'+cCode[1]+cCode[1]+cCode[2]+cCode[2]+cCode[3]+cCode[3];
    } else {
        return '#000000';
    }
}
