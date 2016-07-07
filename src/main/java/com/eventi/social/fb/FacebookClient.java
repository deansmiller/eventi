package com.eventi.social.fb;

import com.restfb.DefaultFacebookClient;

/**
 * Created by deansmiller on 07/07/16.
 */
public class FacebookClient extends DefaultFacebookClient {

    public FacebookClient(String accessToken){
        this.accessToken = accessToken;
    }
}
