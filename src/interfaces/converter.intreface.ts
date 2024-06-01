/**
 * Block head in database.
 */
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

/**
 * Final version of tx in db. After using tools its gonna have new field vinout 
 * which contain vouts for vins.
 * 
 * blockhash, block_height and time is added after transforming RPC txs from block.
 */
export interface TX {
	txid: string;
	version: number;
	size: number;
	vsize: number;
	weight: number;
	locktime: number;
	vin: vin[];
	vout: vout[];
	blockhash: string;
	block_height: number;
	time: number;
	fee?: number;
}

/**
 * VINS for tx same as from RPC
 */
export interface vin {
	coinbase?: string;
	sequence: number;
	txid?: string;
        vout?: number;
        scriptSig?: ScriptSig;
}

/**
 * ScriptSig same like RPC script
 */
export interface ScriptSig {
        asm: string;
        hex: string;
}

/**
 * tx vout same as RPC vout
 */
export interface vout {
	value: number;
	n: number;
	scriptPubKey: script;
}

/**
 * vout script 
 */
export interface script {
	asm: string;
	desc?: string;
	hex?: string;
	type: string;
	address?: string;
}

/**
 * Block data from btc RPC channel.
 */
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

/**
 * Transaction from BTC RPC channel.
 * 
 * Included in block querry
 */
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