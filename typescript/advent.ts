const id = process.argv[2]
eval(`const advent = require("./advent/advent-${id}");advent.main()`)