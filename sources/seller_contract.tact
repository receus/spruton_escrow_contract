import "@stdlib/ownable";
import "@stdlib/deploy";
import "./wallet";
import "./messages";

message SellProduct {
    productId: Int as uint32;
    buyer: Address;
    referral: Address;
    amount: Int as uint64;
}

message AddProduct {
    productId: Int as uint32;
    reward: Int as uint64;
    quantity: Int as uint64;
}

message RemoveProduct {
    productId: Int as uint32;
}

message SetServiceWallet {
    wallet: Address;
}

struct Product {
    id: Int as uint32;
    reward: Int as uint64;
    quantity: Int as uint64;
}

struct RewardDistribution {
    burn: Int as uint8;
    service: Int as uint8;
    referral: Int as uint8;
    buyer: Int as uint8;
}

contract SellerContract with Deployable, Ownable {
    owner: Address;
    products: map<Int as uint32, Product>;
    rewardDistribution: RewardDistribution;
    created: Int as uint64;
    lastUpdated: Int as uint64;
    serviceWallet: Address;
    jettonMaster: Address;

    init(owner: Address, serviceWallet: Address, jettonMaster: Address, random_tag: Cell) {
        self.owner = owner;
        self.created = now();
        self.lastUpdated = self.created;
        self.rewardDistribution = RewardDistribution {
            burn: 15,
            service: 20,
            referral: 50,
            buyer: 15
        };
        self.products = emptyMap();
        self.serviceWallet = serviceWallet;
        self.jettonMaster = jettonMaster;
    }

    receive(msg: SellProduct) {
        let productOpt: Product? = self.products.get(msg.productId);
        if (productOpt == null || productOpt!!.quantity < msg.amount) {
            throw(102);
        }

        let product: Product = productOpt!!;
        product.quantity -= msg.amount;
        self.products.set(msg.productId, product);
        self.distributeRewards(product, msg.buyer, msg.referral, self.owner, msg.amount);
        self.lastUpdated = now();
    }

    receive(msg: AddProduct) {
        let product: Product = Product {
            id: msg.productId,
            reward: msg.reward,
            quantity: msg.quantity
        };

        self.products.set(msg.productId, product);
        self.lastUpdated = now();
    }

    receive(msg: RemoveProduct) {
        self.products.set(msg.productId, null);
        self.lastUpdated = now();
    }

    receive(msg: SetServiceWallet) {
        require(self.owner == sender(), "Only the owner can set the service wallet!");
        self.serviceWallet = msg.wallet;
    }

    fun distributeRewards(product: Product, buyer: Address, referral: Address, seller: Address, amount: Int) {
        let totalReward: Int = product.reward;
        let burnAmount: Int = (totalReward * self.rewardDistribution.burn) / 100;
        let serviceAmount: Int = (totalReward * self.rewardDistribution.service) / 100;
        let referralAmount: Int = (totalReward * self.rewardDistribution.referral) / 100;
        let buyerAmount: Int = (totalReward * self.rewardDistribution.buyer) / 100;

        self.burn(burnAmount);
        self.transfer(serviceAmount, self.serviceWallet);
        self.transfer(referralAmount, referral);
        self.transfer(buyerAmount, buyer);
        self.transfer(amount - totalReward, seller);
    }

    fun burn(amount: Int) {
        send(SendParameters{
            to: self.jettonMaster,
            body: Burn{
                query_id: now(),
                amount: amount,
                response_destination: myAddress(),
                custom_payload: emptyCell()
            }.toCell(),
            value: ton("0.03"),
            mode: SendIgnoreErrors
        });
    }

    fun transfer(amount: Int, to: Address) {
        let walletAddress: Address = self.getWalletAddress(to);
        send(SendParameters{
            to: walletAddress,
            body: InternalTransfer{
                query_id: now(),
                amount: amount,
                from: myAddress(),
                response_destination: to,
                forward_ton_amount: ton("0.01"),
                forward_payload: emptySlice()
            }.toCell(),
            value: ton("0.03"),
            mode: SendIgnoreErrors
        });
    }

    get fun getWalletAddress(owner: Address): Address {
        let init: StateInit = initOf TokenWallet(owner, self.jettonMaster);
        return contractAddress(init);
    }

    get fun created(): Int {
        return self.created;
    }

    get fun lastUpdated(): Int {
        return self.lastUpdated;
    }

    get fun product(productId: Int): Product {
        let productOpt: Product? = self.products.get(productId);
        if (productOpt == null) {
            throw(103);
        }
        return productOpt!!;
    }

    get fun productIds(): Cell {
        let builder = beginCell();
        foreach (key, _ in self.products) {
            builder = builder.storeUint(key, 32);
        }
        return builder.endCell();
    }
}
