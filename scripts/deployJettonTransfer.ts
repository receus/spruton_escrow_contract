import * as fs from "fs";
import * as path from "path";
import { Address, toNano, beginCell } from '@ton/core';
import { JettonWallet } from '../wrappers/JettonWallet';
import { TonClient, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from '@ton/crypto';
import { getHttpEndpoint } from '@orbs-network/ton-access';

export const mnemonicToKeys = mnemonicToPrivateKey;
const workchain = 0;

export const returnTonWallet = (publicKey: Buffer): WalletContractV4 => {
    return WalletContractV4.create({ workchain, publicKey });
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function transferTokens(
    network: 'testnet' | 'mainnet',
    amount: bigint,
    toAddress: string,
    config: any
) {
    const endpoint = await getHttpEndpoint({ network });
    const client = new TonClient({ endpoint });

    const keys = await mnemonicToKeys(config.mnemonic.split(' '));
    const wallet = returnTonWallet(keys.publicKey);
    const openedWallet = client.open(wallet);
    const sender = openedWallet.sender(keys.secretKey);

    const senderWallet = JettonWallet.createFromAddress(Address.parse(config.senderJettonWalletAddress));
    const senderWalletContract = client.open(senderWallet);

    const customPayload = beginCell().endCell();
    const forwardPayload = beginCell().endCell();

    console.log(`Starting transfer to ${toAddress} on ${network}`);
    await senderWalletContract.sendTransfer(
        sender,
        toNano('0.2'),
        amount,
        Address.parse(toAddress),
        sender.address!,
        customPayload,
        toNano('0.1'),
        forwardPayload,
    );
    console.log(`Transfer to ${toAddress} on ${network} completed`);
}

async function burnTokens(
    network: 'testnet' | 'mainnet',
    amount: bigint,
    config: any
) {
    const endpoint = await getHttpEndpoint({ network });
    const client = new TonClient({ endpoint });

    const keys = await mnemonicToKeys(config.mnemonic.split(' '));
    const wallet = returnTonWallet(keys.publicKey);
    const openedWallet = client.open(wallet);
    const sender = openedWallet.sender(keys.secretKey);

    const senderWallet = JettonWallet.createFromAddress(Address.parse(config.senderJettonWalletAddress));
    const senderWalletContract = client.open(senderWallet);

    const customPayload = beginCell().endCell();

    console.log(`Starting burn tokens on ${network}`);
    await senderWalletContract.sendBurn(
        sender,
        toNano('0.05'),
        amount,
        sender.address!,
        customPayload,
    );
    console.log(`Burn tokens on ${network} completed`);
}

export async function run(
    network: 'testnet' | 'mainnet',
    amount: bigint,
    serviceAddress: string,
    buyerAddress?: string,
    referrerAddress?: string
) {
    const configPath = path.resolve(__dirname, './util/config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    const burnAmount = (amount * 15n) / 100n;
    const serviceAmount = (amount * 20n) / 100n;
    const referralAmount = (amount * 50n) / 100n;
    const buyerAmount = (amount * 15n) / 100n;

    try {
        await transferTokens(network, serviceAmount, serviceAddress, config);
        await delay(20000);

        if (referrerAddress) {
            await transferTokens(network, referralAmount, referrerAddress, config);
            await delay(20000);
        }

        if (buyerAddress) {
            await transferTokens(network, buyerAmount, buyerAddress, config);
            await delay(20000);
        }

        await burnTokens(network, burnAmount, config);
        await delay(20000);

        console.log('All transfers completed successfully.');
    } catch (error) {
        console.error('Error during transfer operations:', error);
    }
}

