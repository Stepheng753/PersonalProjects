# https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/
class Solution:

    def lengthLongestSubstring(self, checkStr):
        longest = ''

        for i in range(0, len(checkStr)):
            current = ''
            for character in checkStr[i:]:
                if character in current:
                    break
                current = current + character
            if len(current) > len(longest): longest = current
    
        return len(longest)


def test(str_list, answer_list):
    for i in range(0, len(str_list)):
        if Solution().lengthLongestSubstring(str_list[i]) == answer_list[i]:
            print("\033[92mTest " + str(i) + ": Success! \033[00m")
        else:
            print("\033[91mTest " + str(i) + ": Success! \033[00m")


if __name__ == '__main__':
    test(['abcabcbb', 'bbbbb', 'pwwkew', ''], [3, 1, 3, 0])
    