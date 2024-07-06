import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260144805, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260144805) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type InternalTransfer = {
    $$type: 'InternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeInternalTransfer(src: InternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleInternalTransfer(source: InternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserInternalTransfer(): DictionaryValue<InternalTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type TransferNotification = {
    $$type: 'TransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell;
}

export function storeTransferNotification(src: TransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleTransferNotification(source: TransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransferNotification(): DictionaryValue<TransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type Burn = {
    $$type: 'Burn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeBurn(src: Burn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleBurn(source: Burn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserBurn(): DictionaryValue<Burn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurn(src)).endCell());
        },
        parse: (src) => {
            return loadBurn(src.loadRef().beginParse());
        }
    }
}

export type BurnNotification = {
    $$type: 'BurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
}

export function storeBurnNotification(src: BurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleBurnNotification(source: BurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserBurnNotification(): DictionaryValue<BurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type ChangeContent = {
    $$type: 'ChangeContent';
    jetton_content: Cell;
}

export function storeChangeContent(src: ChangeContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(274271986, 32);
        b_0.storeRef(src.jetton_content);
    };
}

export function loadChangeContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 274271986) { throw Error('Invalid prefix'); }
    let _jetton_content = sc_0.loadRef();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function loadTupleChangeContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function storeTupleChangeContent(source: ChangeContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.jetton_content);
    return builder.build();
}

function dictValueParserChangeContent(): DictionaryValue<ChangeContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeContent(src)).endCell());
        },
        parse: (src) => {
            return loadChangeContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Address | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadMaybeAddress();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type InitializeSupply = {
    $$type: 'InitializeSupply';
    amount: bigint;
}

export function storeInitializeSupply(src: InitializeSupply) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadInitializeSupply(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'InitializeSupply' as const, amount: _amount };
}

function loadTupleInitializeSupply(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'InitializeSupply' as const, amount: _amount };
}

function storeTupleInitializeSupply(source: InitializeSupply) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserInitializeSupply(): DictionaryValue<InitializeSupply> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitializeSupply(src)).endCell());
        },
        parse: (src) => {
            return loadInitializeSupply(src.loadRef().beginParse());
        }
    }
}

export type SellProduct = {
    $$type: 'SellProduct';
    productId: bigint;
    buyer: Address;
    referral: Address;
    amount: bigint;
}

export function storeSellProduct(src: SellProduct) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3559581859, 32);
        b_0.storeUint(src.productId, 32);
        b_0.storeAddress(src.buyer);
        b_0.storeAddress(src.referral);
        b_0.storeUint(src.amount, 64);
    };
}

export function loadSellProduct(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3559581859) { throw Error('Invalid prefix'); }
    let _productId = sc_0.loadUintBig(32);
    let _buyer = sc_0.loadAddress();
    let _referral = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(64);
    return { $$type: 'SellProduct' as const, productId: _productId, buyer: _buyer, referral: _referral, amount: _amount };
}

function loadTupleSellProduct(source: TupleReader) {
    let _productId = source.readBigNumber();
    let _buyer = source.readAddress();
    let _referral = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'SellProduct' as const, productId: _productId, buyer: _buyer, referral: _referral, amount: _amount };
}

function storeTupleSellProduct(source: SellProduct) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.productId);
    builder.writeAddress(source.buyer);
    builder.writeAddress(source.referral);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSellProduct(): DictionaryValue<SellProduct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSellProduct(src)).endCell());
        },
        parse: (src) => {
            return loadSellProduct(src.loadRef().beginParse());
        }
    }
}

export type AddProduct = {
    $$type: 'AddProduct';
    productId: bigint;
    reward: bigint;
    quantity: bigint;
}

export function storeAddProduct(src: AddProduct) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(839421172, 32);
        b_0.storeUint(src.productId, 32);
        b_0.storeUint(src.reward, 64);
        b_0.storeUint(src.quantity, 64);
    };
}

export function loadAddProduct(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 839421172) { throw Error('Invalid prefix'); }
    let _productId = sc_0.loadUintBig(32);
    let _reward = sc_0.loadUintBig(64);
    let _quantity = sc_0.loadUintBig(64);
    return { $$type: 'AddProduct' as const, productId: _productId, reward: _reward, quantity: _quantity };
}

