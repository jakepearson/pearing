
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function addRecurse(l1, l2, carry) {
  if (!l1 && !l2 && carry === 0) {
    return null;
  }
  const v1 = l1 ? l1.val : 0
  const v2 = l2 ? l2.val : 0
  const v = v1 + v2 + carry
  nextCarry = Math.floor(v / 10)
  const digit = v % 10
  var node = new ListNode(digit)
  node.next = addRecurse(l1 ? l1.next : null, l2 ? l2.next : null, nextCarry)
  return node
}

var addTwoNumbers = function (l1, l2) {
  return addRecurse(l1, l2, 0)
};

var result = addTwoNumbers(toList(342), toList(465))
console.log(result)

console.log(toList(123))

