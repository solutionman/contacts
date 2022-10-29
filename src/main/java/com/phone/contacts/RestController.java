package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    @GetMapping("/reset")
    public String reset() {

        return "Vanya";
    }

    @GetMapping("/view")
    public List<Contact> view() {
        List<Contact> contacts = new ArrayList<>();
        Contact contact = new Contact(1L, "mail@mail.com", "asdf", "dasd");
        contacts.add(contact);
        return contacts;
    }
}
