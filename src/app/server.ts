import app from './app';
import serverListener from './helpers/serverListener';

const port = process.env.PORT || 3000;

const server = app.listen(port);
server.on('listening', serverListener.onListening(port));
server.on('error', serverListener.onError(port));

export default server;
