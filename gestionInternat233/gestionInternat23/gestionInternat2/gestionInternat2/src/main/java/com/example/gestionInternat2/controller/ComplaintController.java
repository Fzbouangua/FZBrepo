package com.example.gestionInternat2.controller;

import com.example.gestionInternat2.DTO.ComplaintDTO;
import com.example.gestionInternat2.model.Complaint;
import com.example.gestionInternat2.model.User;
import com.example.gestionInternat2.repository.ComplaintRepository;
import com.example.gestionInternat2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaints")
@CrossOrigin("http://localhost:3000")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/submit/{userId}")
    public ResponseEntity<String> submitComplaint(
            @PathVariable Long userId,
            @RequestBody ComplaintDTO complaintDTO
    ) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User student = optionalUser.get();
        if (!"STUDENT".equals(student.getRole())) {
            return ResponseEntity.status(403).body("Unauthorized user");
        }

        // Create and save the new complaint
        Complaint complaint = new Complaint();
        complaint.setDescription(complaintDTO.getDescription());
        complaint.setUser(student);

        complaintRepository.save(complaint);

        return ResponseEntity.ok("Complaint submitted successfully");
    }

    @GetMapping("/list")
    public ResponseEntity<?> listComplaints() {
        try {
            List<Complaint> complaints = complaintRepository.findAll();
            return ResponseEntity.ok(complaints);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long id) {
        try {
            if (!complaintRepository.existsById(id)) {
                return ResponseEntity.status(404).body("Complaint not found");
            }

            complaintRepository.deleteById(id);
            return ResponseEntity.ok("Complaint deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
