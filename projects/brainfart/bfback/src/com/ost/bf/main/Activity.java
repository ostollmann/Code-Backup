package com.ost.bf.main;

import java.util.Calendar;

public class Activity {
	
	private String name;
	private String owner;
	private Calendar startCal;
	private Calendar endCal;
	
	public Activity(String name, String owner, Calendar startCal, Calendar endCal) {

		this.name = name;
		this.owner = owner;
		this.startCal = startCal;
		this.endCal = endCal;	

	}
	
	public int minutesBetweenStartAndEnd() {

		// difference in minutes
		return (int) Math.round((endCal.getTimeInMillis() - startCal.getTimeInMillis())/(1000*60));
	
	}
	
	public String[] getNameAndOwner() {

		String[] nameAndOwner = {name, owner};
		return nameAndOwner;

	}
}
