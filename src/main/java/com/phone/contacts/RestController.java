package com.phone.contacts;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
public class RestController {
    private final PersonRepository personRepository;

    public RestController(PersonRepository personRepository) {
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
    public Object create(@RequestBody Map<String, Object> data) {
        try {
            Map<String, Object> persons = (Map<String, Object>) data.get("data");
            if (persons.get("name") != null) {
                Person person = new Person();
                person.setName(persons.get("name").toString());
                person.setFamily(persons.get("family").toString());
                person.setPhone(persons.get("phone").toString());
                personRepository.save(person);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        Map<String, String> result = new HashMap<>();
        result.put("message", "created");
        return result;
    }
}
