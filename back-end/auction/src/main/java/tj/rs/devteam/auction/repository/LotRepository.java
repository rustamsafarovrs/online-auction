package tj.rs.devteam.auction.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tj.rs.devteam.auction.model.Lot;


@Repository
public interface LotRepository extends JpaRepository<Lot, Long> {

    Page<Lot> findAll(Pageable pageable);

    Page<Lot> findByNameContaining(String name, Pageable pageable);
}
