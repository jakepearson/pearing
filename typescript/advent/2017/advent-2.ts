const bigInput = '1224 926 1380 688 845 109 118 88 1275 1306 91 796 102 1361 27 995\n\
1928 2097 138 1824 198 117 1532 2000 1478 539 1982 125 1856 139 475 1338\n\
848 202 1116 791 1114 236 183 186 150 1016 1258 84 952 1202 988 866\n\
946 155 210 980 896 875 925 613 209 746 147 170 577 942 475 850\n\
1500 322 43 95 74 210 1817 1631 1762 128 181 716 171 1740 145 1123\n\
3074 827 117 2509 161 206 2739 253 2884 248 3307 2760 2239 1676 1137 3055\n\
183 85 143 197 243 72 291 279 99 189 30 101 211 209 77 198\n\
175 149 259 372 140 250 168 142 146 284 273 74 162 112 78 29\n\
169 578 97 589 473 317 123 102 445 217 144 398 510 464 247 109\n\
3291 216 185 1214 167 495 1859 194 1030 3456 2021 1622 3511 222 3534 1580\n\
2066 2418 2324 93 1073 82 102 538 1552 962 91 836 1628 2154 2144 1378\n\
149 963 1242 849 726 1158 164 1134 658 161 1148 336 826 1303 811 178\n\
3421 1404 2360 2643 3186 3352 1112 171 168 177 146 1945 319 185 2927 2289\n\
543 462 111 459 107 353 2006 116 2528 56 2436 1539 1770 125 2697 2432\n\
1356 208 5013 4231 193 169 3152 2543 4430 4070 4031 145 4433 4187 4394 1754\n\
// 5278 113 4427 569 5167 175 192 3903 155 1051 4121 5140 2328 203 5653 3233';

const inputs = ['5 1 9 5\n\
7 5 3\n\
2 4 6 8',
bigInput];

const inputs2 = ['5 9 2 8\n\
9 4 7 3\n\
3 8 6 5',
bigInput,
];

function checksum1(input: string): number {
  const lines = input.split('\n');
  let result = 0;
  lines.forEach((line) => {
    const numbers = line.split(' ').map((n) => parseInt(n, 10));
    console.log(numbers);
    let min = numbers[0];
    let max = numbers[0];
    numbers.forEach((number) => {
      if (number > max) max = number;
      if (number < min) min = number;
    });
    result += max - min;
  });

  return result;
}

function divide(a: number, b: number): number {
  const result = a / b;
  if (result === Math.floor(result)) {
    return result;
  }
  return 0;
}

function checksum2(input: string): number {
  const lines = input.split('\n');
  let result = 0;
  lines.forEach((line) => {
    const numbers = line.split(' ').map((n) => parseInt(n));
    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        const a = numbers[i];
        const b = numbers[j];
        const current = Math.max(divide(a, b), divide(b, a));
        if (current > 0) {
          result += current;
          return;
        }
      }
    }
  });

  return result;
}

export function main() {
  // console.log('Part 1');
  // inputs.forEach(i => {
  //   console.log(checksum1(i));
  // });
  console.log('Part 2');
  inputs2.forEach((i) => {
    console.log(checksum2(i));
  });
}
