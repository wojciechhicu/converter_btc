import { MongoClient } from 'mongodb';
import { get_block_hash, get_block, get_last_block_height, block_head_from_rpc_block, insert_block_header, smaller_txs_from_rpc_block, insert_transactions } from './utils/converter';
import { env } from './env';


/*`const connection_string = `${env.mongo.type}://${env.mongo.host}:${env.mongo.port}`;` is
creating a connection string for MongoDB. This string will be used to connect to the MongoDB database
using the specified type, host, and port provided in the `env` configuration. 
Then creating client object for MongoDB. Variables as GLOBAL scope*/
const connection_string = `${env.mongo.type}://${env.mongo.host}:${env.mongo.port}`;
const client = new MongoClient(connection_string);

// BTC RPC connection string as GLOBAL var
const url = `http://${env.rpc.username}:${env.rpc.password}@${env.rpc.host}:${env.rpc.port}`;

main_converter();

async function main_converter() {
        try {
		// creating connection to MongoDB
		await client.connect();

		// choosing MongoDB database
		const db = client.db(env.mongo.database);

		// Creating collections
		const block_collection = db.collection(env.mongo.collections.blocks);
		const transaction_collection = db.collection(env.mongo.collections.transactions);

		const last_block_height = await get_last_block_height(block_collection);
		const next_block_hash = await get_block_hash(url, last_block_height);
		const next_block = await get_block(url, next_block_hash);
		let blk_head = block_head_from_rpc_block(next_block);

		// Swapping seconds format timestamp to milliseconds timestamp
		blk_head.time *= 1000;

		const transformed_txs = smaller_txs_from_rpc_block(next_block.tx, blk_head.hash, blk_head.height, blk_head.time);

		/**
		 * Inserting block headers to MongoDB block collection
		 * Inserting transactions to MongoDB transactions collection
		 */
		await insert_block_header(blk_head, block_collection);
		await insert_transactions(transformed_txs, transaction_collection);
	} catch (e: any) {
		await client.close();
		throw new Error(e);
	} finally {
		await client.close();
	}
}
