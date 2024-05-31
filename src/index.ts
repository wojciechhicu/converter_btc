import { MongoClient, Collection } from 'mongodb';
import { get_block_hash, get_block, get_last_block_height, block_head_from_rpc_block } from './utils/converter';
import * as bitcoin from 'bitcoinjs-lib';
import { env } from './env';
import { BlockHead } from './interfaces/converter.intreface';

const connection_string = `${env.mongo.type}://${env.mongo.host}:${env.mongo.port}`;
const client = new MongoClient(connection_string);

main_converter();

async function main_converter() {
	try {
		await client.connect();
		const db = client.db(env.mongo.database);
		const block_collection = db.collection(env.mongo.collections.blocks);
		const transaction_collection = db.collection(env.mongo.collections.transactions);
		const url = `http://${env.rpc.username}:${env.rpc.password}@${env.rpc.host}:${env.rpc.port}`;
		// while (true) {
		const last_block_height = await get_last_block_height(block_collection);
		const next_block_hash = await get_block_hash(url, last_block_height);
		const next_block = await get_block(url, next_block_hash);
		const blk_head = block_head_from_rpc_block(next_block);
		//}
	} catch (e) {
		await client.close();
	} finally {
		await client.close();
	}
}
