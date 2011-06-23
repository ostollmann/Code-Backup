package com.ost.tester.main;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.ost.tester.classes.*;

public class Main {

	public static void main(String[] args) {
		System.out.println("[LL] running com.ost.tester.main.Main::main()");
		
		String className = args[0];
		String methodName = "main";

		String[] methodArgumentsString = new String[args.length-2];
		
		if(args.length > 2)
			methodName = args[1];
			if(args.length > 3)
				System.arraycopy(args, 1, methodArgumentsString, 0, 1);
				
		try {
			Class _class = Class.forName("com.ost.tester.classes." + className);
			Object _object = _class.newInstance();
			Class[] _parameterTypes = new Class[]{String.class};
			Method _method = _class.getMethod(methodName, _parameterTypes);
			Object[] methodArguments = (Object[])methodArgumentsString;
			
			_method.invoke(_object, methodArguments);
			

		} catch (ClassNotFoundException e) {
			System.out.println("[EE] class::method (" + className + "::" + methodName + ") not found");
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
	}

}
