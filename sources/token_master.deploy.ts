import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress, beginCell, toNano } from "@ton/core";
import { TokenMaster } from "./output/token_TokenMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { buildOnchainMetadata } from "./build_data";
import metadata from './data.json';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";

const configPath = path.resolve(__dirname, './config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const testnet = config.testnet;
const mnemonic = config.mnemonic;
const owner = Address.parse(config.ownerAddress);
const initialTotalSupply = toNano("1000000");

(async () => {
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    const randomTag = beginCell().storeUint(Math.floor(Math.random() * 1e10), 64).endCell();
    let init = await TokenMaster.init(owner, buildOnchainMetadata(metadata));
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "./output", "token_TokenMaster.pkg"));

    console.log('Uploading package...');
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();
    await walletContract.sendTransfer({
        seqno: seqno,
        secretKey: key.secretKey,
        messages: [
            internal({
                to: address,
                value: toNano("0.1"),
                init: { data: init.data, code: init.code },
                body: beginCell()
                    .storeUint(0x1, 32) // Opcode for InitializeSupply
                    .storeCoins(initialTotalSupply)
                    .endCell(),
                bounce: false,
            })
        ]
    });

    let currentSeqno = seqno;
    while (currentSeqno === seqno) {
        console.log("waiting for transaction to confirm...");
        await sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }

    console.log(`Total supply initialized to ${initialTotalSupply} tokens.`);
    console.log(`Adress ${initialTotalSupply} tokens.`);

    config.jettonMaster = address.toString({ testOnly: testnet });
    console.log(`Adress ${config.jettonMaster}`);

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
