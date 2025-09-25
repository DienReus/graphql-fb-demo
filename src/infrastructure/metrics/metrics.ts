import { INestApplication } from '@nestjs/common';
import * as client from 'prom-client';
import * as express from 'express';

export function setupMetrics(app: INestApplication) {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();
  const metricsApp = express();
  metricsApp.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  });
  app.use('/metrics', metricsApp);
}
