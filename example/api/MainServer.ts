import Server, { ReplConsole } from '../../lib';
import StatusController from './controllers/StatusController';
import UptimeService from './services/UptimeService';

export default class MainServer extends Server {
  constructor() {
    super({
      port: process.env.PORT as any || 3000,
      router: { controllers: { StatusController } },
      children: [UptimeService.getInstance()]
    });
  }
}
