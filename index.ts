import express from 'express';
import { EvalFile } from './src/eval-file';

const app = express();
app.use(express.json());

global.app = app;

const model = new EvalFile('example/user-model.json');
model.eval();
const entry = new EvalFile('example/user-schema.json');
entry.eval();

app.listen(3000, () => {
  console.log('[LOG] Server running on port 3000');
});
