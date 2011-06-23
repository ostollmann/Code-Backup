package com.ost.eic;

/**
 * Created by IntelliJ IDEA. 
 * User: ost
 * Date: Nov 26, 2010
 * Time: 11:17:55 PM
 */

import com.mongodb.Mongo;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;

import java.net.UnknownHostException;
import java.util.Set;

public class main {
	public static void main(String[] argv) {
		System.out.println("Hello World, my name is Eic!");

		Mongo m = null;

		try {
			m = new Mongo( "localhost" , 27017 );
		} catch (UnknownHostException e) {
			e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
		}

		DB db = m.getDB( "test1" );

		// Get list of collections
		System.out.println("Collections:");
		Set<String> collections = db.getCollectionNames();
		for(String s : collections) {
			System.out.println(s);
		}

		// Get collection
		DBCollection people = db.getCollection("people");

		//insertPeople(people);

		// Get all docs in collection
		System.out.println("Documents:");
		DBCursor cursor = people.find();
		while(cursor.hasNext()) {
			System.out.println(cursor.next());
		}

		// Queries
		System.out.println("Query 1:");
		BasicDBObject query1 = new BasicDBObject();
		query1.put("first_name", "Oliver");
		DBCursor c1 = people.find(query1);
		while(c1.hasNext()) {
			System.out.println(c1.next());
		}

		System.out.println("Query 2:");
		BasicDBObject query2 = new BasicDBObject();
		String names[] = new String[]{"Nicholas", "Victor"};
		query2.put("first_name", new BasicDBObject("$in", names));
		DBCursor c2 = people.find(query2);
		while(c2.hasNext()) {
			System.out.println(c2.next());
		}

	}

	private static void insertPeople(DBCollection people) {

		BasicDBObject oliver = new BasicDBObject();
		oliver.put("first_name", "Oliver");
		oliver.put("last_name", "Stollmann");
		oliver.put("age", "22");

		BasicDBObject charley = new BasicDBObject();
		charley.put("first_name", "Charley");
		charley.put("last_name", "Stollmann");
		charley.put("age", "20");

		BasicDBObject alexia = new BasicDBObject();
		alexia.put("first_name", "Alexia");
		alexia.put("last_name", "Stollmann");
		alexia.put("age", "18");

		BasicDBObject nicholas = new BasicDBObject();
		nicholas.put("first_name", "Nicholas");
		nicholas.put("last_name", "Stollmann");
		nicholas.put("age", "16");

		BasicDBObject victor = new BasicDBObject();
		victor.put("first_name", "Victor");
		victor.put("last_name", "Stollmann");
		victor.put("age", "14");

		people.insert(oliver);
		people.insert(charley);
		people.insert(alexia);
		people.insert(nicholas);
		people.insert(victor);

	}
}
