export function isValidEthereumPrivateKey(key: string): boolean {
  // Updated regex to allow optional '0x' prefix
  if (!/^0x[a-fA-F0-9]{64}$|^[a-fA-F0-9]{64}$/.test(key)) {
    return false;
  }

  try {
    // Convert the hex string to a BigInt
    if (key.startsWith("0x")) {
      key = key.substring(2);
    }
    const keyBigInt = BigInt("0x" + key);

    // The max valid private key as per the secp256k1 curve
    const maxPrivateKey = BigInt(
      "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
    );

    // Check if the key is less than the max valid private key
    console.log("2 - isValidEthereumPrivateKey, keyBigInt: ", keyBigInt);
    console.log(
      "3 - isValidEthereumPrivateKey, Result: ",
      keyBigInt < maxPrivateKey
    );
    return keyBigInt < maxPrivateKey;
  } catch (e) {
    return false;
  }
}
