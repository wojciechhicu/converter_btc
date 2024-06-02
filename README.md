# Pixel converter

This application is written in TypeScript for Node.js. It serves the purpose of converting data from the .dat format in the Bitcoin blockchain to JSON format, which is then stored in MongoDB.

### Key Features

- **TypeScript and Node.js**: The application is developed using TypeScript for enhanced type safety and modern JavaScript features, running on the Node.js platform.
- **Bitcoin Blockchain Data Processing**: Utilizes Bitcoin RPC to fetch and process data from the Bitcoin blockchain.
- **JSON Conversion**: Converts blockchain data into JSON object format.
- **MongoDB Integration**: Stores the converted data in a MongoDB database for efficient querying and management.
- **Service Registration**: The application can be registered as a service for continuous operation.

## Can I trust this code?

> Don't trust. Verify.

## Project Status

⚠️ **Work in Progress**: This application is currently under development. While every effort is made to ensure its functionality and reliability, please note that it may contain bugs or incomplete features. Use at your own discretion.

**WARNING**: Tested only in the Windows environment till block height 300.000

## Documentation

📚 **Code Documentation**: As of now, all documentation is embedded within the codebase, providing insights into each function and its usage.

## Requirements

Before running the application, ensure the following prerequisites are met:

- **Running Bitcoin Node**: A Bitcoin node must be running with the RPC channel enabled and the following settings configured in bitcoin.conf file:

```
rpcuser=<your_rpc_username>
rpcpassword=<your_rpc_password>
server=1
rpcworkqueue=100
rpcthreads=4
```

- **MongoDB Database**: MongoDB version 7 or higher should be installed. While backward compatible, version 7 is optimized for better performance.
  Supports only format:

```
type: "mongodb",
host: "127.0.0.1",
port: 27017,
database: "bitcoin",
collections:
        {
		blocks: "blocks",
		addresses: "addresses",
		transactions: "transactions"
	}
```

- **Node.js Environment**: Node.js environment is required for running the application (v16+).

## Installation

In root folder run:

```bash
npm install
#It will install all needed dependencies
```

**USAGE**
Before running the application, make sure to configure the necessary credentials and URLs. All relevant information for logging in and creating URLs can be found in the `env.ts` file located in the `root_folder/src/env.ts`.

The application can be used in two ways:

1. [**Node.js Application**](#as-nodejs-app): Run the application using Node.js.
2. [**Windows Service**](#as-service): Alternatively, it can be registered as a service in a Windows system.

### As Node.js App:

        * Run `npm run build` in root folder. It's gonna start app as Node.js app. 
        To shut down the applications in a safe way, type stop in the console. 
        To exit from app type `ctrl + c`

### As service:

        * Run `npm run compile` in root folder to compile all files from TS to JS.
        * Run `cd dist/utils` to change folder to service files.
        * Run `node service-register.js`. This run service. To stop service write `stop` in the console. 
        To exit from app type `ctrl + c`

## Output Description
To make smaller blockchain in MongoDB some of the data is not included / changed:

<table align="center" width="100%">
<tbody align="center" width="100%">
<tr>
<th align="center">
<p>
<small>
BTC RPC
</small>
</p>
</th>
<th align="center">
<p>
<small>
MongoDB
</small>
</p>
</th>
</tr>
<tr>
<td>

```ts
interface RpcBlock {
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
interface RpcTX {
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
interface vin {
	coinbase?: string;
	sequence: number;
	txid?: string;
        vout?: number;
        scriptSig?: ScriptSig;
}
interface ScriptSig {
        asm: string;
        hex: string;
}
interface vout {
	value: number;
	n: number;
	scriptPubKey: script;
}
interface script {
	asm: string;
	desc?: string;
	hex?: string;
	type: string;
	address?: string;
}
```
</td>
<td>

```ts
interface BlockHead {
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
interface TX {
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
interface vin {
	coinbase?: string;
	sequence: number;
	txid?: string;
        vout?: number;
        scriptSig?: ScriptSig;
}
interface ScriptSig {
        asm: string;
        hex: string;
}
interface vout {
	value: number;
	n: number;
	scriptPubKey: script;
}
interface script {
	asm: string;
	desc?: string;
	hex?: string;
	type: string;
	address?: string;
}
```
</td>
</tr>
</tbody>
</table>

**HONORABLE MENTION**
This project owes a debt of gratitude to another project that significantly eased its development.

**[Bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)**: It would be much harder to implement some of the functionallity witchout this library.