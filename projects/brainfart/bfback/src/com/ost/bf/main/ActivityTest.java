package com.ost.bf.main;


import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

import java.util.GregorianCalendar;

import org.junit.Before;
import org.junit.Test;

public class ActivityTest {
	
	private Activity activity;
	
	@Before
	public void setUp() {

		GregorianCalendar startCal = new GregorianCalendar();
		startCal.set(2011, 01, 20, 19, 00);

		GregorianCalendar endCal = new GregorianCalendar();
		endCal.set(2011, 01, 20, 21, 00);

		activity = new Activity("activity", "o1iver", startCal, endCal);

	}
	
	@Test
	public void test_minutesBetweenStartAndEnd() {
		
		System.out.println("Test: minutes between start and end time");

		int mustDiff = 120; 
		assertEquals(mustDiff, activity.minutesBetweenStartAndEnd());

	}
	
	@Test
	public void test_getNameAndOwner() {

		System.out.println("Test: name and owner string");
		
		String[] mustNameAndOwner = {"activity", "o1iver"};
		assertArrayEquals(mustNameAndOwner, activity.getNameAndOwner());
	}
	
	
}