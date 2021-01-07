package com.example.Securitytest.Controller;

import com.example.Securitytest.Models.User;
import com.example.Securitytest.Services.AddUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @Autowired
    AddUserService addUserService;

    @PostMapping("/signup")
    public String signUp(@RequestBody User user){
        addUserService.addUser(user);
        return "<h1>Hello," + user.getUserName() + "</h1>";
    }

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
