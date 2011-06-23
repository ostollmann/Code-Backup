
import time

class MainLoop(object):
    def __init__(self):
        self.callbacks = []
    
    def loop(self):
        while True:
            for callback in self.callbacks:
                print("Executing callback...")
                self._execute_callback(callback)
            time.sleep(1)
    
    def _execute_callback(self, callback):
        try:
            print("Executing callback...")
            callback()
        except:
            print("Caught exception while executing callback...")
    
    def add_callback(self, callback):
        self.callbacks.append(callback)


if __name__ == "__main__":
    ml = MainLoop()
    ml.loop()