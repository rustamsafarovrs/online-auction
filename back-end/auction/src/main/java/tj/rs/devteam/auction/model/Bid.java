package tj.rs.devteam.auction.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "bids", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"lot_id", "time"})}
)
@Getter
@Setter
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_id")
    private long bidId;

    @Column(name = "time", nullable = false)
    private Timestamp time;

    @Column(name = "amount", nullable = false)
    private double amount;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lot_id", nullable = false)
    private Lot lot;

    @ManyToOne
    @JoinColumn(name = "bidder_id", nullable = false)
    private User bidder;


}
