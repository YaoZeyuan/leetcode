# 这个题的用例中有大整数的情况(大于2^32), 因此利用Python的无限精度特性会更好一些
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        a = self.list2Num(l1) + self.list2Num(l2)
        return self.num2List(a)
        
    def num2List(self, number):
        str_num_list = list(str(number))
        str_num_list.reverse()

        first_str_num = str_num_list[0]
        str_num_list = str_num_list[1:]
        baseNode = ListNode(int(first_str_num))
        thisNode = baseNode
        for str_num in str_num_list:
            thisNode.next = ListNode(int(str_num))
            thisNode = thisNode.next

        return baseNode

    def list2Num(self, L1):
        buf_list = []
        buf_L1 = L1
        while (buf_L1.next is None) == False: 
            buf_list.append(str(buf_L1.val))
            buf_L1 = buf_L1.next
        buf_list.append(str(buf_L1.val))
        buf_list.reverse()
        result = "".join(buf_list)
        result_int = int(result)
        return result_int 
