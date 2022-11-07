package com.phone.contacts;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Id;

public interface PhoneRepository extends JpaRepository<Phone, Id> {
}
