package tj.rs.devteam.auction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tj.rs.devteam.auction.model.Image;
import tj.rs.devteam.auction.model.User;
import tj.rs.devteam.auction.payload.response.MessageResponse;
import tj.rs.devteam.auction.repository.ImageRepository;
import tj.rs.devteam.auction.repository.UserRepository;
import tj.rs.devteam.auction.service.FilesStorageService;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/profile")
public class UserController {
    @Autowired
    UserRepository mUserRepository;

    @Autowired
    FilesStorageService mFilesStorageService;

    @Autowired
    ImageRepository mImageRepository;

    @GetMapping(value = {"/", ""})
    public ResponseEntity<?> getProfileData(Principal principal) {
        return ResponseEntity
                .ok(mUserRepository.findByUsername(principal.getName()).get());
    }

    @PostMapping("/upload-profile-image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("imageFile") MultipartFile file, Principal principal) {
        try {
            String savedImageName = mFilesStorageService.save(file);
            Image i = new Image();
            i.setName(savedImageName);
            i.setType(file.getContentType());
            i = mImageRepository.save(i);
            User u = mUserRepository.findByUsername(principal.getName()).get();
            u.setProfileImage(i);
            mUserRepository.save(u);
            return ResponseEntity.ok(new MessageResponse("Profile image updated"));
        } catch (Exception e) {
            String message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }
}
