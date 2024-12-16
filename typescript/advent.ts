const year = process.argv[2];
const adventId = process.argv[3];

const advent = await import(`./advent/${year}/advent-${adventId}`);
advent.main();

export {};
