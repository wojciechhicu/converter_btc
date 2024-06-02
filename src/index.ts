import { MongoClient } from 'mongodb';
import { get_block_hash, get_block, get_last_block_height, block_head_from_rpc_block, insert_block_header, smaller_txs_from_rpc_block, insert_transactions } from './utils/converter';
import { env } from './env';
import readline from 'readline';

// stop flag to stop the process
let stop = false;

// Code to stop process after writing 'stop' in console
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.write("To stop process write 'stop' in the console \n");
rl.on('line', input => {
	if (input.trim().toLowerCase() === 'stop') {
		stop = true;
		rl.close();
	}
});

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

		// when you write 'stop' in the console, process will stop after finishing last task
		while (!stop) {
			//console.time('Block parsed in:');
			//console.log('1');
			const last_block_height = await get_last_block_height(block_collection);
			//console.log('2');
			const next_block_hash = await get_block_hash(url, last_block_height);
			//console.log('3');
			if (next_block_hash === null) {
				console.log('Up to date witch blockchain. Waiting 10 seconds for new block.');
				await new Promise(resolve => setTimeout(resolve, 10000));
				continue;
			}
			//console.log('4');
			const next_block = await get_block(url, next_block_hash);
			//console.log('5');
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

			//console.log(`New block added to DB: ${blk_head.height}`);
		}
	} catch (e: any) {
		await client.close();
		throw new Error(e);
	} finally {
		await client.close();
	}
}
