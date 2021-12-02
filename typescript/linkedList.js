function ListNode(val) {
  this.val = val;
  this.next = null;
}

function addRecurse(l1, l2, carry) {
  if (!l1 && !l2 && carry === 0) {
    return null;
  }
  const v1 = l1 ? l1.val : 0;
  const v2 = l2 ? l2.val : 0;
  const v = v1 + v2 + carry;
  nextCarry = Math.floor(v / 10);
  const digit = v % 10;
  const node = new ListNode(digit);
  node.next = addRecurse(l1 ? l1.next : null, l2 ? l2.next : null, nextCarry);
  return node;
}

const addTwoNumbers = (l1, l2) => addRecurse(l1, l2, 0);

const result = addTwoNumbers(toList(342), toList(465));
console.log(result);

console.log(toList(123));
