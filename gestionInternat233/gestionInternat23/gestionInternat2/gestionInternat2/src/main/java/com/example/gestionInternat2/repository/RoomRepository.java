package com.example.gestionInternat2.repository;

import com.example.gestionInternat2.model.Room;
import com.example.gestionInternat2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    // Example for a Spring Boot Repository Method
    @Query("SELECT r FROM Room r ORDER BY r.id")
    List<Room> findAllOrdered();

}
