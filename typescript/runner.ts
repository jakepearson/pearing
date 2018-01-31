const runnerId = process.argv[2]
eval(`const runner = require("./runner/${runnerId}");runner.main()`)