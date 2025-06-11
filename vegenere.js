const fs = require('fs');
const crypto = require('crypto');
const { deriveKey, getDerivedLetters } = require('./src/keygen.js');
const { expandKey, encrypt, decrypt } = require('./src/cipher.js');

const inputFile = process.argv[2];
const key = process.argv[3];
const mode = process.argv[4];

if (!inputFile || !key || !mode) {
    console.error("Uso: node vegenere.js <arquivo_entrada> <chave> <modo>");
    console.error("Modos disponíveis: 'cipher' ou 'deipher'");
    process.exit(1);
}

/* Mapeia letras para índices e vice-versa */
const letterToIndex = {};
const indexToLetter = {};

for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    letterToIndex[letter] = i;
    indexToLetter[i] = letter;
}
/* ############################ */

// Prepara a mensagem e a chave para cifragem/desifração
// Remove caracteres não alfabéticos e converte para maiúsculas

const content = fs.readFileSync(inputFile, 'utf8');

let inputBase = inputFile.replace('.txt', '');
let outputFile;

if (mode === 'cipher') {
    const salt = crypto.randomBytes(16);
    const derivedKey = deriveKey(key, salt);
    const derivedLetters = getDerivedLetters(derivedKey);

    const message = content.toUpperCase().replace(/[^A-Z]/g, "");
    const expandedKey = expandKey(derivedLetters, message.length);
    encryptedMessage = encrypt(message, expandedKey, letterToIndex, indexToLetter);
    outputFile = `${inputBase}_cifrado.txt`;
    fs.writeFileSync(`${inputBase}_cifrado.txt`, salt.toString('hex') + '\n' + encryptedMessage);
}
else if (mode === 'decipher') {
    const saltHex = content.split('\n')[0];
    const salt = Buffer.from(saltHex, 'hex');
    const encryptedMessage = content.split('\n')[1];

    const derivedKey = deriveKey(key, salt);
    const derivedLetters = getDerivedLetters(derivedKey);
    const message = encryptedMessage.toUpperCase().replace(/[^A-Z]/g, "");


    const expandedKey = expandKey(derivedLetters, encryptedMessage.length);
    decryptedMessage = decrypt(encryptedMessage, expandedKey, letterToIndex, indexToLetter);
    outputFile = `${inputBase}_decifrado.txt`;
    fs.writeFileSync(outputFile, decryptedMessage);
}
else {
    console.error("Modo inválido. Use 'cipher' ou 'decipher'.");
    process.exit(1);
}

console.log("Tudo pronto!\n");

console.log(`Arquivo de saída: ${outputFile}`);
