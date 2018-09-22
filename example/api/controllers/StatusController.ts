import * as Package from 'pjson';
import { Controller, Get } from '../../../lib';
import UptimeService from '../services/UptimeService';

@Controller()
export default class StatusController {
  static foo = 'bar';

  @Get('/')
  static async getStatus(req, res) {
    const service = UptimeService.getInstance();
    res.success({
      name: Package.name,
      version: Package.version,
      environment: 'development',
      uptime: service.uptime(),
    });
  }

  @Get('/hello')
  public static hello(req, res) {
    // Sampel of static properties
    res.json({ foo: this.foo });
  }
}
