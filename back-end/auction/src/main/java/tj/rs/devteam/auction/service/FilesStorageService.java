package tj.rs.devteam.auction.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface FilesStorageService {
  public void init();

  public String save(MultipartFile file);

  public Resource load(String filename);

}
