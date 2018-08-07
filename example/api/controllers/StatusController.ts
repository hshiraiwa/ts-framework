import * as Package from 'pjson';
import { Controller, Get } from 'ts-framework';
import UptimeService from '../services/UptimeService';

@Controller()
export default class StatusController {
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
}
