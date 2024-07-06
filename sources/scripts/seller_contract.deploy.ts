import * as fs from "fs";
import * as path from "path";
import { Address, toNano, beginCell, contractAddress } from "@ton/core";
import { SellerContract } from "../output/seller_SellerContract";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";

const configPath = path.resolve(__dirname, './util/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const testnet = config.testnet;
const mnemonic = config.mnemonic;
const ownerAddress = Address.parse(config.ownerAddress);
const serviceWallet = Address.parse(config.serviceWallet);
const jettonMaster = Address.parse(config.jettonMaster);

(async () => {
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    const randomTag = beginCell().storeUint(Math.floor(Math.random() * 1000000), 32).endCell();

    let initSellerContract = await SellerContract.init(ownerAddress, serviceWallet, jettonMaster, randomTag);
    let sellerContractAddress = contractAddress(0, initSellerContract);
    let data = initSellerContract.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "../output", "seller_SellerContract.pkg"));

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: sellerContractAddress,
                value: "0.05",
                body: beginCell().endCell(),
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

    console.log("Contract deployed at:", sellerContractAddress.toString({ testOnly: testnet }));

    config.sellerContractAddress = sellerContractAddress.toString({ testOnly: testnet });
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
