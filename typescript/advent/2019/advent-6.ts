import * as util from '../util'

const smallInput = util.read(`${__dirname}/advent-6-small.txt`)
const bigInput = util.read(`${__dirname}/advent-6.txt`)

class Node {
  id: string
  children: Map<string, Node>
  childCount: number | null
  parent: Node
}

function getNode(allNodes: Map<string, Node>, id: string): Node {
  let node: Node
  if (allNodes.has(id)) {
    node = allNodes.get(id)
  } else {
    node = new Node()
    node.children = new Map<string, Node>()
    node.id = id
    node.childCount = null
    node.parent = null
    allNodes.set(id, node)
  }
  return node
}

function toTree(input: string): Map<string, Node> {
  const allNodes = new Map<string, Node>()
  const lines = input.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(")")

    const left = getNode(allNodes, parts[0])
    const right = getNode(allNodes, parts[1])

    right.parent = left
    left.children.set(right.id, right)
  }

  return allNodes
}

function count(nodes: Map<string, Node>): number {
  let result = 0
  nodes.forEach(n => {
    if (n.childCount === null) {
      n.childCount = count(n.children) + n.children.size
    }
    result += n.childCount
  })
  return result
}

function distance(target: string, nodes: Map<string, Node>, current: Node, previous: Node, visited: Set<string>, depth: number) {
  if (current.id === target) {
    console.log("match: " + (depth - 2))
    return 1
  }

  if (current === undefined || current === null || visited.has(current.id)) {
    return -1
  }
  visited.add(current.id)

  if (target === current.id) {
    return 1
  }
  if (current.parent !== null) {
    distance(target, nodes, current.parent, current, visited, depth + 1)
  }
  current.children.forEach((child) => {
    distance(target, nodes, child, current, visited, depth + 1)
  })
}

function search(nodes: Map<string, Node>) {
  const startNode = nodes.get("YOU")
  distance("SAN", nodes, startNode, null, new Set<string>(), 0)
}

export function main() {
  search(toTree(bigInput))

}
