import * as fs from "fs";
import * as path from "path";
import { Address, toNano, beginCell, contractAddress } from "@ton/core";
import { SellerContract } from "./output/seller_SellerContract";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";

const configPath = path.resolve(__dirname, './config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const testnet = config.testnet;
const mnemonic = config.mnemonic;
const sellerContractAddress = Address.parse(config.sellerContractAddress);

(async () => {
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    const productId = 1n;
    const buyer = Address.parse("0QBbp-UouEK-mWlkXs6mOGfZ0esgtW8SE-gknp_6Pvt7Ve-y");
    const referral = Address.parse("0QBbp-UouEK-mWlkXs6mOGfZ0esgtW8SE-gknp_6Pvt7Ve-y");
    const amount = 2;

    const sellProductMessage = beginCell()
        .storeUint(0, 32)
        .storeUint(productId, 32)
        .storeAddress(buyer)
        .storeAddress(referral)
        .storeUint(amount, 64)
        .endCell();

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: sellerContractAddress,
                value: "0.05",
                body: sellProductMessage,
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

    console.log("Product sold in contract at:", sellerContractAddress.toString({ testOnly: testnet }));
})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
