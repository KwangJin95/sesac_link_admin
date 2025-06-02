package kr.sesaclink.domain.course.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {

    private Integer courseNo;

    private String courseName;

    private String teacher;

    private LocalDate startDate;

    private LocalDate endDate;
}
