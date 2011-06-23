package com.ost.run;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Run {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Connection connection = null;

		try {
			String url = "jdbc:mysql://localhost/jtest?user=root&password=toor";
			System.out.println("Trying to connect to: " + url);
			connection = DriverManager.getConnection(url);
			
			Statement statement = null;
			ResultSet result_set = null;
			
			try {
				statement = connection.createStatement();
				String query = "SELECT * FROM t1";
				if(statement.execute(query)) {
					result_set = statement.getResultSet();
					while(result_set.next()) {
						System.out.println(
							"First name: " + result_set.getString("first_name") + ", " + 
							"last name: " + result_set.getString("last_name") + ", " +
							"date of birth: " + result_set.getString("dob_day") + "." + result_set.getString("dob_month") + "." + result_set.getString("dob_year")
						);
						
					}
				} else {
					System.out.println("Error: no results for query \"" + query + "\"");
				}
			} catch(SQLException e) {
				System.out.println("Query Exception...");
				System.out.println("SQLException: " + e.getMessage());
				System.out.println("SQLState: " + e.getSQLState());
				System.out.println("VendorError: " + e.getErrorCode());				
			} finally {
				if(result_set != null) {
					try {
						result_set.close();
					} catch(SQLException e1) { } // ignore
					
					result_set = null;
				}
				if(statement != null) {
					try {
						statement.close();
					} catch(SQLException e2) { } // ignore
					
					statement = null;
				}
			}
		} catch(SQLException e) {
			System.out.println("Connection Exception...");
			System.out.println("SQLException: " + e.getMessage());
			System.out.println("SQLState: " + e.getSQLState());
			System.out.println("VendorError: " + e.getErrorCode());
		}
		
		
	}

}
