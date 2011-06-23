package com.ost.company;

public class Company {

	private Integer company_id;
	
	private CompanyInformation company_information;
	
	public Company() {
		this.company_information = new CompanyInformation(); 
		System.out.println("Company instance created (without information)...");
	}
	
	public Company(CompanyInformation company_information) {
		this.company_information = company_information;
		System.out.println("Company instance created (with information)...");
	}

	@Override
	public String toString() {
		return "Company [company_information=" + company_information + "]";
	}
	
	
	

}
