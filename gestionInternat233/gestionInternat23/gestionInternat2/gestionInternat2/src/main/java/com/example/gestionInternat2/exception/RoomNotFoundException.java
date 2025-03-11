package com.example.gestionInternat2.exception;

public class RoomNotFoundException extends RuntimeException {
    public RoomNotFoundException(Long id) {
        super("Could not find the room with id " + id);
    }
}

