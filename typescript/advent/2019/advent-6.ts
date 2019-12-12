import * as util from '../util'

const smallInput = util.read(`${__dirname}/advent-6-small.txt`)
const bigInput = util.read(`${__dirname}/advent-6.txt`)

class Node {
  id: string
  children: Map<string, Node>
  childCount: number | null
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

export function main() {
  console.log(count(toTree(bigInput)))

}
