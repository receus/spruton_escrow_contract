import * as fs from 'fs';
import * as path from 'path';
import { Address, toNano, beginCell } from "@ton/core";
import { SellerContract } from "../output/seller_SellerContract";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";

const configPath = path.resolve(__dirname, './util/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const testnet = config.testnet;
const mnemonic = config.mnemonic;
const sellerContractAddress = config.sellerContractAddress;

(async () => {
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    const sellerContract = client.open(SellerContract.fromAddress(Address.parse(sellerContractAddress)));

    const productId = 1n;

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        seqno: seqno,
        secretKey: key.secretKey,
        messages: [
            internal({
                to: sellerContract.address,
                value: "0.05",
                body: beginCell()
                    .storeUint(0x2c76b973, 32) // opcode for RemoveProduct
                    .storeUint(productId, 32)
                    .endCell()
            })
        ]
    });

    let currentSeqno = seqno;
    while (currentSeqno === seqno) {
        console.log("waiting for transaction to confirm...");
        await sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }

    console.log(`Product with ID ${productId} removed.`);
})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
