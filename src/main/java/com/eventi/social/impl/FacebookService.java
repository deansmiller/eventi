package com.eventi.social.impl;

import com.eventi.social.SocialService;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;
import com.restfb.types.User;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;

/**
 * Created by deansmiller on 05/07/16.
 */
public class FacebookService implements SocialService {

    private FacebookClient facebookClient;


    public FacebookService(OAuth2ProtectedResourceDetails facebookOAuthDetails) {
        FacebookClient.AccessToken accessToken =
                facebookClient.obtainAppAccessToken(facebookOAuthDetails.getClientId(), facebookOAuthDetails.getClientSecret());
        facebookClient = new DefaultFacebookClient(accessToken.getAccessToken(), Version.LATEST);
        facebookClient.
    }


    public User getUser(){
        return facebookClient.fetchObject("me", User.class);
    }
}
