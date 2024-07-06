# TACT Compilation Report
Contract: TokenWallet
BOC Size: 1996 bytes

# Types
Total Types: 25

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## WalletData
TLB: `_ balance:int257 owner:address master:address code:^cell = WalletData`
Signature: `WalletData{balance:int257,owner:address,master:address,code:^cell}`

## Transfer
TLB: `transfer#0f817ea5 query_id:uint64 amount:coins destination:address response_destination:address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = Transfer`
Signature: `Transfer{query_id:uint64,amount:coins,destination:address,response_destination:address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## InternalTransfer
TLB: `internal_transfer#178d4519 query_id:uint64 amount:coins from:address response_destination:address forward_ton_amount:coins forward_payload:remainder<slice> = InternalTransfer`
Signature: `InternalTransfer{query_id:uint64,amount:coins,from:address,response_destination:address,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## TransferNotification
TLB: `transfer_notification#7362d09c query_id:uint64 amount:coins sender:address forward_payload:remainder<slice> = TransferNotification`
Signature: `TransferNotification{query_id:uint64,amount:coins,sender:address,forward_payload:remainder<slice>}`

## Excesses
TLB: `excesses#d53276db query_id:uint64 = Excesses`
Signature: `Excesses{query_id:uint64}`

## Burn
TLB: `burn#595f07bc query_id:uint64 amount:coins response_destination:address custom_payload:Maybe ^cell = Burn`
Signature: `Burn{query_id:uint64,amount:coins,response_destination:address,custom_payload:Maybe ^cell}`

## BurnNotification
TLB: `burn_notification#7bdd97de query_id:uint64 amount:coins sender:address response_destination:address = BurnNotification`
Signature: `BurnNotification{query_id:uint64,amount:coins,sender:address,response_destination:address}`

## ChangeContent
TLB: `change_content#10590ef2 jetton_content:^cell = ChangeContent`
Signature: `ChangeContent{jetton_content:^cell}`

## ProvideWalletAddress
TLB: `provide_wallet_address#2c76b973 query_id:uint64 owner_address:address include_address:bool = ProvideWalletAddress`
Signature: `ProvideWalletAddress{query_id:uint64,owner_address:address,include_address:bool}`

## TakeWalletAddress
TLB: `take_wallet_address#d1735400 query_id:uint64 wallet_address:address owner_address:Maybe address = TakeWalletAddress`
Signature: `TakeWalletAddress{query_id:uint64,wallet_address:address,owner_address:Maybe address}`

## InitializeSupply
TLB: `initialize_supply#00000001 amount:coins = InitializeSupply`
Signature: `InitializeSupply{amount:coins}`

## SellProduct
TLB: `sell_product#d42ae8a3 productId:uint32 buyer:address referral:address amount:uint64 = SellProduct`
Signature: `SellProduct{productId:uint32,buyer:address,referral:address,amount:uint64}`

## AddProduct
TLB: `add_product#32088cf4 productId:uint32 reward:uint64 quantity:uint64 = AddProduct`
Signature: `AddProduct{productId:uint32,reward:uint64,quantity:uint64}`

## RemoveProduct
TLB: `remove_product#181734c8 productId:uint32 = RemoveProduct`
Signature: `RemoveProduct{productId:uint32}`

## SetServiceWallet
TLB: `set_service_wallet#20fc90d0 wallet:address = SetServiceWallet`
Signature: `SetServiceWallet{wallet:address}`

## Product
TLB: `_ id:uint32 reward:uint64 quantity:uint64 = Product`
Signature: `Product{id:uint32,reward:uint64,quantity:uint64}`

## RewardDistribution
TLB: `_ burn:uint8 service:uint8 referral:uint8 buyer:uint8 = RewardDistribution`
Signature: `RewardDistribution{burn:uint8,service:uint8,referral:uint8,buyer:uint8}`

# Get Methods
Total Get Methods: 1

## get_wallet_data

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender
34435: Only the owner can set the service wallet!
51724: Invalid ton amount
54227: Invalid token amount