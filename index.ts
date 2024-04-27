import config from './config.json'
import { MongoClient } from "mongodb";
import elastic from '@elastic/elasticsearch';

console.log(`connecting to source db - ${config.mongo.collection}`)

const mongoClient = new MongoClient(config.mongo.uri);
const elasticClient = new elastic.Client({
    node: 'http://localhost:9200'
})

await mongoClient.connect();
await mongoClient.db().command({ ping: 1})
console.log('Connected to Source Db')
const jobs = mongoClient.db().collection("jobs");
console.log('total jobs', await jobs.countDocuments())



await mongoClient.close(true);