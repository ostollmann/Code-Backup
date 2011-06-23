package com.ost.oic.main;

import org.restlet.data.ChallengeResponse;
import org.restlet.data.ChallengeScheme;
import org.restlet.data.Status;
import org.restlet.resource.ClientResource;

public class Part09b {
    public static void main(String[] args) throws Exception {
        // Prepare the request
        ClientResource resource = new ClientResource("http://localhost:8183/users/jake");

        // Add the client authentication to the call
        ChallengeScheme scheme = ChallengeScheme.HTTP_BASIC;
        ChallengeResponse authentication = new ChallengeResponse(scheme,
                "scosstt", "tiger");
        resource.setChallengeResponse(authentication);

        // Send the HTTP GET request
        resource.get();

        if (resource.getStatus().isSuccess()) {
            // Output the response entity on the JVM console
            resource.getResponseEntity().write(System.out);
        } else if (resource.getStatus()
                .equals(Status.CLIENT_ERROR_UNAUTHORIZED)) {
            // Unauthorized access
            System.out
                    .println("Access authorized by the server, check your credentials");
        } else {
            // Unexpected status
            System.out.println("An unexpected status was returned: "
                    + resource.getStatus());
        }
    }

}