import '../../shim';
import bip39 from 'react-native-bip39';

export const generateMnemonicWord = async () => 
  new Promise(async (resolve) => {
    const mnemonicWord = await bip39.generateMnemonic();
    resolve(mnemonicWord);
  });


export const fromSeed = (mnemonicWord, passphrase) => {
    const seed = bip39.mnemonicToSeed(mnemonicWord, passphrase);
    const privateKey = seed.slice(0, 32);
    const chainCode = seed.slice(32);
    return [privateKey, chainCode];
};
