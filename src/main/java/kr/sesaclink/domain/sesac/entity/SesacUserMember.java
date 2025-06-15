package kr.sesaclink.domain.sesac.entity;

import jakarta.persistence.*;
import kr.sesaclink.domain.campus.entity.Campus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SesacUserMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long sesacUserNo;

    @Column(nullable = false, length = 50)
    private String id;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 320)
    private String email;

    @Column(nullable = false, length = 15)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String detailAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campus_no", nullable = false)
    private Campus campus;
}
