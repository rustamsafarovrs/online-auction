package tj.rs.devteam.auction.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LotsRequest {
    @NotBlank
    private Integer page;

}
