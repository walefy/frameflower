import express from 'express';
import { EvalFile } from './src/eval-file';

const app = express();
app.use(express.json());

global.app = app;

const _ = new EvalFile('example/user-schema.json');

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
