const crypto = require("crypto");

class HMACGenerator {
  static generateHMAC(secureKey, message) {
    return crypto.createHmac("sha256", secureKey).update(message).digest("hex");
  }
}

module.exports = HMACGenerator;
