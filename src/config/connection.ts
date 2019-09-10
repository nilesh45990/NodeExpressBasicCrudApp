import { Cluster, Bucket, N1qlQuery } from 'couchbase';
import * as dotenv from 'dotenv';

class Connection {
    private _cluster: Cluster;
    private _bucket: Bucket;

    constructor() {
        this.connect();
    }

    public getBucket() {
        return this._bucket;
    }

    public connect() {
        try {
            dotenv.config();
            console.log('-- start init bucket')
            this._cluster = new Cluster(process.env.COUCHBASE_URL);
            this._cluster.authenticate(process.env.COUCHBASE_USER, process.env.COUCHBASE_PASSWORD);
            this._bucket = this._cluster.openBucket(process.env.COUCHBASE_BUCKET)
                .on('connect', () => console.log('Couchbase db connected successfully'))
                .on('error', (error) => {
                    setTimeout(() => { this.connect(); }, 5000);
                    console.log(error.message);
                }); 
        } catch (error) {
            console.log(error);
        }
    }
}
const bucket = new Connection().getBucket();
export { bucket, N1qlQuery };