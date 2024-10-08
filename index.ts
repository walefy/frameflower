import express from 'express';
import { EvalFile } from './src/eval-file';

const app = express();
app.use(express.json());

global.app = app;

async function main() {
  const model = new EvalFile('example/user-model.json');
  await model.eval();
  const pModel = new EvalFile('example/post-model.json');
  await pModel.eval();
  const entry = new EvalFile('example/user-entry.json');
  await entry.eval();
  const pEntry = new EvalFile('example/post-entry.json');
  await pEntry.eval();

  app.listen(3000, () => {
    console.log('[LOG] Server running on port 3000');
  });
}

main();
