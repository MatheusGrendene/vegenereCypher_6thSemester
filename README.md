# Vegenère Cypher

## Description
This is a project my professor from System's Security had asked our class to do, each student had to pick a cypher and develop it.

This project only encrypt and decrypt letters, all of the non aphabetic characters in the input file will be read. We'll also be using only capital letters, no need to type the message or key in capital letters though, the code already converts it into it ;)

### Key Derivation

This project uses the PBKDF2 algorithm (via Node.js `crypto` module) to securely derive a cryptographic key from the user-supplied password, following good security practices.

## Requirements
* Have node installed
* Have a .txt file with the to-be-encrypted/decrypted message in the project folder
## How to run
We'll be using, for now, the terminal so we can run the script.<br>
So go ahead and Open the project's folder on the terminal or navigate to it in the terminal.

The command we'll be typing will look like this:<br>
`node vegenere.js <file.txt> <Key> <mode>`<br>
* The file can be named what ever you like.<br>
* The Key should be typed in the terminal with the rest of the command
* The available modes are `'cypher'` and `decypher`.

### Encrypt

To encrypt you should have a text file with the message for encryption.<br>
For this we'll use "to-decypher-file-name.txt" as a file example and "key" as key

* Enter `node vegenere.js to-cypher-file-name.txt key cypher` on the terminal

### Decrypt

To decrypt you should have a text file with the message for decryption.<br>
For this we'll use "to-decypher-file-name.txt" as a file example and "key" as key
* Enter `node vegenere.js to-decypher-file-name.txt key decypher` on the terminal


### Output

- The encrypted file will be saved as `<originalname>_cifrado.txt`
- The decrypted file will be saved as `<originalname>_decifrado.txt`

