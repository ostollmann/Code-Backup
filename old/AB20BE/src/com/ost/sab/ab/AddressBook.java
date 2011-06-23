package com.ost.sab.ab;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * ---------------------- Copyright Notice ----------------------
 * All this material course is, unless otherwise stated,
 * the property of Oliver Stollmann. Copyright and other
 * intellectual property laws protect these materials.
 * Reproduction or retransmission of the materials, in whole
 * or in part, in any manner, without the prior written consent
 * of the copyright holder, is a violation of copyright law.
 * --------------------------------------------------------------
 *
 * User: ost
 * Date: 12/13/10
 * Time: 3:11 AM
 */
public class AddressBook extends ServerResource {
	public String name = "AddressBook";

	@Get
	public String toString() {
		return "Hello World from the AddressBook ServerResource!";
	}

}
