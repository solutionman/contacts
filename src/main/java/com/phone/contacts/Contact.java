package com.phone.contacts;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Contact {
    private Long id;
    private String email;
    private String first;
    private String last;
}
