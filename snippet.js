const crypto = require("crypto");

const base64url = require("base64url");

class Snippet {
  static salt = "Babel Salt\n";

  /**
   *
   * @param {string} sourceCode
   * @param {string} pluginSource
   * @param {string[]} configs
   */
  constructor(sourceCode, pluginSource, configs) {
    this.sourceCode = sourceCode;
    this.pluginSource = pluginSource;
    this.configs = configs;
  }

  /**
   * ID returns a base64url encoded ID based off the current code snippet.
   * @returns {string} Base64URL Encoded String
   */
  ID() {
    const hash = crypto.createHash("sha256").update(Snippet.salt);
    const values = [this.sourceCode, this.pluginSource, ...this.configs];
    values.forEach((str) => {
      hash.update(str);
    });
    const code = base64url(hash.digest());
    // The resulting code is always at least 11 characters long.
    // We just need to make sure that we don't end on a trailing _.
    let hashLength = 11;
    for (; hashLength <= code.length && code[hashLength - 1] == "_";) {
      hashLength++;
    }
    return code.slice(0, hashLength);
  }
}

module.exports = {
  Snippet,
};