function loadTupleAddProduct(source: TupleReader) {
    let _productId = source.readBigNumber();
    let _reward = source.readBigNumber();
    let _quantity = source.readBigNumber();
    return { $$type: 'AddProduct' as const, productId: _productId, reward: _reward, quantity: _quantity };
}

function storeTupleAddProduct(source: AddProduct) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.productId);
    builder.writeNumber(source.reward);
    builder.writeNumber(source.quantity);
    return builder.build();
}

function dictValueParserAddProduct(): DictionaryValue<AddProduct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddProduct(src)).endCell());
        },
        parse: (src) => {
            return loadAddProduct(src.loadRef().beginParse());
        }
    }
}

export type RemoveProduct = {
    $$type: 'RemoveProduct';
    productId: bigint;
}

export function storeRemoveProduct(src: RemoveProduct) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(404174024, 32);
        b_0.storeUint(src.productId, 32);
    };
}

export function loadRemoveProduct(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 404174024) { throw Error('Invalid prefix'); }
    let _productId = sc_0.loadUintBig(32);
    return { $$type: 'RemoveProduct' as const, productId: _productId };
}

function loadTupleRemoveProduct(source: TupleReader) {
    let _productId = source.readBigNumber();
    return { $$type: 'RemoveProduct' as const, productId: _productId };
}

function storeTupleRemoveProduct(source: RemoveProduct) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.productId);
    return builder.build();
}

function dictValueParserRemoveProduct(): DictionaryValue<RemoveProduct> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveProduct(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveProduct(src.loadRef().beginParse());
        }
    }
}

export type SetServiceWallet = {
    $$type: 'SetServiceWallet';
    wallet: Address;
}

export function storeSetServiceWallet(src: SetServiceWallet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(553423056, 32);
        b_0.storeAddress(src.wallet);
    };
}

export function loadSetServiceWallet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 553423056) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    return { $$type: 'SetServiceWallet' as const, wallet: _wallet };
}

function loadTupleSetServiceWallet(source: TupleReader) {
    let _wallet = source.readAddress();
    return { $$type: 'SetServiceWallet' as const, wallet: _wallet };
}

function storeTupleSetServiceWallet(source: SetServiceWallet) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    return builder.build();
}

function dictValueParserSetServiceWallet(): DictionaryValue<SetServiceWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetServiceWallet(src)).endCell());
        },
        parse: (src) => {
            return loadSetServiceWallet(src.loadRef().beginParse());
        }
    }
}

export type Product = {
    $$type: 'Product';
    id: bigint;
    reward: bigint;
    quantity: bigint;
}

export function storeProduct(src: Product) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeUint(src.reward, 64);
        b_0.storeUint(src.quantity, 64);
    };
}

export function loadProduct(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _reward = sc_0.loadUintBig(64);
    let _quantity = sc_0.loadUintBig(64);
    return { $$type: 'Product' as const, id: _id, reward: _reward, quantity: _quantity };
}

function loadTupleProduct(source: TupleReader) {
    let _id = source.readBigNumber();
    let _reward = source.readBigNumber();
    let _quantity = source.readBigNumber();
    return { $$type: 'Product' as const, id: _id, reward: _reward, quantity: _quantity };
}

function storeTupleProduct(source: Product) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.reward);
    builder.writeNumber(source.quantity);
    return builder.build();
}

function dictValueParserProduct(): DictionaryValue<Product> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProduct(src)).endCell());
        },
        parse: (src) => {
            return loadProduct(src.loadRef().beginParse());
        }
    }
}

export type RewardDistribution = {
    $$type: 'RewardDistribution';
    burn: bigint;
    service: bigint;
    referral: bigint;
    buyer: bigint;
}

export function storeRewardDistribution(src: RewardDistribution) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.burn, 8);
        b_0.storeUint(src.service, 8);
        b_0.storeUint(src.referral, 8);
        b_0.storeUint(src.buyer, 8);
    };
}

