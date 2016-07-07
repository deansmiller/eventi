package com.eventi.social.fb.impl;

import com.eventi.social.fb.SocialService;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;
import com.restfb.scope.ScopeBuilder;
import com.restfb.scope.UserDataPermissions;
import com.restfb.types.User;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;

import java.io.IOException;

/**
 * Created by deansmiller on 05/07/16.
 */
public class FacebookService implements SocialService {

    private final String redirectUrl;
    private FacebookClient facebookClient;
    private OAuth2ProtectedResourceDetails facebookOAuthDetails;


    public FacebookService(OAuth2ProtectedResourceDetails facebookOAuthDetails, String redirectUrl) throws IOException  {
        facebookClient = new DefaultFacebookClient(Version.LATEST);
        this.facebookOAuthDetails = facebookOAuthDetails;
        this.redirectUrl = redirectUrl;
    }


    public String getLoginDialogUrl(){
        ScopeBuilder scopeBuilder = new ScopeBuilder();
        scopeBuilder.addPermission(UserDataPermissions.USER_LIKES);
        scopeBuilder.addPermission(UserDataPermissions.USER_ABOUT_ME);
        return facebookClient.getLoginDialogUrl(facebookOAuthDetails.getClientId(), redirectUrl, scopeBuilder);
    }


    public User getUser(){
        return facebookClient.fetchObject("me", User.class);
    }

}
