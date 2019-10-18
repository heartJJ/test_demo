"""
同名函数将会覆盖
"""
def foo():
    print('hello, world!')


def foo():
    print('goodbye, world!')


# goodbye, world!
foo()