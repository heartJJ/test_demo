"""
以 global来指定全局变量
以 nonlocal 来指定局部变量
"""

def foo():
  global a # 不加 global 则在 foo 内部重新声明 a 
  a = 200;
  print(a)
  b = 'hello';

  def bar():
    nonlocal b; # 不加 nonlocal 则在 bar 内部重新声明 b
    b = 'world'
    print(b);

  bar()


if __name__ == "__main__":
    foo()