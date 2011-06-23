package com.ost.company;

public class CompanyInformation {

	private String name;
	private String date_of_creation;

	public CompanyInformation() {
		super();
		this.name = "none";
		this.date_of_creation = "none";
	}
	
	public CompanyInformation(String name, String date_of_creation) {
		super();
		this.name = name;
		this.date_of_creation = date_of_creation;
	}

	@Override
	public String toString() {
		return "CompanyInformation [name=" + name + ", date_of_creation="
				+ date_of_creation + "]";
	}
	
	
	
}
