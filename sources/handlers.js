const { TonClient, WalletContractV4, internal, beginCell } = require('@ton/core');
const { mnemonicToWalletKey } = require('@ton/crypto');
const { getHttpEndpoint } = require('@orbs-network/ton-access');
const mysql = require('mysql2/promise');
const config = require('./config.json');

let connection;

async function initDbConnection() {
    if (!connection) {
        connection = await mysql.createConnection(config.database);
    }
}

const client = new TonClient({ endpoint: await getHttpEndpoint({ network: 'testnet' }) });
const key = await mnemonicToWalletKey(config.mnemonic.split(" "));
const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
const walletContract = client.open(wallet);
const sellerContractAddress = Address.parse(config.sellerContractAddress);

async function addProduct(req, res) {
    try {
        await initDbConnection();
        const { productId, reward, quantity } = req.body;
        const seqno = await walletContract.getSeqno();

        await walletContract.sendTransfer({
            seqno,
            secretKey: key.secretKey,
            messages: [
                internal({
                    to: sellerContractAddress,
                    value: "0.05",
                    body: beginCell()
                        .storeUint(0x178d4519, 32) // opcode для AddProduct
                        .storeUint(productId, 32)
                        .storeCoins(reward)
                        .storeUint(quantity, 64)
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

        await connection.execute('INSERT INTO products (productId, reward, quantity) VALUES (?, ?, ?)', [productId, reward, quantity]);

        res.status(200).send(`Product with ID ${productId} added with reward ${reward} and quantity ${quantity}.`);
    } catch (error) {
        res.status(500).send(`Error adding product: ${error.message}`);
    }
}

async function removeProduct(req, res) {
    try {
        await initDbConnection();
        const { productId } = req.body;
        const seqno = await walletContract.getSeqno();

        await walletContract.sendTransfer({
            seqno,
            secretKey: key.secretKey,
            messages: [
                internal({
                    to: sellerContractAddress,
                    value: "0.05",
                    body: beginCell()
                        .storeUint(0x1f2d3c4b, 32) // opcode для RemoveProduct
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

        await connection.execute('DELETE FROM products WHERE productId = ?', [productId]);

        res.status(200).send(`Product with ID ${productId} removed.`);
    } catch (error) {
        res.status(500).send(`Error removing product: ${error.message}`);
    }
}

async function sellProduct(req, res) {
    try {
        await initDbConnection();
        const { productId, buyer, referral, amount } = req.body;
        const seqno = await walletContract.getSeqno();

        await walletContract.sendTransfer({
            seqno,
            secretKey: key.secretKey,
            messages: [
                internal({
                    to: sellerContractAddress,
                    value: "0.1",
                    body: beginCell()
                        .storeUint(0x2a3b4c5d, 32) // opcode для SellProduct
                        .storeUint(productId, 32)
                        .storeAddress(Address.parse(buyer))
                        .storeAddress(Address.parse(referral))
                        .storeUint(amount, 64)
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

        await connection.execute('UPDATE products SET quantity = quantity - ? WHERE productId = ?', [amount, productId]);

        res.status(200).send(`Product with ID ${productId} sold in quantity ${amount}.`);
    } catch (error) {
        res.status(500).send(`Error selling product: ${error.message}`);
    }
}

async function getProducts(req, res) {
    try {
        await initDbConnection();
        const [rows] = await connection.execute('SELECT * FROM products');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).send(`Error getting products: ${error.message}`);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    addProduct,
    removeProduct,
    sellProduct,
    getProducts
};
