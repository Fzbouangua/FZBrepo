package com.example.gestionInternat2.controller;

import com.example.gestionInternat2.model.User;
import com.example.gestionInternat2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        // Vérifier que les informations de connexion sont fournies
        if (loginUser.getEmail() == null || loginUser.getEmail().isEmpty() ||
                loginUser.getPassword() == null || loginUser.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Email or password is missing");
        }

        // Chercher l'utilisateur dans la base de données
        Optional<User> userOptional = userRepository.findByEmail(loginUser.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Vérifier le mot de passe
            if (user.getPassword().equals(loginUser.getPassword())) {
                // Inclure le rôle dans la réponse
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401).body("Invalid password");
            }
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
