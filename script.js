function simpleEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let keyCode = key.charCodeAt(i % key.length);
        // XOR سفارشی + shift ساده
        let encrypted = (charCode ^ keyCode) + 5; // Shift 5 برای نوآوری
        result += String.fromCharCode(encrypted % 256); // محدود به 256 برای ASCII
    }
    return btoa(result); // Encode به Base64 برای ذخیره
}

function simpleDecrypt(encrypted, key) {
    let decoded = atob(encrypted); // Decode از Base64
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
        let charCode = decoded.charCodeAt(i);
        let keyCode = key.charCodeAt(i % key.length);
        let decrypted = ((charCode - 5) ^ keyCode) % 256; // Reverse shift و XOR
        result += String.fromCharCode(decrypted);
    }
    return result;
}

function encryptNote() {
    const note = document.getElementById("noteInput").value;
    const key = document.getElementById("keyInput").value;
    if (!note || !key) {
        document.getElementById("status").textContent = "Please enter note and key!";
        return;
    }
    const encrypted = simpleEncrypt(note, key);
    localStorage.setItem("secureNote", encrypted);
    document.getElementById("noteInput").value = ""; // پاک کردن ورودی
    document.getElementById("status").textContent = "Note encrypted and saved! | Created by 0xbahari";
}

function decryptNote() {
    const key = document.getElementById("keyInput").value;
    if (!key) {
        document.getElementById("status").textContent = "Please enter key!";
        return;
    }
    const encrypted = localStorage.getItem("secureNote");
    if (!encrypted) {
        document.getElementById("status").textContent = "No note found!";
        return;
    }
    try {
        const decrypted = simpleDecrypt(encrypted, key);
        document.getElementById("noteInput").value = decrypted;
        document.getElementById("status").textContent = "Note decrypted! | Created by 0xbahari";
    } catch (e) {
        document.getElementById("status").textContent = "Invalid key!";
    }
}
