package tj.rs.devteam.auction.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "lot")
@Getter
@Setter
public class Lot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lot_id")
    private long lotId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "currently", nullable = false)
    private double currently;

    @Column(name = "first_bid", nullable = false)
    private double firstBid;

    @Column(name = "number_of_bids", nullable = false)
    private int numberOfBids;

    @Column(name = "started", nullable = false)
    private Timestamp started;

    @Column(name = "ends", nullable = false)
    private Timestamp ends;

    @Column(name = "description")
    private String description;

    @Column(name = "buy_price", nullable = false)
    private double buyPrice;

    @OneToMany(mappedBy = "lot", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Bid> bids;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

}