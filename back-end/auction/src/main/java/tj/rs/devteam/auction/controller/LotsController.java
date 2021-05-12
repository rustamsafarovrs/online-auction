package tj.rs.devteam.auction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tj.rs.devteam.auction.model.Lot;
import tj.rs.devteam.auction.payload.response.LotsResponse;
import tj.rs.devteam.auction.repository.LotRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/lots")
public class LotsController {

    @Autowired
    LotRepository lotRepository;

    @GetMapping(value = {"/", ""})
    public ResponseEntity<?> lots(@RequestParam(required = false) String q,
                                  @RequestParam(defaultValue = "1") int page,
                                  @RequestParam(defaultValue = "8") int size) {
        try {
            // Thread.sleep(6000);
            Pageable paging = PageRequest.of(page - 1, size);

            Page<Lot> pageLots;

            if (q == null) {
                pageLots = lotRepository.findAll(paging);
            } else {
                pageLots = lotRepository.findByNameContaining(q, paging);
            }

            LotsResponse response = new LotsResponse();

            response.setLots(pageLots.getContent());
            response.setPage(pageLots.getNumber());
            response.setTotalItems(pageLots.getTotalElements());
            response.setTotalPages(pageLots.getTotalPages());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
