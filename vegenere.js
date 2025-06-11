const fs = require('fs');
const crypto = require('crypto');
const { deriveKey, getDerivedLetters } = require('./src/keygen.js');
const { expandKey, encrypt, decrypt } = require('./src/cipher.js');
const { log } = require('console');

const inputFile = process.argv[2];
const key = process.argv[3];
const mode = process.argv[4];

if (!inputFile || !key || !mode) {
    console.error("\x1b[31m❌ Missing required arguments.\x1b[0m\n");
    console.log("\x1b[1mUsage:\x1b[0m");
    console.log("  node vigenere.js <input_file.txt> <password> <mode>\n");
    console.log("\x1b[1mExample:\x1b[0m");
    console.log("  node vigenere.js message.txt mySecret cipher\n");
    console.log("\x1b[1mModes:\x1b[0m");
    console.log("  cipher     Encrypt the file");
    console.log("  decipher   Decrypt a previously encrypted file\n");
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
    let derivedLetters = getDerivedLetters(derivedKey);

    const message = content.toUpperCase().replace(/[^A-Z]/g, "");
    const expandedKey = expandKey(derivedLetters, message.length);
    encryptedMessage = encrypt(message, expandedKey, letterToIndex, indexToLetter);
    outputFile = `${inputBase}_cifrado.txt`;
    fs.writeFileSync(`${inputBase}_cifrado.txt`, salt.toString('hex') + '\n' + encryptedMessage);
    console.log("\x1b[32m✔️  Encryption complete!\x1b[0m");
    console.log(`➜ Output file: \x1b[1m${outputFile}\x1b[0m`);
}
else if (mode === 'decipher') {
    const lines = content.split('\n');

    let encryptedMessage;
    let derivedLetters;

    const isHex = /^[0-9a-fA-F]{32}$/.test(lines[0]);

    if (isHex && lines.length > 1) {
        const saltHex = lines[0];
        const salt = Buffer.from(saltHex, 'hex');
        encryptedMessage = lines[1];

        const derivedKey = deriveKey(key, salt);
        derivedLetters = getDerivedLetters(derivedKey);
    } else {
        console.warn("\x1b[33m⚠️  Warning:\x1b[0m No salt detected. Using less secure mode without PBKDF2.\n");

        encryptedMessage = lines.join('');
        derivedLetters = key.toUpperCase().replace(/[^A-Z]/g, "").split('');
    }

    const message = encryptedMessage.toUpperCase().replace(/[^A-Z]/g, "");
    const expandedKey = expandKey(derivedLetters, message.length);
    const decryptedMessage = decrypt(message, expandedKey, letterToIndex, indexToLetter);

    outputFile = `${inputBase.replace('_cifrado', '')}_decifrado.txt`;
    fs.writeFileSync(outputFile, decryptedMessage);
    console.log("\x1b[32m✔️  Decryption complete!\x1b[0m");
    console.log(`➜ Output file: \x1b[1m${outputFile}\x1b[0m`);
}
else {
    console.error("\x1b[31m❌ Error:\x1b[0m Invalid mode. Use 'cipher' or 'decipher'.");
    process.exit(1);
}
