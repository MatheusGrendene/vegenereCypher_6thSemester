const crypto = require('crypto');

// Deriva uma chave criptográfica a partir de uma senha e um salt.
function deriveKey(password, salt, iterations = 100000, keyLength = 32, digest = 'sha256') {
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest); // Retorna o buffer da chave derivada.
}

// Converte um buffer em uma sequência de letras.
// Cada byte do buffer é mapeado para uma letra do alfabeto (A-Z) usando o operador módulo.
function getDerivedLetters(buffer) {
    const letters = [];
    for (let i = 0; i < buffer.length; i++) {
        const letterIndex = buffer[i] % 26; // Calcula o índice da letra com base no valor do byte.
        const letter = String.fromCharCode(65 + letterIndex); // Converte o índice em uma letra (ASCII).
        letters.push(letter); // Adiciona a letra ao array.
    }
    return letters.join(''); // Junta as letras em uma string.
}

// Exporta as funções para uso em outros módulos.
module.exports = { deriveKey, getDerivedLetters };