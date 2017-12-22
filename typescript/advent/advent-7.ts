import * as util from './util'

type Node = {
  id: string
  weight: number
  childrenIds: string[]
  children: Node[]
  parent: Node
}

function getChildrenIds(input: string): string[] {
  input = input.trim();
  if(input.startsWith('->')) {
    return input.replace('->', '').split(',').map(id => id.trim())
  }
  return []
}

function parse(): Map<string, Node> {
  const input = util.read('advent-7-big.txt').split(util.delimiter);
  const map = new Map<string, Node>();
  input.forEach(line => {
    const parts = line.split(/\(|\)/);
    const node: Node = {
      id: parts[0].trim(),
      weight: parseInt(parts[1].trim()),
      childrenIds: getChildrenIds(parts[2]),
      children: [],
      parent: null
    };
    map.set(node.id, node);
  });
  map.forEach(node => {
    node.childrenIds.forEach(childId => {
      const child = map.get(childId);
      child.parent = node;
      node.children.push(child);
    });
  });
  return map;
}

function findRoot(map: Map<string, Node>) {
  map.forEach(node => {
    if(node.parent === null && node.children.length > 0) {
      console.log(node.id)      
    }
  })
}

export function main() {
  const map = parse();
  findRoot(map)

  
}