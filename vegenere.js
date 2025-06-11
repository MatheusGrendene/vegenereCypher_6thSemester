const fs = require('fs');
const crypto = require('crypto');

const inputFile = process.argv[2];
const key = process.argv[3];
const mode = process.argv[4];

if (!inputFile || !key || !mode) {
    console.error("Uso: node vegenere.js <arquivo_entrada> <chave> <modo>");
    console.error("Modos disponíveis: 'cifrar' ou 'decifrar'");
    process.exit(1);
}

/* Implementação da derivação de chave usando PBKDF2 */
const password = key;
const salt = crypto.randomBytes(16);
const interations = 100000;
const keyLength = 32;
const digest = 'sha256';

const derivedKey = crypto.pbkdf2Sync(password, salt, interations, keyLength, digest);

const derivedLetters=[];
// Mapeia os bytes da chave derivada para letras A-Z
for (let i = 0; i < derivedKey.length; i++) {
    const letterIndex = derivedKey[i] % 26; // Mapeia para o intervalo de 0 a 25
    const letter = String.fromCharCode(65 + letterIndex); // Converte para letra (A-Z)
    derivedLetters.push(letter);
}


/* ######################### */

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
const message = content.toUpperCase().replace(/[^A-Z]/g, "");
let expandedKey = expandKey(key.toUpperCase().replace(/[^A-Z]/g, ""));
let encryptedMessage = "";
let decryptedMessage = "";

let inputBase = inputFile.replace('.txt', '');

let outputFile;
if (mode === 'cypher') {
    expandedKey = expandKey(derivedLetters.join(""));
    encryptedMessage=encryptMessage(message, expandedKey);
    outputFile = `${inputBase}_cifrado.txt`;
    fs.writeFileSync(outputFile, salt.toString('hex')+'\n'+encryptedMessage);
}
else if (mode === 'decypher') {
    decryptedMessage = decryptMessage(encryptMessage, expandedKey);
    outputFile = `${inputBase.replace('_cifrado','')}_decifrado.txt`;
    fs.writeFileSync(outputFile, decryptedMessage);
}
else {
    console.error("Modo inválido. Use 'cifrar' ou 'decifrar'.");
    process.exit(1);
}

function encryptMessage(message, expandedKey) {
    for (let i = 0; i < message.length; i++) {
        const messageIndex = letterToIndex[message[i]];
        const keyIndex = letterToIndex[expandedKey[i]];
        const cipherIndex = (messageIndex + keyIndex) % 26;

        encryptedMessage += indexToLetter[cipherIndex];
    }
    return encryptedMessage;
}

function decryptMessage(message, expandedKey) {
    let decryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
        const messageIndex = letterToIndex[message[i]];
        const keyIndex = letterToIndex[expandedKey[i]];
        const cipherIndex = (messageIndex - keyIndex + 26) % 26;

        decryptedMessage += indexToLetter[cipherIndex];
    }
    return decryptedMessage;
}

function expandKey(key) {
    let keyChars = [];
    for (let i = 0; i < message.length; i++) {
        keyChars.push(key[i % key.length]);
    }
    return keyChars.join("");
}

console.log(process.argv);
