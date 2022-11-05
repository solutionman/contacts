package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    private PersonRepository personRepository;
    public RestController(PersonRepository personRepository){
        this.personRepository = personRepository;
    }

    @GetMapping("/reset")
    public String reset() {

        return "Vanya";
    }

    @GetMapping("/view")
    public List<Person> view() {
        List<Person> people = new ArrayList<>();
//        Person person = new Person(1L, "Ivan", "Ivanov", "+7-913-747-25-31");
//        people.add(person);
//        people.add(new Person(2L, "Petr", "Petrov", "+7-913-255-25-52"));
//        people.add(new Person(3L, "Kolya", "Kolyanov", "+7-913-255-55-33"));
//        personRepository.findAll();
        return personRepository.findAll();
    }

    @PostMapping("/create")
    public Map<String, String> create(Person person) {
        String debug = "";
        // TODO save Person
        personRepository.save(person);
//        return new Person(4L, "asdf","asdf","+7 (913) 255-55-33");
        Map<String, String> result = new HashMap<>();
        result.put("message", "created");
        return result;
    }
}
