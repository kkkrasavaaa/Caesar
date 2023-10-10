// Caesar Cipher encryption function
function caesarCipherEncrypt(text, shift) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-zA-Z]/)) {
            const isUpperCase = char === char.toUpperCase();
            char = char.toUpperCase();

            let charCode = char.charCodeAt(0) + shift;

            if (charCode > 90) {
                charCode -= 26;
            }

            if (!isUpperCase) {
                charCode = charCode + 32;
            }

            char = String.fromCharCode(charCode);
        }

        result += char;
    }

    return result;
}

// Caesar Cipher decryption function
function caesarCipherDecrypt(text, shift) {
    return caesarCipherEncrypt(text, -shift); // Decrypt by shifting in the opposite direction
}

// Function to perform a brute-force attack on Caesar's cipher
function bruteForceAttack(text) {
    const results = [];
    for (let shift = 1; shift <= 25; shift++) {
        const decryptedText = caesarCipherDecrypt(text, shift);
        results.push(`Shift ${shift}: ${decryptedText}`);
    }
    return results;
}

// Function to handle online text encryption, decryption, or brute force attack
function processText() {
    const textToProcess = document.getElementById("text-to-process").value;
    const shift = parseInt(document.getElementById("shift").value);
    const operation = document.querySelector('input[name="operation"]:checked').value;
    let resultText;

    if (operation === "encrypt") {
        resultText = caesarCipherEncrypt(textToProcess, shift);
    } else if (operation === "decrypt") {
        resultText = caesarCipherDecrypt(textToProcess, shift);
    } else if (operation === "bruteforce") {
        resultText = bruteForceAttack(textToProcess).join("\n");
    }

    document.getElementById("result-text").textContent = resultText;
}

// Add event listener to the Process button
document.getElementById("process-button").addEventListener("click", processText);
