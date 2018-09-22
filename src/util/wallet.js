import '../../shim';
import eccrypto from 'eccrypto';
import { keccak256 } from 'js-sha3';
import EthereumTx from 'ethereumjs-tx';
import { generateMnemonicWord, fromSeed } from './mnemonicWord';

class Wallet {
  constructor(
        mnemonicWord = null,
        password = null,
    ) {
        this.mnemonicWord = mnemonicWord;
        this.password = password;
  }

  async setMnemonicWord() {
    const mnemonicWord = await generateMnemonicWord();
    this.mnemonicWord = mnemonicWord;
  }

  async generatePrivateKey() {
    if (this.mnemonicWord) {
      const [bytePrivateKey, chainCode] = fromSeed(this.mnemonicWord, this.password);
      this.bytePrivateKey = bytePrivateKey;
      let privateKey = '';
      bytePrivateKey.map(byte => {
        let byteString = byte.toString(16);
        byteString = byteString.length === 1 ? `0${byteString}` : byteString;
        privateKey += byteString;
      }).join('');
      this.privateKey = privateKey;
      return privateKey;
    }
  }

  async generatePublicKey() {
    if (this.bytePrivateKey) {
      this.bytePublicKey = eccrypto.getPublic(this.bytePrivateKey);
      let publicKey = '';
      this.bytePublicKey.map(byte => {
        let byteString = byte.toString(16);
        byteString = byteString.length === 1 ? `0${byteString}` : byteString;
        publicKey += byteString;
      }).join('');
      this.publicKey = publicKey;
      return publicKey;
    }
  }

  async generateAddress() {
    if (this.bytePublicKey) {
        const address = keccak256(this.bytePublicKey.slice(1)).slice(24);
        const keccak256Address = keccak256(address);
        let checkSumAddress = '';
        for (let i = 0; i < 40; i++) {
            if (parseInt(keccak256Address[i], 16) >= 8 && !Number(address[i])) {
                checkSumAddress += address[i].toUpperCase();
            } else {
                checkSumAddress += address[i];
            }
        }
        this.address = `0x${checkSumAddress}`;
        console.log(this.address);
        return this.address;
    }
  }

  async generateAccessToken() {
    if (this.mnemonicWord || this.bytePrivateKey) {
        if (!this.bytePrivateKey) {
            const [bytePrivateKey, chainCode] = fromSeed(this.mnemonicWord, '');
            this.bytePrivateKey = bytePrivateKey;
        }
        const accessToken = keccak256(this.bytePrivateKey.slice(1)).slice(24);
        return accessToken;
    }
    throw new Error('there is neither mnemonic word nor private key');
  }

  async getNonce() {
    console.log('nonce内部');
    if (this.address) {
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
}

async getBalance() {
  if (this.address) {
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
    console.log('sign内部');
  if (this.bytePrivateKey) {
      const transaction = {};
      const nonce = await this.getNonce();
      console.log(nonce);
      transaction.nonce = nonce;
      transaction.gasPrice = `0x${parseInt(txParams.gasPrice, 10).toString(16)}`;
      transaction.gasLimit = `0x${parseInt(txParams.gasLimit, 10).toString(16)}`;
      transaction.to = txParams.toAddress;
      transaction.value = `0x${parseInt(txParams.value, 10).toString(16)}`;
      transaction.chainId = txParams.chainId;
      return new Promise(resolve => {
          const tx = new EthereumTx(transaction);
          tx.sign(this.bytePrivateKey); // ここはprivate keyをbyteで扱う
          resolve(tx);
      });
  }
}

// promiseを返してコードの汎用性を高める
    async sendRawTransaction(txParams) {
        console.log('sendraw内部');
        const signedTransaction = await this.signTransaction(txParams);
        console.log(signedTransaction);
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

    call(txParams) {
        const ethCall = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params:	[
                {
                    to: txParams.to,
                    data: txParams.data,
                },
                    'latest'
            ],
            id: 42
        };
        return new Promise(resolve => {
            fetch('https://kovan.infura.io/Y80MvxYEzKUddrYMy9Xj', {
                method: 'POST',
                body: JSON.stringify(ethCall),
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

export default Wallet;
