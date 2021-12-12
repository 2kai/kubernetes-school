import {connect, StringCodec} from 'nats';

const natsServer = {servers: process.env.NATS_URL};

export default class Nats {
    async sendMessage(message: string): Promise<void> {
        try {
            const nc = await connect(natsServer);
            console.log(`connected to ${nc.getServer()}`);
            // this promise indicates the client closed
            const done = nc.closed();
            // do something with the connection

            console.log(`publishing to nats`);
            nc.publish('todo', StringCodec().encode(message));
            console.log(`published to nats`);

            // close the connection
            await nc.drain();
            // check if the close was OK
            const err = await done;
            console.log(`closed connection`);
            if (err) {
                console.log(`error closing:`, err);
            }
        } catch (err) {
            console.log(`error connecting to ${JSON.stringify(natsServer)}`);
        }
    }
}
