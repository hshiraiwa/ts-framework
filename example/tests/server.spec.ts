import * as hat from 'hat';
import * as Package from 'pjson';
import * as request from 'supertest';
import MainServer from '../api/server';

jest.setTimeout(30000);

describe('api.MainServer', () => {
  it('should respond to a simple status request', async () => {
    const server = new MainServer();

    // Perform a simple request to get a 200 response
    const responseWithoutListen = await request(server.app).get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(responseWithoutListen.body.name).toBe(Package.name);
    expect(responseWithoutListen.body.version).toBe(Package.version);
    expect(responseWithoutListen.body.uptime).toBe(0);

    // Starts listening on server port
    await server.listen();

    // Perform a simple request to get a 200 response
    const response = await request(server.app).get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.name).toBe(Package.name);
    expect(response.body.version).toBe(Package.version);
    expect(response.body.uptime).toBeGreaterThan(0);

    await server.close();
  });

  it('should respond to a simple hello request with static property', async () => {
    const server = new MainServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/foo')
      .expect('Content-Type', /json/)
      .expect(200, { foo: 'bar' });

      await server.onUnmount();
  });
});