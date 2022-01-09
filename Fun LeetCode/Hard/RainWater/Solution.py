
# https://leetcode.com/problems/trapping-rain-water-ii/
from operator import sub
class Solution:
    def trapRainWater(self, heightMap):
        row_length = len(heightMap[0])
        col_length = len(heightMap)
        index = 0
        orig_arr = heightMap.copy()
        heightMap = self.initHeightMap(orig_arr)

        while (index < row_length * col_length):
            row_num = int(index / row_length)
            col_num = int(index % row_length)

            if not heightMap[row_num][col_num]['isBorder']:
                top = heightMap[row_num - 1][col_num]
                bottom = heightMap[row_num + 1][col_num]
                left = heightMap[row_num][col_num - 1]
                right = heightMap[row_num][col_num + 1]
            
                # Finds the lowest wall
                # A wall being either a border that does not change or a block that is already filled
                # We always know that the top and left are either borders or water filled based on the indexing
                # We always know that the bottom and right are either borders or not water filled based on indexing
                lowest_wall = {'height': float('inf'), 'is_border': True, 'filledWithWater': False};
                if top['height'] < lowest_wall['height']:
                    lowest_wall = top
                if bottom['isBorder'] and bottom['height'] < lowest_wall['height']:
                    lowest_wall = bottom
                if left['height'] < lowest_wall['height']:
                    lowest_wall = left
                if right['isBorder'] and right['height'] < lowest_wall['height']:
                    lowest_wall = right

                # Matches the water level to meet the height of lowest wall
                # The maximum amount before overflowing
                if heightMap[row_num][col_num]['height'] < lowest_wall['height']:
                    heightMap[row_num][col_num]['height'] = lowest_wall['height']
                    heightMap[row_num][col_num]['filledWithWater'] = True

                # Checks to see if I need to adjust the rest of the blocks
                heightMap = self.recursiveCheck(orig_arr, heightMap, index, row_length)
                
            index = index + 1

        # The difference of the two arrays will be amount of water added per block, and the sum will be the total amount of water added
        return self.sum2dArr(self.subtractElementWise2dArr(heightMap, orig_arr))
        

    # This takes the sum of all the elements in a 2d arr
    def sum2dArr(self, arr):
        sum = 0
        for row in arr:
            for element in row:
                sum = sum + element
        return sum


    # This subtracts 2 2d Arrays element wise
    def subtractElementWise2dArr(self, heightMap, orig_arr):
        arr2d = []
        for i in range(0, len(heightMap)):
            arr1d = []
            for j in range(0, len(heightMap[i])):
                arr1d.append(heightMap[i][j]['height'] - orig_arr[i][j])
            arr2d.append(arr1d)
        return arr2d


    # Allows for me to understand the following info on a box,
    # The boxes height, whether or not it is a border, and whether or not it is filled with water
    def initHeightMap(self, heightMap):
        arr2d = []
        for i in range(0, len(heightMap)):
            arr1d = []
            for j in range(0, len(heightMap[i])):
                arr1d.append({'height': heightMap[i][j],
                                'isBorder': i == 0 or i == len(heightMap) - 1 or j == 0 or j == len(heightMap[i]) - 1, 
                                'filledWithWater': False})
            arr2d.append(arr1d)
        return arr2d
        

    # Recursively Checks to see the following
    # If the adjacent boxes that are filled with water are higher than the current box, then the water will overflow
    # So it either matches the water level to the height of the current or back to original size, whatever is biggest 
    def recursiveCheck(self, orig_arr, heightMap, index, row_length):
        row_num = int(index / row_length)
        col_num = int(index % row_length)

        top = heightMap[row_num - 1][col_num]
        bottom = heightMap[row_num + 1][col_num]
        left = heightMap[row_num][col_num - 1]
        right = heightMap[row_num][col_num + 1]

        change_top = top['filledWithWater'] and heightMap[row_num][col_num]['height'] < top['height']
        change_bottom = bottom['filledWithWater']and heightMap[row_num][col_num]['height'] < bottom['height']
        change_left = left['filledWithWater'] and heightMap[row_num][col_num]['height'] < left['height']
        change_right = right['filledWithWater'] and heightMap[row_num][col_num]['height'] < right['height']
        if change_top:
            if orig_arr[row_num - 1][col_num] <= heightMap[row_num][col_num]['height']:
                heightMap[row_num - 1][col_num]['height'] = heightMap[row_num][col_num]['height']
            else:
                heightMap[row_num - 1][col_num]['height'] = orig_arr[row_num - 1][col_num]
            heightMap = self.recursiveCheck(orig_arr, heightMap, index - row_length, row_length)
        if change_bottom:
            if orig_arr[row_num + 1][col_num] <= heightMap[row_num][col_num]['height']:
                heightMap[row_num + 1][col_num]['height'] = heightMap[row_num][col_num]['height']
            else:
                heightMap[row_num + 1][col_num]['height'] = orig_arr[row_num + 1][col_num]
            heightMap = self.recursiveCheck(orig_arr, heightMap, index + row_length, row_length)
        if change_left:
            if orig_arr[row_num][col_num - 1] <= heightMap[row_num][col_num]['height']:
                heightMap[row_num][col_num - 1]['height'] = heightMap[row_num][col_num]['height']
            else:
                heightMap[row_num][col_num - 1]['height'] = orig_arr[row_num][col_num - 1]
            heightMap = self.recursiveCheck(orig_arr, heightMap, index - 1, row_length)
        if change_right:
            if orig_arr[row_num][col_num + 1] <= heightMap[row_num][col_num]['height']:
                heightMap[row_num][col_num + 1]['height'] = heightMap[row_num][col_num]['height']
            else:
                heightMap[row_num][col_num + 1]['height'] = orig_arr[row_num][col_num + 1]
            heightMap = self.recursiveCheck(orig_arr, heightMap, index + 1, row_length)
            
        return heightMap        


def main():
    print(Solution().trapRainWater([[14,17,12,13,20,14],[12,10,5,8,9,5],[16,1,4,7,2,1],[17,4,3,1,7,2],[16,6,5,8,7,6],[17,10,4,8,5,6]]))




if __name__ == '__main__':
    main()