package kr.sesaclink.domain.campus.repository;

import kr.sesaclink.domain.campus.entity.Campus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampusRepository extends JpaRepository<Campus, Integer> {
}
