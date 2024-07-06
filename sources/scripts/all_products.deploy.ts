import * as fs from 'fs';
import * as path from 'path';
import { Address, beginCell } from "@ton/core";
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

    const productIdsCell = await sellerContract.getProductIds();
    const productIds = productIdsCell.toBoc().toString('hex').match(/.{1,8}/g)?.map(id => parseInt(id, 16));

    console.log("Product IDs in contract:", productIds);
})();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
