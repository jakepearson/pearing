const year = process.argv[2];
const adventId = process.argv[3];

// eslint-disable-next-line no-eval
eval(`const advent = require("./advent/${year}/advent-${adventId}");advent.main()`);
