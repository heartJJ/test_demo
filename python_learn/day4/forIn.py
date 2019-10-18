
"""
用for循环实现1~100之间的偶数求和

range(2,101,2) 可产生100之内的偶数
"""

sum = 0
for x in range(2, 101, 2):
    print(x)
    sum += x
print(sum)