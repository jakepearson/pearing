interface TreeNode {
  left?: TreeNode
  right?: TreeNode
  val: number
}

function hasPathSum(node: TreeNode, goal: number, parentTotal: number = 0): boolean {
  if (!node) {
    return false
  }
  const total = parentTotal + node.val
  if (!node.left && !node.right) {
    return total === goal
  }

  if (hasPathSum(node.left, goal, total)) {
    return true
  }
  if (hasPathSum(node.right, goal, total)) {
    return true
  }
  return false
}

function maxPathSum(node: TreeNode): number {
  if (!node) {
    return 0
  }
  return node.val + Math.max(maxPathSum(node.left), maxPathSum(node.right))
}

export function main() {
  const input: TreeNode = {
    val: 5,
    left: {
      val: 4,
      left: {
        val: 11,
        left: {
          val: 7
        },
        right: {
          val: 2
        }
      }
    }
  }

  console.log(maxPathSum(input))
}