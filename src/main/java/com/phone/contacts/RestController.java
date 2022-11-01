package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    @GetMapping("/reset")
    public String reset() {

        return "Vanya";
    }

    @GetMapping("/view")
    public List<Person> view() {
        List<Person> people = new ArrayList<>();
        Person person = new Person(1L, "Ivan", "Ivanov", "+7-913-747-25-31");
        people.add(person);
        people.add(new Person(2L, "Petr", "Petrov", "+7-913-255-25-52"));
        people.add(new Person(3L, "Kolya", "Kolyanov", "+7-913-255-55-33"));
        return people;
    }
}
