package com.eventi;


import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.SocialConfigurer;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;

/**
 * Created by deansmiller on 07/07/16.
 */


public class Config implements SocialConfigurer {

    @Override
    public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment env) {
        cfConfig.addConnectionFactory(new FacebookConnectionFactory("1108938715843096", "f4404de6d28a1b7c2638ad7c1c1ed8bf"));
    }

    @Override
    public UserIdSource getUserIdSource() {
        return null;
    }

    @Override
    public UsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {
        return null;
    }
}
