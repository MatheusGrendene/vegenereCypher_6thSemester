function expandKey(key, messageLength) {
    let result = '';
    for (let i = 0; i < messageLength; i++) {
        result += key[i % key.length]; // Usa o operador módulo para repetir os caracteres da chave.
    }
    return result;
}

function encrypt(message, expandedKey, letterToIndex, indexToLetter) {
    let result = '';
    for (let i = 0; i < message.length; i++) {
        const m = letterToIndex[message[i]]; // Obtém o índice da letra da mensagem.
        const k = letterToIndex[expandedKey[i]]; // Obtém o índice da letra da chave expandida.
        result += indexToLetter[(m + k) % 26]; // Calcula o índice da letra encriptada e converte de volta para uma letra.
    }
    return result;
}

function decrypt(message, expandedKey, letterToIndex, indexToLetter) {
    let result = '';
    for (let i = 0; i < message.length; i++) {
        const m = letterToIndex[message[i]]; // Obtém o índice da letra da mensagem encriptada.
        const k = letterToIndex[expandedKey[i]]; // Obtém o índice da letra da chave expandida.
        result += indexToLetter[(m - k + 26) % 26]; // Calcula o índice da letra desencriptada e converte de volta para uma letra.
    }
    return result;
}

module.exports = { expandKey, encrypt, decrypt };
