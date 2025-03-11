package com.example.gestionInternat2.controller;


import com.example.gestionInternat2.DTO.ResponseMessage;
import com.example.gestionInternat2.exception.RoomNotFoundException;
import com.example.gestionInternat2.exception.UserNotFoundException;
import com.example.gestionInternat2.model.Room;
import com.example.gestionInternat2.model.User;
import com.example.gestionInternat2.repository.RoomRepository;
import com.example.gestionInternat2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class AssignmentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @PutMapping("/assignroom/{userId}/{roomId}")
    public ResponseEntity<?> assignRoomToUser(@PathVariable Long userId, @PathVariable Long roomId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException(roomId));

        // Vérifier si l'utilisateur a déjà une chambre
        if (user.getRoom() != null) {
            return ResponseEntity.badRequest().body(new ResponseMessage("L'utilisateur a déjà une chambre assignée."));
        }

        // Assigner la chambre à l'utilisateur
        user.setRoom(room);
        userRepository.save(user);

        return ResponseEntity.ok(new ResponseMessage("Chambre assignée avec succès"));
    }

    @GetMapping("/users/students-with-rooms")
    public List<User> getStudentsWithRooms() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRoom() != null) // Filtrer ceux qui ont une chambre assignée
                .collect(Collectors.toList());
    }
    @GetMapping("/rooms-with-users")
    public List<Room> getRoomsWithUsers() {
        return roomRepository.findAll();
    }



}

