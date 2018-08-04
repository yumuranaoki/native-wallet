import '../../shim';
import eccrypto from 'eccrypto';
import { keccak256 } from 'js-sha3';
import EthereumTx from 'ethereumjs-tx';
import { generateMnemonicWord, fromSeed } from './mnemonicWord';

class Wallet {
  constructor() {
    this.mnemonicWord = null;
    this.bytePrivateKey = null;
    this.privateKey = null;
    this.bytePublicKey = null;
    this.publicKey = null;
    this.address = '';
  }

  async setMnemonicWord() {
    const mnemonicWord = await generateMnemonicWord();
    this.mnemonicWord = mnemonicWord;
  }

  async generatePrivateKey() {
    if (this.mnemonicWord) {
      const [bytePrivateKey, chainCode] = fromSeed(this.mnemonicWord, '');
      this.privateKey = bytePrivateKey;
      let privateKey = '';
      bytePrivateKey.map(byte => {
        let byteString = byte.toString(16); 
        byteString = byteString <= 16 ? `0${byteString}` : byteString;
        privateKey += byteString;
      }).join('');
      this.privateKey = privateKey;
    }
  }

  async generatePublicKey() {
    if (this.privateKey) {
      this.bytePublicKey = eccrypto.getPublic(this.privateKey);
      let publicKey = '';
      this.bytePublicKey.map(byte => {
        let byteString = byte.toString(16);
        byteString = byteString <= 16 ? `0${byteString}` : byteString;
        publicKey += byteString;
      }).join('');
      this.publicKey = publicKey;
    }
  }

  async generateAddress() {
    if (this.publicKey) {
        const address = keccak256(this.publicKey.slice(1)).slice(24);
        const keccak256Address = keccak256(address);
        for (let i = 0; i < 40; i++) {
            if (parseInt(keccak256Address[i], 16) >= 8 && !Number(address[i])) {
                this.address += address[i].toUpperCase();
            } else {
                this.address += address[i];
            }
        }
        this.address = `0x${this.address}`;
        console.log(this.address);
    }
  }

  async getNonce() {
    return new Promise((resolve) => {
      const ethGetTransactionCount = {
            jsonrpc: '2.0', 
            method: 'eth_getTransactionCount', 
            params: [this.address, 'latest'], 
            id: 42
        };
        fetch('https://kovan.infura.io/Y80MvxYEzKUddrYMy9Xj', {
            method: 'POST',
            body: JSON.stringify(ethGetTransactionCount),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(res => res.result)
        .then(result => parseInt(result, 16))
        .then(result => resolve(result))
        .catch(err => console.log(err));
    });
}

async getBalance() {
  if (this.privateKey) {
    console.log(this.address);
    const ethGetBalance = {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [this.address, 'latest'],
        id: 42,
    };
    return new Promise((resolve) => {
      fetch('https://kovan.infura.io/Y80MvxYEzKUddrYMy9Xj', {
          method: 'POST',
          body: JSON.stringify(ethGetBalance),
          headers: new Headers({
              'Content-Type': 'application/json'
          })
      })
      .then(res => res.json())
      .then(res => res.result)
      .then(result => resolve(parseInt(result, 16) / 1000000000000000000))
      .catch(err => console.log(err));
    });
  }
}

async signTransaction(txParams) {
  if (this.privateKey) {
      const transaction = {};
      const nonce = await this.getNonce();
      transaction.nonce = nonce;
      transaction.gasPrice = `0x${parseInt(txParams.gasPrice, 10).toString(16)}`;
      transaction.gasLimit = `0x${parseInt(txParams.gasLimit, 10).toString(16)}`;
      transaction.to = txParams.toAddress;
      transaction.value = `0x${parseInt(txParams.value, 10).toString(16)}`;
      transaction.chainId = txParams.chainId;
      return new Promise(resolve => {
          const tx = new EthereumTx(transaction);
          tx.sign(this.privateKey); // ここはprivate keyをbyteで扱う
          resolve(tx);
      });
  }
}

// promiseを返してコードの汎用性を高める
    async sendRawTransaction(txParams) {
        const signedTransaction = await this.signTransaction(txParams);
        if (signedTransaction) {
        const serializedTx = signedTransaction.serialize();
        const rawTx = `0x${serializedTx.toString('hex')}`;
        const ethSendRawTransaction = {
            jsonrpc: '2.0',
            method: 'eth_sendRawTransaction',
            params: [rawTx],
            id: 42 // 選べるようにする
        };
        return new Promise((resolve) => {
                fetch('https://kovan.infura.io/Y80MvxYEzKUddrYMy9Xj', {
                method: 'POST',
                body: JSON.stringify(ethSendRawTransaction),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
                })
                .then(res => res.json())
                .then(res => res.result)
                .then(res => resolve(res))
                .catch(err => console.log(err));
            });
        }
    }
}

export default Wallet;
