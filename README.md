# Vegenère Cipher

## Description
This is a project my professor from System's Security had asked our class to do, each student had to pick a cipher and develop it.

This project only encrypts and decrypts alphabetic letters. Any non-alphabetic characters in the input file will be ignored. We'll also be using only uppercase, no need to type the message or password in uppercase though, the code already converts it ;)

### Key Derivation

This project uses the PBKDF2 algorithm (via Node.js `crypto` module) to securely derive a cryptographic key from the user-supplied key, following good security practices.

The project also supports decrypting messages that were not encrypted with a salted key. However, using the key derivation process (PBKDF2 with salt) is strongly recommended for better security. The key derivation process involves hashing the password with a salt and multiple iterations to produce a secure key suitable for encryption and decryption.

## Features
- Encrypts and decrypts messages using the Vigenère cipher.
- Handles non-alphabetic characters by ignoring them during encryption and decryption.
- Outputs encrypted or decrypted messages to new files with appropriate naming conventions.
- Uses PBKDF2 for key derivation to enhance security.
## Requirements
To run this project, you need to have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

* Have node installed
* Have a .txt file with the to-be-encrypted/decrypted message in the project folder
## Usage
We'll be using, for now, the terminal so we can run the script.<br>
So go ahead and open the project's folder on the terminal or navigate to it in the terminal.

The command we'll be typing will look like this:<br>
`node vegenere.js <file.txt> <password> <mode>`<br>
* The file can be named what ever you like.<br>
* The Key should be typed in the terminal with the rest of the command
* The available modes are `'cipher'` and `decipher`.

### Encrypt

To encrypt, you should have a text file with the message you want to encrypt.  
For this example, we'll use `to-cipher-file-name.txt` as the file and `key` as the password.

```bash
node vegenere.js to-cipher-file-name.txt key cipher
```

### Decrypt

To decrypt, you should have a .txt file previously encrypted with this project, or formatted to match the expected structure.
For this example, we'll use to-decipher-file-name.txt and the password key:
```bash
node vegenere.js to-decipher-file-name.txt key decipher
```
If the file includes a salt on the first line (as added during encryption), PBKDF2 will be used. Otherwise, the script will fall back to a classic Vigenère decryption using the raw key.

### Output
The output files will be created in the same directory as the input file.<br>
The output files will have the same name as the input file, but with `_cifrado` or `_decifrado` appended before the `.txt` extension, depending on whether you are encrypting or decrypting.

### Example

- The encrypted file will be saved as `<originalname>_cifrado.txt`
- The decrypted file will be saved as `<originalname>_decifrado.txt`
