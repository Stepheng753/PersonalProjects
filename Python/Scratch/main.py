import sys

def fun2(n):
     result = []
     a, b = 0, 1
     while a < n:
         result.append(a)
         a, b = b, a+b
     return result


print(fun2(20))
