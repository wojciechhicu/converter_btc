import axios from 'axios';
import { Collection } from 'mongodb';
import { BlockHead, RpcBlock, RpcTX, TX } from '../interfaces/converter.intreface';

/**
 * Function gets next block hash
 * @param {string} url - The `url` parameter is a string that represents the URL of the server or API
 * endpoint from which you want to retrieve the block hash. This URL is used in the `axios.post` method
 * to make a POST request to the server with the specified JSON-RPC parameters to get the block hash.
 * @param {number} lblock - The `lblock` parameter in the `get_block_hash` function represents the
 * block number for which you want to retrieve the hash + 1.
 * @returns The function `get_block_hash` is returning a Promise that resolves to a string corresponding to next block
 */
export async function get_block_hash(url: string, lblock: number): Promise<string> {
	try {
		return await (
			await axios.post(url, { jsonrpc: '2.0', method: 'getblockhash', params: [lblock + 1], id: 1 }).catch(e => {
				throw new Error(`Canot get block hash: ${e}`);
			})
		).data.result;
	} catch (e) {
		throw new Error(`Canot get block hash: ${e}`);
	}
}

/**
 * The function `get_block` makes an asynchronous request to a BTC RPC to retrieve a block using
 * a given hash.
 * @param {string} url - The `url` parameter is a string that represents the URL endpoint where the
 * HTTP POST request will be sent to retrieve information about a specific block in a blockchain.
 * @param {string} hash - The `hash` parameter in the `get_block` function is a string
 * representing the hash of a block in a blockchain. It is used to identify and retrieve specific
 * blocks from the blockchain.
 * @returns The `get_block` function is returning a Promise that resolves to a `RpcTX` object.
 */
export async function get_block(url: string, hash: string): Promise<RpcBlock> {
	try {
		return (
			await axios.post(url, { jsonrpc: '2.0', method: 'getblock', params: [hash, 2], id: 1 }).catch(e => {
				throw new Error(e);
			})
		).data.result;
	} catch (e) {
		throw new Error(`Cannot get block: ${e}`);
	}
}

/**
 * The function `get_last_block_height` retrieves the height of the last block in a collection.
 * @param {Collection} col - The parameter `col` is a Collection object that is used to interact with a
 * database collection. In the provided function `get_last_block_height`, the function queries the
 * collection to find the document with the highest `height` value and returns that value as the last
 * block height.
 * @returns The function `get_last_block_height` returns the height of the last block in the collection
 * `col`. If there are no blocks in the collection, it returns -1.
 */
export async function get_last_block_height(col: Collection): Promise<number> {
	const full_block = await col.findOne({}, { sort: { height: -1 } });
	return full_block !== null ? full_block.height : -1;
}

/**
 * The function `block_head_from_rpc_block` extracts specific properties from an RPC block object and
 * returns a `BlockHead` object.
 * @param {RpcBlock} rpc_block - RpcBlock object containing block data fetched from an RPC call. It
 * includes properties like hash, height, version, versionHex, merkleroot, time, nonce, bits,
 * difficulty, previousblockhash, strippedsize, size, weight and many more.
 * @returns The function `block_head_from_rpc_block` takes in an `RpcBlock` object and extracts
 * specific properties from it to create a `BlockHead` object. The extracted properties include `hash`,
 * `height`, `version`, `versionHex`, `merkleroot`, `time`, `nonce`, `bits`, `difficulty`,
 * `previousblockhash`, `strippedsize`, `size`,
 */
export function block_head_from_rpc_block(rpc_block: RpcBlock): BlockHead {
	const { hash, height, version, versionHex, merkleroot, time, nonce, bits, difficulty, previousblockhash, strippedsize, size, weight } = rpc_block;
	return { hash, height, version, versionHex, merkleroot, time, nonce, bits, difficulty, previousblockhash, strippedsize, size, weight };
}

/**
 * The function `insert_block_header` inserts a block header into a collection asynchronously to MongoDB blocks collection.
 * @param {BlockHead} header - The `header` parameter is of type `BlockHead`, which contains
 * information about a block header in a BTC blockchain.
 * @param {Collection} blk_col - The `blk_col` parameter is a MongoDB collection where the `header`
 * object will be inserted.
 */
export async function insert_block_header(header: BlockHead, blk_col: Collection): Promise<void> {
	await blk_col.insertOne(header).catch(err => {
		throw new Error(err);
	});
}

/**
 * The function `smaller_txs_from_rpc_block` takes an array of RpcTX objects, a block hash, block
 * height, and timestamp, and returns an array of TX objects with selected properties.
 * @param {RpcTX[]} txs - The `txs` parameter is an array of objects representing transactions in RPC
 * channel format.
 * @param {string} block_hash - The `block_hash` parameter is a string representing the hash of a block
 * in a blockchain. It uniquely identifies a specific block within the blockchain network. Added from block for faster searching.
 * @param {number} block_height - The `block_height` parameter represents the height of the block in
 * the blockchain. It is a numerical value that indicates the position of the block within the
 * blockchain.
 * @param {number} timestamp - The `timestamp` parameter represents the time at which the block was
 * mined or the transaction occurred. It is a Unix timestamp, which is a way to represent time as the
 * number of miliseconds that have elapsed since January 1, 1970, UTC.
 * @returns The function `smaller_txs_from_rpc_block` takes an array of RpcTX objects, a block hash,
 * block height, and timestamp as input parameters. It then maps over the RpcTX array and returns a new
 * array of TX objects with selected properties from the RpcTX objects along with additional properties
 * like time, block height, and block hash.
 */
export function smaller_txs_from_rpc_block(txs: RpcTX[], block_hash: string, block_height: number, timestamp: number): TX[]{
        return txs.map(RPCtx => ({
		txid: RPCtx.txid,
		version: RPCtx.version,
		size: RPCtx.size,
		vsize: RPCtx.vsize,
		weight: RPCtx.weight,
		locktime: RPCtx.locktime,
		vin: RPCtx.vin,
		vout: RPCtx.vout,
                fee: RPCtx.fee,
                time: timestamp,
                block_height,
                blockhash: block_hash
	}));
}

/**
 * Function inserts an array of transactions into a transaction collection in a MongoDB
 * database.
 * @param {TX[]} txs - The `txs` parameter is an array of transactions (`TX[]`) that you want to insert
 * into a collection.
 * @param {Collection} txs_col - The `txs_col` parameter is a MongoDB collection where you want to
 * insert the array of transactions (`txs`).
 */
export async function insert_transactions(txs: TX[], txs_col: Collection): Promise<void> {
	await txs_col.insertMany(txs).catch(err => {
		throw new Error(err);
	});
}