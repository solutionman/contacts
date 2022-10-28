package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping("/")
    public String index() {
        return "index.html";
    }

    @GetMapping("/store")
    public String store() {
        return "contacts.html";
    }
}
