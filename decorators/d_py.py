def decorator(f): # f 即被装饰的方法
    print("my decorator")
    return f

@decorator
def myfunc():
    print("my function")

myfunc()