package tj.rs.devteam.auction.payload.response;

import lombok.Getter;
import lombok.Setter;
import tj.rs.devteam.auction.model.Lot;

import java.util.List;

@Getter
@Setter
public class LotsResponse {
    private List<Lot> lots;
    private Integer page;
    private Long totalItems;
    private Integer totalPages;
}
