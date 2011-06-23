import threading
import queue

class Server(threading.Thread):
    def __init__(self, cmds, lqueue):
        threading.Thread.__init__(self)
        self.cmd = cmds
        self.lqueue = lqueue
        
    def run(self):
        print('[S] starting run!')
        i = 1
        while True:
#            try:
#                self.cmd.get(timeout=3)
#                print('[S] got new CMD (stopping!)...')
#                break
#            except:
#                pass

            self.lqueue.put('SQLPlus: ERRNO%s' % i)
            #print('SERVER: new log put to queue!')
            i += 1