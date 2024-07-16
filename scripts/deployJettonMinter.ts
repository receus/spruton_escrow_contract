import { toNano } from '@ton/core';
import { JettonMinter, jettonContentToCell } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';
import { promptAddress, promptBool } from '../wrappers/ui-utils';

const formatUrl = 'https://gist.githubusercontent.com/receus/27e50749c18938219d5d1a7e0178e99d/raw/ba0396e43d5b9e91370dedce7699cf653147bf50/content2.json';

// const tokenMetadataPath = path.join(__dirname, './util/data.json');
// const tokenContent = JSON.parse(fs.readFileSync(tokenMetadataPath, 'utf8'));

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    const sender = provider.sender();
    const adminPrompt = 'Please specify admin address';
    ui.write(`Jetton deployer\nCurrent deployer only supports off-chain format:${formatUrl}`);

    let admin = await promptAddress(adminPrompt, ui, sender.address);
    ui.write(`Admin address: ${admin}\n`);
    let contentUrl = formatUrl;
    ui.write(`Jetton content url: ${contentUrl}`);

    let dataCorrect = false;
    do {
        ui.write("Please verify data:\n");
        ui.write(`Admin: ${admin}\n\n`);
        ui.write(`Metadata url: ${contentUrl}`);
        dataCorrect = await promptBool('Is everything ok? (y/n)', ['y', 'n'], ui);
        if (!dataCorrect) {
            const upd = await ui.choose('What do you want to update?', ['Admin', 'Url'], (c) => c);
            if (upd === 'Admin') {
                admin = await promptAddress(adminPrompt, ui, sender.address);
            } else {
                contentUrl = formatUrl;
            }
        }
    } while (!dataCorrect);

    const content = jettonContentToCell({ type: 1, uri: contentUrl });

    const wallet_code = await compile('JettonWallet');

    const minter = JettonMinter.createFromConfig({
        admin,
        content,
        wallet_code,
    }, await compile('JettonMinter'));

    const contractProvider = provider.provider(minter.address, {
        code: minter.init?.code,
        data: minter.init?.data,
    });

    await minter.sendDeploy(contractProvider, sender, toNano('0.05'));

    // Mint tokens
    const mintAmount = 999999999n; // Example mint amount
    await minter.sendMint(contractProvider, sender, admin, mintAmount, toNano('0.12'), toNano('0.5'));


}
