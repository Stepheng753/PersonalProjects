# https://leetcode.com/problems/add-two-numbers/

class ListNode:

    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __str__(self):
        node = self
        return_str = '['
        while node:
            return_str = return_str + str(node.val) + ', '
            node = node.next
        return_str = return_str[:-2] + ']'
        return return_str

    def __eq__(self, otherNode):
        node1 = self
        node2 = otherNode
        while node1 and node2:
            if node1.val != node2.val:
                return False
            node1 = node1.next
            node2 = node2.next
        if (node1 and (node2 == None)) or ((node1 == None) and node2):
            return False
        return True

        