package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    @GetMapping("/reset")
    public String reset(){

        return "";
    }
}
