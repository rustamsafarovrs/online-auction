package tj.rs.devteam.auction.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tj.rs.devteam.auction.model.Lot;
import tj.rs.devteam.auction.payload.response.MessageResponse;
import tj.rs.devteam.auction.repository.LotRepository;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/lot")
public class LotController {

    @Autowired
    LotRepository lotRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getLot(@PathVariable("id") Long id) {
        try {
            Optional<Lot> result = lotRepository.findById(id);
            if (result.isPresent()) {
                return ResponseEntity.ok(result.get());
            } else {
                return new ResponseEntity<>(new MessageResponse("Not found"), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
