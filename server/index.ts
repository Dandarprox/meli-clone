import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { productRouter } from './src/product/routes/product.routes';
import { getRequiredEnvVar } from './src/utils/environment.util';

dotenv.config();
const serverPort = getRequiredEnvVar('SERVER_PORT');
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({
  origin: '*'
}));

// Routes
app.use('/api/v1', productRouter);
app.get('/health', (req, res) => {
  res.send('OK');
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).send('Internal Server Error');
});

app.listen(serverPort, () => {
  console.log(`Server started on port ${serverPort}`);
});