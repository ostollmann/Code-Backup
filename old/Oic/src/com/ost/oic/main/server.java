package com.ost.oic.main;

import org.restlet.Application;
import org.restlet.Component;
import org.restlet.Restlet;
import org.restlet.data.Protocol;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import org.restlet.routing.VirtualHost;

/**
 * Created by IntelliJ IDEA.
 * User: ost
 * Date: Nov 28, 2010
 * Time: 9:36:56 PM
 */

public class server extends ServerResource {
	public static void main(String[] args) throws Exception {
		Component component = new Component();
		component.getServers().add(Protocol.HTTP, 8182);
		component.getDefaultHost().attach("/trace", server.class);
		component.start();
	}

	@Get
	public String toString() {
		return "Resource URI  : " + getReference() + '\n' + "Root URI      : "
            + getRootRef() + '\n' + "Routed part   : "
            + getReference().getBaseRef() + '\n' + "Remaining part: "
            + getReference().getRemainingPart();
	}
	
}
