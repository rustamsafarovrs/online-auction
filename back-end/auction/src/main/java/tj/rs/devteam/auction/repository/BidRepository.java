package tj.rs.devteam.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tj.rs.devteam.auction.model.Bid;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

}
