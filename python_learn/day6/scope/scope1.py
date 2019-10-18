#coding=utf-8 （ 使用utf-8编码 python3 不需要)

"""
a 为全局变量 b 为局部变量  c 属于局部作用域

全局中可访问a, 不可直接 print(b), 除非调用 foo() 来使用

foo 中可访问 a, b， 不可直接 print(c)，除非通过调用 bar() 来使用
"""

def foo():
    b = 'hello'

    def bar():  # Python中可以在函数内部再定义函数
        c = True
        print(a)
        print(b)
        print(c)

    bar()
    # print(c)  # NameError: name 'c' is not defined


if __name__ == '__main__':
    a = 100
    # print(b)  # NameError: name 'b' is not defined
    foo()