from safe_class_test import test_class

tc = test_class('name')
tc.info()
tc.bla = 'sdasds'
print(tc.bla)
tc.info()
tc._bla = 'adsd'
tc.info()