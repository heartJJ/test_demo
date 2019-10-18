"""
as 别名后均可使用
"""

import module1 as m1
import module2 as m2

# module3中的执行代码不会被执行
import module3

m1.foo()
m2.foo()