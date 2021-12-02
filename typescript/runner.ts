const runnerId = process.argv[2];
// eslint-disable-next-line no-eval
eval(`const runner = require("./runner/${runnerId}");runner.main()`);
