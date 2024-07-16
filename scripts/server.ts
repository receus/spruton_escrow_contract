import express from 'express';
import { run } from './deployJettonTransfer';

const app = express();
app.use(express.json());

app.post('/distribute', async (req, res) => {
    try {
        const { network, amount, serviceAddress, buyerAddress, referrerAddress } = req.body;

        if (!network || !amount || !serviceAddress) {
            return res.status(400).send('Network, amount, and service address are required');
        }

        if (network !== 'testnet' && network !== 'mainnet') {
            return res.status(400).send('Network must be either testnet or mainnet');
        }

        await run(network, BigInt(amount), serviceAddress, buyerAddress, referrerAddress);

        res.status(200).send('Transfer completed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
