import * as Package from 'pjson';
import { Controller, Get, HttpError, HttpCode } from '../../../lib';
import UptimeService from '../services/UptimeService';

@Controller()
export default class StatusController {
  static foo = 'bar';

  @Get('/')
  static async getStatus(req, res) {
    const service = UptimeService.getInstance();
    res.success({
      environment: process.env.NODE_ENV || 'development',
      uptime: service.uptime(),
      version: Package.version,
      name: Package.name,
    });
  }

  @Get('/foo')
  public static hello(req, res) {
    // Sample of static properties
    res.json({ foo: this.foo });
  }
}
