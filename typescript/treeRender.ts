/* eslint-disable linebreak-style */
interface TreeNode {
  label: string;
  children: TreeNode[];
}

function render(node: TreeNode): string {
  const childStrings: string[] = [];
  if (node.children) {
    node.children.forEach((n) => {
      childStrings.push(render(n));
    });
  }
  return `${node.label}[${childStrings.join(',')}]`;
}

const data: TreeNode = {
  label: 'A',
  children: [
    { label: 'B', children: [{ label: 'D', children: [] }] },
    { label: 'C', children: [] },
  ],
};

console.log(render(data));
