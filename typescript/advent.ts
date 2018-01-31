const adventId = process.argv[2]
eval(`const advent = require("./advent/advent-${adventId}");advent.main()`)