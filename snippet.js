const crypto = require("crypto");

const base64url = require("base64url");

/**
 * shortestURL returns a short URL based off a code.
 * @param {string} code
 * @returns {string}
 */
function shortestURL(code) {
  // The resulting code is always at least 11 characters long.
  // We just need to make sure that we don't end on a trailing _.
  let hashLength = 11;
  for (; hashLength <= code.length && code[hashLength - 1] == "_"; ) {
    hashLength++;
  }
  return code.slice(0, hashLength);
}

/**
 * newSeededHash returns a hash pre-seeded with the Snippets salt.
 * @returns {crypto.Hash}
 */
function newSeededHash() {
  return crypto.createHash("sha256").update(Snippet.salt);
}

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
   * Link returns the sharking link associated with the current snippet.
   * @returns {string} Base64URL Encoded String
   */
  Link() {
    const hash = newSeededHash();
    const values = [this.sourceCode, this.pluginSource, ...this.configs];
    values.forEach((str) => {
      hash.update(str);
    });
    const code = base64url(hash.digest());
    return shortestURL(code);
  }

  /**
   * ID generates a url friendly ID.
   * @returns {string} Base64URL Encoded String
   */
  static ID(body) {
    const hash = newSeededHash();
    hash.update(body);
    const code = base64url(hash.digest());
    return shortestURL(code);
  }
}

module.exports = {
  Snippet,
};
