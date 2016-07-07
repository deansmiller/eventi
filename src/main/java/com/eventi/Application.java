package com.eventi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@SpringBootApplication
public class Application extends WebSecurityConfigurerAdapter {




//    @RequestMapping(path = "/test", produces = "application/json")
//    public @ResponseBody
//    String test() throws IOException {
//        FacebookService facebookService = new FacebookService(facebook(), "http://localhost:8080"); // TODO shouldnt be hardcoded
//        return new JSONObject().put("loginUrl", facebookService.getLoginDialogUrl()).toString();
//    }


	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
