package com.example.gestionInternat2.repository;


import com.example.gestionInternat2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN FETCH u.room WHERE u.role = 'STUDENT'")
    List<User> findAllWithRooms();
    List<User> findByRole(String role);
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findByEmail(String email);
    List<User> findByRoleAndRoomIsNotNull(String role);

}
