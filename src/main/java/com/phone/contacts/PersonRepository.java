package com.phone.contacts;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Id;

public interface PersonRepository extends JpaRepository<Person, Id> {
}
