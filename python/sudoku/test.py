
def test(a,b,c,d):
  return \
    a == b and \
    c == d


if __name__ == '__main__':
  print(test(1,1,2,2))
  print(test(1,2,1,8))