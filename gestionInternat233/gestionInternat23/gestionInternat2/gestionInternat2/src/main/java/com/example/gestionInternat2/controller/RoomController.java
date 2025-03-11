package com.example.gestionInternat2.controller;

import com.example.gestionInternat2.exception.RoomNotFoundException;
import com.example.gestionInternat2.model.Room;
import com.example.gestionInternat2.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/room")
    public Room newRoom(@RequestBody Room newRoom) {
        if (newRoom.getCapacity() > 2) {
            throw new IllegalArgumentException("Room capacity cannot exceed 2.");
        }
        return roomRepository.save(newRoom);
    }

    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/rooms/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RoomNotFoundException(id));
    }

    @PutMapping("/rooms/{id}")
    public Room updateRoom(@RequestBody Room newRoom, @PathVariable Long id) {
        return roomRepository.findById(id)
                .map(room -> {
                    if (newRoom.getCapacity() > 2) {
                        throw new IllegalArgumentException("Room capacity cannot exceed 2.");
                    }
                    room.setNuméro(newRoom.getNuméro());
                    room.setCapacity(newRoom.getCapacity());
                    return roomRepository.save(room);
                })
                .orElseThrow(() -> new RoomNotFoundException(id));
    }

    @DeleteMapping("/rooms/{id}")
    public String deleteRoom(@PathVariable Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RoomNotFoundException(id);
        }
        roomRepository.deleteById(id);
        return "Room with id " + id + " has been deleted.";
    }


    @GetMapping("/rooms/available")
    public List<Room> getAvailableRooms() {
        return roomRepository.findAll().stream()
                .filter(room -> room.getUsers().isEmpty())
                .collect(Collectors.toList());
    }

}
