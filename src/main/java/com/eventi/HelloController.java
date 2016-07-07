package com.eventi;

/**
 * Created by deansmiller on 07/07/16.
 */
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;

@Controller
@RequestMapping("/hello")
public class HelloController {

    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    @Inject
    public HelloController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }

    @RequestMapping(method=RequestMethod.GET, path="/test")
    public String test() {
        if (connectionRepository.findPrimaryConnection(Facebook.class) == null) {
            return "redirect:/test";
        }

        return facebook.userOperations().getUserProfile().toString();
    }

}
