const year = process.argv[2]
const adventId = process.argv[3]
eval(`const advent = require("./advent/${year}/advent-${adventId}");advent.main()`)