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

function findRoot(map: Map<string, Node>): string {
  var result: string
  map.forEach(node => {
    if(node.parent === null && node.children.length > 0) {
      result = node.id
    }
  })
  return result
}

function weightHunter(map: Map<string, Node>, id: string, depth: number): number {
  const node = map.get(id)
  const weights = new Map<number, number>()
  var total = node.weight
  for(var child of node.children) {
    const branchWeight = weightHunter(map, child.id, depth + 1) 
    weights.set(branchWeight, 1 + (weights.get(branchWeight) || 0))
    total += branchWeight
  }
  if(weights.size > 1) {
    console.log(`${" ".repeat(depth)}${id}: ${total}`)
    //    console.log(weights.size)
    weights.forEach((c, w) => {
//      console.log(`${" ".repeat(depth)}${w}: ${c}`)
    })
  }
  return total
}

export function main() {
  const map = parse();
  const root = findRoot(map)
  weightHunter(map, root, 0)
}