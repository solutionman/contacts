package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    @GetMapping("/reset")
    public String reset() {

        return "Vanya";
    }

    @GetMapping("/view")
    public Map<String, String> view() {
        
        return new HashMap<>();
    }
}
