import Server, { ReplConsole } from 'ts-framework';
import StatusController from './controllers/StatusController';
import UptimeService from './services/UptimeService';

export default class MainServer extends Server {
  constructor() {
    super({
      port: process.env.PORT as any || 3000,
      router: { controllers: { StatusController } },
      repl: new ReplConsole({}),
      children: [UptimeService.getInstance()]
    });
  }
}
