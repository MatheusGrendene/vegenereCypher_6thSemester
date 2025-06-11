function expandKey(key, messageLength) {
    let result = '';
    for (let i = 0; i < messageLength; i++) {
        result += key[i % key.length];
    }
    return result;
}

function encrypt(message, expandedKey, letterToIndex, indexToLetter) {
    let result = '';
    for (let i = 0; i < message.length; i++) {
        const m = letterToIndex[message[i]];
        const k = letterToIndex[expandedKey[i]];
        result += indexToLetter[(m + k) % 26];
    }
    return result;
}

function decrypt(message, expandedKey, letterToIndex, indexToLetter) {
    let result = '';
    for (let i = 0; i < message.length; i++) {
        const m = letterToIndex[message[i]];
        const k = letterToIndex[expandedKey[i]];
        result += indexToLetter[(m - k + 26) % 26];
    }
    return result;
}

module.exports = { expandKey, encrypt, decrypt };