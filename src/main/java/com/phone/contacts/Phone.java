package com.phone.contacts;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Phone {
    @Id
    Long id;
    Long personId;
    String number;
}
