package com.example.gestionInternat2.controller;

import com.example.gestionInternat2.DTO.ApiResponse;
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
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/user")
    public User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(updatedUser.getFirstName());
                    user.setLastName(updatedUser.getLastName());
                    user.setRole(updatedUser.getRole());
                    user.setEmail(updatedUser.getEmail());
                    user.setPassword(updatedUser.getPassword());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User with id " + id + " has been deleted successfully.");
    }

    @GetMapping("/users-with-rooms")
    public List<User> getUsersWithRooms() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRoom() != null)
                .collect(Collectors.toList());
    }

    @GetMapping("/students")
    public List<User> getStudents() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole().equals("STUDENT"))
                .collect(Collectors.toList());
    }

    @GetMapping("/user-info/{id}")
    public ResponseEntity<?> getUserInfo(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return ResponseEntity.ok(user);
    }

    @GetMapping("/students-with-complaints")
    public List<User> getStudentsWithComplaints() {
        return userRepository.findAll().stream()
                .filter(user -> "STUDENT".equals(user.getRole()) && user.getComplaints() != null && !user.getComplaints().isEmpty())
                .collect(Collectors.toList());
    }

    @GetMapping("/students-with-rooms-and-complaints")
    public List<User> getStudentsWithRoomsAndComplaints() {
        return userRepository.findAll().stream()
                .filter(user -> "STUDENT".equals(user.getRole()) && user.getRoom() != null && user.getComplaints() != null)
                .collect(Collectors.toList());
    }
    @GetMapping("/students-with-rooms")
    public List<User> getStudentsWithRooms() {
        return userRepository.findByRoleAndRoomIsNotNull("STUDENT");
    }
    @PutMapping("/{userId}/room/{roomId}")
    public ResponseEntity<?> changeRoom(@PathVariable Long userId, @PathVariable Long roomId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RoomNotFoundException(roomId));

        if (room.getUsers().size() >= room.getCapacity()) {
            return ResponseEntity.badRequest().body("Room is already full.");
        }

        if (user.getRoom() != null) {
            Room currentRoom = user.getRoom();
            currentRoom.getUsers().remove(user);
            roomRepository.save(currentRoom);
        }

        user.setRoom(room);
        userRepository.save(user);

        room.getUsers().add(user);
        roomRepository.save(room);

        return ResponseEntity.ok("Room changed successfully.");
    }


}

