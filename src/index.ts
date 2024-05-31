import { MongoClient, Collection } from "mongodb";
import axios from "axios";
import * as bitcoin from "bitcoinjs-lib";
import { env } from './env';

const connection_string = `${env.mongo.type}://${env.mongo.host}:${env.mongo.port}`;
const client = new MongoClient(connection_string);