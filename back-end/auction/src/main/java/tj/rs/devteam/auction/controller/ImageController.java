package tj.rs.devteam.auction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tj.rs.devteam.auction.model.Image;
import tj.rs.devteam.auction.payload.response.MessageResponse;
import tj.rs.devteam.auction.repository.ImageRepository;
import tj.rs.devteam.auction.service.FilesStorageService;

import java.io.IOException;

@Controller
@CrossOrigin("http://localhost:4200")
public class ImageController {
    @Autowired
    FilesStorageService storageService;

    @Autowired
    ImageRepository mImageRepository;

    @GetMapping("/images/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }


    @PostMapping("/api/image/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        String message = "";
        try {
            String newName = storageService.save(file);

            Image img = new Image();
            img.setName(newName);
            img.setType(file.getContentType());
            mImageRepository.save(img);

            message = "Uploaded the file successfully: " + file.getOriginalFilename() + ", new name: " + newName;
            return ResponseEntity.ok(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }
}
