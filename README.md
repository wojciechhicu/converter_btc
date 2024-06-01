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
**WARNING**: Tested only in the Windows environment