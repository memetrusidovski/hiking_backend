package com.example.hiking.API;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class hikingData {

    @RequestMapping("/")
    @ResponseBody
    public String hello(){
        return "Testing";
    }

    @RequestMapping(value = "/index")
    public String index(){
        return "index";
    }
}
