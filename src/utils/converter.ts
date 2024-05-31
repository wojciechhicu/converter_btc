import axios from 'axios';
import { Collection } from 'mongodb';
import { RpcTX } from '../interfaces/converter.intreface';

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
                return await (await axios.post(url, { jsonrpc: '2.0', method: 'getblockhash', params: [lblock + 1], id: 1 }).catch((e) => {
                        throw new Error(`Canot get block hash: ${e}`);
                })).data.result;
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
export async function get_block(url: string, hash: string): Promise<RpcTX> {
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
