package com.ost.tester.classes;

public class TestClass {
	
	public TestClass() {
		System.out.println("[LL] running com.ost.tester.classes.TestClass::TestClass()");
	}
	
	public void main() {
		System.out.println("[LL] running com.ost.tester.classes.TestClass::main()");
	}

	public void meth(String args) {
		System.out.println("args: " + args);
	}
}
