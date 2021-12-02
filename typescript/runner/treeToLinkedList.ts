interface TreeNode {
  left?: TreeNode
  right?: TreeNode
  value: number
}

interface ListNode {
  next?: ListNode
  value: number
}

function toList(node: TreeNode): ListNode {
  const list: ListNode = { value: -1 };
  let current: ListNode = list;
  const queue: TreeNode[] = [];
  queue.push(node);
  while (queue.length > 0) {
    const next = queue.shift();
    current.next = { value: next.value };
    current = current.next;
    if (next.left) {
      queue.push(next.left);
    }
    if (next.right) {
      queue.push(next.right);
    }
  }

  return list.next;
}

export function main() {
  const tree: TreeNode = {
    value: 1,
    left: {
      value: 2,
    },
    right: {
      value: 3,
      right: {
        value: 4,
      },
    },
  };
  const list = toList(tree);
  console.log(JSON.stringify(list, null, 2));
}
