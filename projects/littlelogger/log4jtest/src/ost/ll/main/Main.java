package ost.ll.main;

import org.apache.log4j.Logger;
import org.apache.log4j.LogManager;

public class Main {

	private final static Logger log = Logger.getLogger("ost.ll.Main");
	
	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
		System.out.println("Hello, World!");
		
		Thread.currentThread().sleep(100);
		
		log.debug("Debug Msg");
		log.warn("Warning Msg");
		log.error("Error Msg");
		
		Thread.currentThread().sleep(100);
		
		LogManager.shutdown();
	}

}
