const crypto = require('crypto');

function deriveKey(password, salt, iterations = 100000, keyLength = 32, digest = 'sha256') {
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
}

function getDerivedLetters(buffer) {
    const letters = [];
    for (let i = 0; i < buffer.length; i++) {
        const letterIndex = buffer[i] % 26;
        const letter = String.fromCharCode(65 + letterIndex);
        letters.push(letter);
    }
    return letters.join('');
}

module.exports = { deriveKey, getDerivedLetters };