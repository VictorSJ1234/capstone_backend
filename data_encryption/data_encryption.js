const crypto = require('crypto');

const secretKey = 'NationalUniversityManila'; // secret key
const iv = '1234567890123456'; // IV for AES-256-CBC

function encryptData(data) {
  const key = ensureKeyLength(secretKey); 

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

function decryptData(data) {
  const key = ensureKeyLength(secretKey);

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Convert the input data (in hex format) to a buffer
  const dataBuffer = Buffer.from(data, 'hex');

  // Decryption
  let decrypted = decipher.update(dataBuffer, 'binary', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

  
  

// Function to ensure the secret key has the correct length for AES-256
function ensureKeyLength(key) {
  const keyLength = 32; // 256 bits for AES-256
  if (key.length >= keyLength) return key.slice(0, keyLength);
  const diff = keyLength - key.length;
  const filler = '0'.repeat(diff);
  return key + filler;
}

/*
// Function to ensure the secret key has the correct length for AES-256
function ensureKeyLength(key) {
  const keyLength = 32; // 256 bits for AES-256
  if (key.length >= keyLength) return key.slice(0, keyLength);
  const diff = keyLength - key.length;
  const filler = Buffer.from('0'.repeat(diff));
  return Buffer.concat([Buffer.from(key), filler], keyLength);
}

function encryptData(data) {
  const iv = crypto.randomBytes(16); // Generate a random IV for each encryption
  const key = ensureKeyLength(secretKey); // Ensure key length is correct
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return the IV and the encrypted data as separate strings
  return iv.toString('hex') + encrypted;
}

function decryptData(encryptedData) {
  const key = ensureKeyLength(secretKey); // Ensure key length is correct

  // Extract the IV and encrypted text from the encrypted data
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  const encryptedText = encryptedData.slice(32);

  // Use the extracted IV for decryption
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
*/

module.exports = {
  encryptData,
  decryptData,
};
