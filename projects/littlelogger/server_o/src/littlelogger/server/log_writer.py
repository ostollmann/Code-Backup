import threading
import queue

class LogWriter(threading.Thread):
    def __init__(self, cmds, lqueue):
        threading.Thread.__init__(self)
        self.lqueue = lqueue
        self.cmd = cmds
    
    def run(self):
        print('[L] starting run!')
        while True:
#            try:
#                self.cmd.get(timeout=1)
#                print('[L] got new CMD (stopping!)...')
#                break
#            except:
#                pass
            try:
                log = self.lqueue.get()
                print('[L] new log: \'%s\'' % log)
                #self.lqueue.task_done()
            except:
                #print('[L] no new logs found!')
                pass