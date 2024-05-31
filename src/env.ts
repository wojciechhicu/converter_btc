interface ENV {
	rpc: {
		username: string;
		password: string;
		host: string;
		port: number;
	};
	mongo: {
		type: string;
		host: string;
		port: number;
		database: string;
		collections: {
			blocks: string;
			addresses: string;
			transactions: string;
		};
	};
}


/**
 * RPC object is rpc channel for btc node
 * 
 * Mongo object is MongoDB conn string
 */
export const env: ENV = {
	rpc: {
		username: "ez4ence",
		password: "ez4ence123456",
		host: "127.0.0.1",
		port: 8332,
        },
        mongo: {
                type: "mongodb",
		host: "127.0.0.1",
		port: 27017,
		database: "bitcoin",
		collections: {
			blocks: "blocks",
			addresses: "addresses",
			transactions: "transactions"
		}
        }
};