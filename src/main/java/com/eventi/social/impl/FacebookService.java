package com.eventi.social.impl;

import com.eventi.social.SocialService;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Version;
import com.restfb.types.User;

/**
 * Created by deansmiller on 05/07/16.
 */
public class FacebookService implements SocialService {


    private FacebookClient facebookClient = new DefaultFacebookClient(Version.VERSION_2_0);


    public User getUser(){
        return facebookClient.fetchObject("me", User.class);
    }
}
