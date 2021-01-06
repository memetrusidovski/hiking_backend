package com.example.Securitytest.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping("/")
    public String FrontPage(){
        return "<h1>Hello Tester</h1>";
    }

    @RequestMapping("/user")
    public String user(){
        return "<h1>Welcome User</h1>";
    }

    @GetMapping("/admin")
    public String admin(){
        return("<h1>YO YO YO BOSS</h1>");
    }
}
