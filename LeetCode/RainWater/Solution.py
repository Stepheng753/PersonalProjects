
# https://leetcode.com/problems/trapping-rain-water-ii/
from operator import sub
class Solution:
    def trapRainWater(self, heightMap):
        row_length = len(heightMap[0])
        col_length = len(heightMap)
        index = 0
        orig_arr = heightMap.copy()
        if type(heightMap[0][0]) is not dict:
            heightMap = self.initHeightMap(orig_arr)

        while (index < row_length * col_length):
            row_num = int(index / row_length)
            col_num = int(index % row_length)

            if not heightMap[row_num][col_num]['isBorder']:
                top = heightMap[row_num - 1][col_num]
                bottom = heightMap[row_num + 1][col_num]
                left = heightMap[row_num][col_num - 1]
                right = heightMap[row_num][col_num + 1]
            
                lowest_wall = {'height': float('inf'), 'is_border': True, 'filledWithWater': False};
                if top['height'] < lowest_wall['height']:
                    lowest_wall = top
                if (bottom['isBorder'] or bottom['filledWithWater']) and bottom['height'] < lowest_wall['height']:
                    lowest_wall = bottom
                if left['height'] < lowest_wall['height']:
                    lowest_wall = left
                if (right['isBorder'] or right['filledWithWater']) and right['height'] < lowest_wall['height']:
                    lowest_wall = right

                if heightMap[row_num][col_num]['height'] < lowest_wall['height']:
                    heightMap[row_num][col_num]['height'] = lowest_wall['height']
                    heightMap[row_num][col_num]['filledWithWater'] = True

                heightMap = self.recursiveCheck(orig_arr, heightMap, index, row_length)

                
            index = index + 1

        return self.sum2dArr(self.subtractElementWise2dArr(heightMap, orig_arr))
        
    def sum2dArr(self, arr):
        sum = 0
        for row in arr:
            for element in row:
                sum = sum + element
        return sum

    def subtractElementWise2dArr(self, heightMap, orig_arr):
        arr2d = []
        for i in range(0, len(heightMap)):
            arr1d = []
            for j in range(0, len(heightMap[i])):
                arr1d.append(heightMap[i][j]['height'] - orig_arr[i][j])
            arr2d.append(arr1d)
        return arr2d



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