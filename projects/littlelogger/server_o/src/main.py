import web

urls = (
        '/(.*)$', 'root',
)

class root:
    def GET(self, name):
        return 'access denied'
    def POST(self, name):
        #pass
        return 'data: %s' % web.data()

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
#    logq = Queue()
#    
#    l1 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 3,\
#          'log_text': 'Locking account \'bmi_cims\' because of 10 failed login tries (wrong password)!'\
#          }
#    l2 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Purging temporary databases...'\
#          }
#    l3 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Temporary database purge successful!'\
#          }
#    l4 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 5,\
#          'log_text': 'Could not connect to master!'\
#          }
#    l5 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 5,\
#          'log_text': 'Could not connect to master!'\
#          }
#    l6 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Connection to master re-established!'\
#          }
#    l7 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Starting data integrity check...'\
#          }
#    l8 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 5,\
#          'log_text': 'Data integrity check unsuccessful! 0.34% of the data is corrupted!'\
#          }
#    l9 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Syncing data with master...'\
#          }
#    l10 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Data successfully synced with master!'\
#          }
#    l11 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Running data integrity check...'\
#          }
#    l12 = {'server': 'cluster3-db2',\
#          'application': 'oracle-10-0-2',\
#          'log_level': 2,\
#          'log_text': 'Data integrity check successful!'\
#          }
#    
#    logq.put(l1)
#    logq.put(l2)
#    logq.put(l3)
#    logq.put(l4)
#    logq.put(l5)
#    logq.put(l6)
#    logq.put(l7)
#    logq.put(l8)
#    logq.put(l9)
#    logq.put(l10)
#    logq.put(l11)
#    logq.put(l12)
#    
#    print('Log: %s\n' % logq.get())
#    print('Log: %s\n' % logq.get())
#    print('Log: %s\n' % logq.get())
    
