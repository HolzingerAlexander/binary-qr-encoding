
function blockToNumber(block) {
    let numericalValue = block[0];
    for (let i = 1; i < block.length; i++) {
        numericalValue *= 256;
        numericalValue += block[i];
    }
    numericalValue *= Math.pow(256, 4 - block.length);
    return String(numericalValue).padStart(10, '0');
}

function numberToBlock(numeric) {
    let value = Number(numeric);
    const array = new Uint8Array(new ArrayBuffer(4));

    for (let i = 3; i >= 0; i--) {
        array[i] = value % 256;
        value /= 256;
    }
    return array;
}

exports. byteArrayToNumberString = function(array) {
    let numberString = '';
    for (let i = 0; i < array.length; i += 4) {
        const block = array.slice(i, i + 4);
        const numeric = blockToNumber(block);
        numberString += numeric;
    }
    return String(array.length).padStart(3, '0') + numberString;
}

exports.numberStringToByteArray = function (numberString) {
    const numberOfBytes = Number(numberString.substring(0, 3));
    const allBlocks = numberString.substring(3);
    const numberOfBlocks = Math.ceil(numberOfBytes / 4);

    if (allBlocks.length !== numberOfBlocks * 10) {
        throw new Error('Block length does not equal communicated length');
    }

    const byteArray = new Uint8Array(new ArrayBuffer(numberOfBytes));
    for (let i = 0; i < numberOfBlocks; i++) {
        const blockNumeric = allBlocks.slice(10 * i, (10 * i) + 10);
        const block = numberToBlock(blockNumeric);
        for (let j = 0; j < block.length && i + j < numberOfBytes; j++) {
            byteArray[(i * 4) + j] = block[j];
        }
    }
    return byteArray;
}