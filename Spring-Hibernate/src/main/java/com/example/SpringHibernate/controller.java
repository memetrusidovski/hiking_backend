package com.example.SpringHibernate;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {

    @RequestMapping("/")
    public String home(){
        return "<h1>Welcome</h1>";
    }
}
