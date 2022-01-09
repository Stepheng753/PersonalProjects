from Problem import ListNode

class Solution:
    def addTwoNumbers(self, ListNode1, ListNode2):
        output = []
        greater = False
        while (ListNode1 or ListNode2):
            node1_val = ListNode1.val if ListNode1 else 0
            node2_val = ListNode2.val if ListNode2 else 0

            append_num = 1 if greater else 0
            greater = append_num + node1_val + node2_val >= 10
            append_num = (append_num + node1_val + node2_val) % 10

            output.append(append_num)
            
            ListNode1 = ListNode1.next if ListNode1 else None
            ListNode2 = ListNode2.next if ListNode2 else None
        if greater:
            output.append(1)

        return convert_list_to_link(output)


def convert_list_to_link(list_vals):
    list_node = ListNode(list_vals[len(list_vals) - 1])
    for i in range(len(list_vals) - 2, -1, -1):
        list_node = ListNode(list_vals[i], list_node)
    return list_node


def test(test_label, list1_vals, list2_vals, answer_vals):
    list1_node = convert_list_to_link(list1_vals)
    list2_node = convert_list_to_link(list2_vals)
    answer_node = convert_list_to_link(answer_vals)

    if Solution().addTwoNumbers(list1_node, list2_node) == answer_node:
        print("\033[92m" + test_label + " Success! \033[00m")
    else:
        print("\033[91m" + test_label + " Failed! \033[00m")


if __name__ == '__main__':
    test('Test 1', [2, 4, 3], [5, 6, 4], [7, 0, 8])
    test('Test 2', [0], [0], [0])
    test('Test 3', [9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9], [8, 9, 9, 9, 0, 0, 0, 1])
    
    

