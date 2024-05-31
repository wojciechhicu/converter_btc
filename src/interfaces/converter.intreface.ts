export interface BlockHead {
	hash: string;
	height: number;
	version: number;
	versionHex: string;
	merkleroot: string;
	time: number;
	nonce: number;
	bits: string;
	difficulty: number;
	previousblockhash: string;
	strippedsize: number;
	size: number;
	weight: number;
}

export interface TX {
	txid: string;
	version: number;
	size: number;
	vsize: number;
	weight: number;
	locktime: number;
	vin: vin[];
	vout: vout[];
	vinOut?: vout[];
	blockhash: string;
	block_height: number;
	time: number;
	fee: number;
}

export interface vin {
	coinbase?: string;
	sequence: number;
	txid?: string;
        vout?: number;
        scriptSig?: ScriptSig;
}

export interface ScriptSig {
        asm: string;
        hex: string;
}
export interface vout {
	value: number;
	n: number;
	scriptPubKey: script;
}

export interface script {
	asm: string;
	desc?: string;
	hex?: string;
	type: string;
	address?: string;
}

export interface RpcBlock {
	hash: string;
	confirmations: number;
	height: number;
	version: number;
	versionHex: string;
	merkleroot: string;
	time: number;
	mediantime: number;
	nonce: number;
	bits: string;
	difficulty: number;
	chainwork: string;
	previousblockhash: string;
	strippedsize: number;
	size: number;
	nTx: number;
	nextblockhash: string;
	weight: number;
	tx: RpcTX[];
}

export interface RpcTX {
        txid: string;
        hash: string;
	version: number;
	size: number;
	vsize: number;
	weight: number;
	locktime: number;
	vin: vin[];
	vout: vout[];
        fee?: number;
        hex: string;
}