export function loadRewardDistribution(slice: Slice) {
    let sc_0 = slice;
    let _burn = sc_0.loadUintBig(8);
    let _service = sc_0.loadUintBig(8);
    let _referral = sc_0.loadUintBig(8);
    let _buyer = sc_0.loadUintBig(8);
    return { $$type: 'RewardDistribution' as const, burn: _burn, service: _service, referral: _referral, buyer: _buyer };
}

function loadTupleRewardDistribution(source: TupleReader) {
    let _burn = source.readBigNumber();
    let _service = source.readBigNumber();
    let _referral = source.readBigNumber();
    let _buyer = source.readBigNumber();
    return { $$type: 'RewardDistribution' as const, burn: _burn, service: _service, referral: _referral, buyer: _buyer };
}

function storeTupleRewardDistribution(source: RewardDistribution) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.burn);
    builder.writeNumber(source.service);
    builder.writeNumber(source.referral);
    builder.writeNumber(source.buyer);
    return builder.build();
}

function dictValueParserRewardDistribution(): DictionaryValue<RewardDistribution> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRewardDistribution(src)).endCell());
        },
        parse: (src) => {
            return loadRewardDistribution(src.loadRef().beginParse());
        }
    }
}

 type SellerContract_init_args = {
    $$type: 'SellerContract_init_args';
    owner: Address;
    serviceWallet: Address;
    jettonMaster: Address;
    random_tag: Cell;
}

function initSellerContract_init_args(src: SellerContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.serviceWallet);
        b_0.storeAddress(src.jettonMaster);
        b_0.storeRef(src.random_tag);
    };
}

async function SellerContract_init(owner: Address, serviceWallet: Address, jettonMaster: Address, random_tag: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSellerContract_init_args({ $$type: 'SellerContract_init_args', owner, serviceWallet, jettonMaster, random_tag })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SellerContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    34435: { message: `Only the owner can set the service wallet!` },
    51724: { message: `Invalid ton amount` },
    54227: { message: `Invalid token amount` },
}

const SellerContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Transfer","header":260144805,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"InternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Burn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"BurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeContent","header":274271986,"fields":[{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"InitializeSupply","header":1,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SellProduct","header":3559581859,"fields":[{"name":"productId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"buyer","type":{"kind":"simple","type":"address","optional":false}},{"name":"referral","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"AddProduct","header":839421172,"fields":[{"name":"productId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"reward","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"quantity","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"RemoveProduct","header":404174024,"fields":[{"name":"productId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"SetServiceWallet","header":553423056,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Product","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"reward","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"quantity","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"RewardDistribution","header":null,"fields":[{"name":"burn","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"service","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"referral","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"buyer","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
]

const SellerContract_getters: ABIGetter[] = [
    {"name":"getWalletAddress","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"created","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lastUpdated","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"product","arguments":[{"name":"productId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Product","optional":false}},
    {"name":"productIds","arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SellerContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SellProduct"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddProduct"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveProduct"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetServiceWallet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SellerContract implements Contract {
    
    static async init(owner: Address, serviceWallet: Address, jettonMaster: Address, random_tag: Cell) {
        return await SellerContract_init(owner, serviceWallet, jettonMaster, random_tag);
    }
    
    static async fromInit(owner: Address, serviceWallet: Address, jettonMaster: Address, random_tag: Cell) {
        const init = await SellerContract_init(owner, serviceWallet, jettonMaster, random_tag);
        const address = contractAddress(0, init);
        return new SellerContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SellerContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SellerContract_types,
        getters: SellerContract_getters,
        receivers: SellerContract_receivers,
        errors: SellerContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SellProduct | AddProduct | RemoveProduct | SetServiceWallet | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SellProduct') {
            body = beginCell().store(storeSellProduct(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddProduct') {
            body = beginCell().store(storeAddProduct(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveProduct') {
            body = beginCell().store(storeRemoveProduct(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetServiceWallet') {
            body = beginCell().store(storeSetServiceWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('getWalletAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getCreated(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('created', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getLastUpdated(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('lastUpdated', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getProduct(provider: ContractProvider, productId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(productId);
        let source = (await provider.get('product', builder.build())).stack;
        const result = loadTupleProduct(source);
        return result;
    }
    
    async getProductIds(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('productIds', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}