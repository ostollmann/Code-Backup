package com.ost.oic.main;

/**
 * Created by IntelliJ IDEA.
 * User: ost
 * Date: Nov 28, 2010
 * Time: 9:35:24 PM
 */

import org.restlet.resource.ClientResource;

import java.io.IOException;


public class client {
	public static void main(String[] args) throws IOException {
		new ClientResource("http://www.o1iver.net").get().write(System.out);
	}
}
