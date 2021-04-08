package tj.rs.devteam.auction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tj.rs.devteam.auction.payload.request.LotsRequest;
import tj.rs.devteam.auction.payload.response.LotsResponse;
import tj.rs.devteam.auction.repository.LotRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/lots")
public class LotsController {

    @Autowired
    LotRepository lotRepository;

    @GetMapping(value = {"/", ""})
    public ResponseEntity<?> lots() {
//        if (request.getPage() == null) {
//            request.setPage(1);
//        }
//
        LotsResponse response = new LotsResponse();
        response.setPage(1);
        response.setLots(lotRepository.findAll());

        return ResponseEntity
                .ok(response);

    }

//    @PostMapping("post-lot")
//    public ResponseEntity<?> postLot()

}
