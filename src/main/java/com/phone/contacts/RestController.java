package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    private final PersonRepository personRepository;
    public RestController(PersonRepository personRepository){
        this.personRepository = personRepository;
    }

    @GetMapping("/reset")
    public String reset() {

        return "Vanya";
    }

    @GetMapping("/view")
    public List<Person> view() {
        return personRepository.findAll();
    }

    @PostMapping("/create")
    public Map<String, String> create(Person person) {
        personRepository.save(person);
        Map<String, String> result = new HashMap<>();
        result.put("message", "created");
        return result;
    }
}
