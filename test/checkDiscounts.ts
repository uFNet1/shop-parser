import { checkAllDiscounts } from "../src/utils/parser/parsePage";

async function check() {
  console.log('starting experiment')
  const startT = performance.now();
  await checkAllDiscounts()
  const endT = performance.now();
  console.log(`Time took to perform this request: ` + endT - startT);
}

await check();