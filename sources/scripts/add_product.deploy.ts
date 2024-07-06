import * as fs from "fs";
import * as path from "path";
import { Address, toNano, beginCell } from "@ton/core";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";

const configPath = path.resolve(__dirname, './util/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const testnet = config.testnet;
const mnemonic = config.mnemonic;
const sellerContractAddress = Address.parse(config.sellerContractAddress);

(async () => {
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    console.log(wallet);

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    const productId = 1n;
    const reward = toNano("0.001"); // Reward for the product
    const quantity = 10; // Quantity available

    const addProductMessage = beginCell()
        .storeUint(0, 32) // Store the message header
        .storeUint(productId, 32) // Store the product ID
        .storeCoins(reward) // Store the reward
        .storeUint(quantity, 64) // Store the quantity
        .endCell();

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: sellerContractAddress,
                value: "0.05",
                body: addProductMessage,
                bounce: false,
            })
        ]
    });

    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        console.log("waiting for transaction to confirm...");
        await sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }

    console.log("Product added to contract at:", sellerContractAddress.toString({ testOnly: testnet }));
})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
