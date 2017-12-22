import * as fs from 'fs';
import * as os from 'os'

export function read(file: string): string {
  return fs.readFileSync(`advent/${file}`, 'utf8')
}

export const delimiter = os.EOL