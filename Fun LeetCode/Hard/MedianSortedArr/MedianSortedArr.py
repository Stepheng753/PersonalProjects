class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        first_index = 0
        second_index = 0
        sorted_merged = []
        while first_index < len(nums1) and second_index < len(nums2):
            if nums1[first_index] < nums2[second_index]:
                sorted_merged.append(nums1[first_index])
                first_index = first_index + 1
            else:
                sorted_merged.append(nums2[second_index])
                second_index = second_index + 1
        while first_index < len(nums1):
            sorted_merged.append(nums1[first_index])
            first_index = first_index + 1
        while second_index < len(nums2):
            sorted_merged.append(nums2[second_index])
            second_index = second_index + 1
        
        if len(sorted_merged) % 2 == 0:
            return (sorted_merged[math.floor((len(sorted_merged) - 1) / 2)] + sorted_merged[math.ceil((len(sorted_merged) - 1) / 2)]) / 2
        else:
            return sorted_merged[math.floor(len(sorted_merged) / 2)]