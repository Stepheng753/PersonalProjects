class Solution:
    def trapRainWater(self, heightMap):
        row_length = len(heightMap[0])
        col_length = len(heightMap)
        index = 0
        counter = 0
        origArr = heightMap.copy()
        if type(heightMap[0][0]) is not dict:
            heightMap = self.initHeightMap(origArr)

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
                    counter = counter + lowest_wall['height'] - heightMap[row_num][col_num]['height']
                    heightMap[row_num][col_num]['height'] = lowest_wall['height']
                    heightMap[row_num][col_num]['filledWithWater'] = True

                doubleCheck = self.recursiveCheck(origArr, heightMap, index, row_length, counter)
                heightMap = doubleCheck['heightMap']
                counter = doubleCheck['counter']
                
            index = index + 1

        return counter

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
        
    def recursiveCheck(self, origArr, heightMap, index, row_length, counter):
        row_num = int(index / row_length)
        col_num = int(index % row_length)

        top = heightMap[row_num - 1][col_num]
        bottom = heightMap[row_num + 1][col_num]
        left = heightMap[row_num][col_num - 1]
        right = heightMap[row_num][col_num + 1]

        change_top = top['filledWithWater'] and origArr[row_num - 1][col_num] <= heightMap[row_num][col_num]['height'] and heightMap[row_num][col_num]['height'] < top['height']
        change_bottom = bottom['filledWithWater'] and origArr[row_num + 1][col_num] <= heightMap[row_num][col_num]['height'] and heightMap[row_num][col_num]['height'] < bottom['height']
        change_left = left['filledWithWater'] and origArr[row_num][col_num - 1] <= heightMap[row_num][col_num]['height'] and heightMap[row_num][col_num]['height'] < left['height']
        change_right = right['filledWithWater'] and origArr[row_num][col_num + 1] <= heightMap[row_num][col_num]['height'] and heightMap[row_num][col_num]['height'] < right['height']
        if change_top:
            counter = counter - (top['height'] - heightMap[row_num][col_num]['height'])
            heightMap[row_num - 1][col_num]['height'] = heightMap[row_num][col_num]['height']
            return self.recursiveCheck(origArr, heightMap, index - row_length, row_length, counter)
        if change_bottom:
            counter = counter - (bottom['height'] - heightMap[row_num][col_num]['height'])
            heightMap[row_num + 1][col_num]['height'] = heightMap[row_num][col_num]['height']
            return self.recursiveCheck(origArr, heightMap, index + row_length, row_length, counter)
        if change_left:
            counter = counter - (left['height'] - heightMap[row_num][col_num]['height'])
            heightMap[row_num][col_num - 1]['height'] = heightMap[row_num][col_num]['height']
            return self.recursiveCheck(origArr, heightMap, index - 1, row_length, counter)
        if change_right:
            counter = counter - (right['height'] - heightMap[row_num][col_num]['height'])
            heightMap[row_num][col_num + 1]['height'] = heightMap[row_num][col_num]['height']
            return self.recursiveCheck(origArr, heightMap, index + 1, row_length, counter)
        else:
            return {'heightMap': heightMap, 'counter': counter}


def main():
    print(Solution().trapRainWater([[2,2,2],[2,1,2],[2,1,2],[2,1,2]]))




if __name__ == '__main__':
    main()