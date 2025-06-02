package kr.sesaclink.domain.member.repository.search;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import kr.sesaclink.domain.campus.entity.QCampus;
import kr.sesaclink.domain.course.entity.Course;
import kr.sesaclink.domain.course.entity.QCourse;
import kr.sesaclink.domain.course.entity.QUserCourse;
import kr.sesaclink.domain.member.dto.UserDTO;
import kr.sesaclink.domain.member.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class UserMemberSearchImpl extends QuerydslRepositorySupport implements UserMemberSearch {

    public UserMemberSearchImpl() {
        super(UserMember.class);
    }

    @Override
    public Page<UserMember> searchPreUserList(String statusType,
                                              String searchType,
                                              String keyword,
                                              Pageable pageable) {

        QUserMember qUserMember = QUserMember.userMember;
        QUserAuth qUserAuth = QUserAuth.userAuth;
        QMemberStatus qMemberStatus = QMemberStatus.memberStatus;

        JPQLQuery<UserMember> query = from(qUserMember);

        query.leftJoin(qUserAuth).on(qUserMember.userAuth.eq(qUserAuth)).fetchJoin();
        query.leftJoin(qMemberStatus).on(qUserMember.memberStatus.eq(qMemberStatus)).fetchJoin();

        query.where(qUserMember.campus.isNull());

        // 검색
        // a : 활성화, f : 강제 탈퇴, w : 탈퇴
        if ( (statusType != null && !statusType.isEmpty())) {
            BooleanBuilder booleanBuilder = new BooleanBuilder();

            for (String type : statusType.split("")) {

                switch (type) {
                    case "a":
                        booleanBuilder.or(qMemberStatus.memberStatusName.eq("ACTIVE"));
                        break;
                    case "f":
                        booleanBuilder.or(qMemberStatus.memberStatusName.eq("FORCED_WITHDRAWN"));
                        break;
                    case "w":
                        booleanBuilder.or(qMemberStatus.memberStatusName.eq("WITHDRAWN"));
                        break;
                }
            }
            query.where(booleanBuilder);
        }

        // i : 아이디, n : 이름, e : 이메일
        if ( (searchType != null && !searchType.isEmpty()) && keyword != null) {
            BooleanBuilder booleanBuilder = new BooleanBuilder();

            for (String type : searchType.split("")) {

                switch (type) {
                    case "i":
                        booleanBuilder.or(qUserMember.id.contains(keyword));
                        break;
                    case "n":
                        booleanBuilder.or(qUserMember.name.contains(keyword));
                        break;
                    case "e":
                        booleanBuilder.or(qUserMember.email.contains(keyword));
                        break;
                }
            }
            query.where(booleanBuilder);
        }

        this.getQuerydsl().applyPagination(pageable, query);

        List<UserMember> dtoList = query.fetch();

        long totalCount = query.fetchCount();

        return new PageImpl<>(dtoList, pageable, totalCount);
    }

    @Override
    public Page<UserDTO> searchUserList(Integer courseNo,
                                        String searchType,
                                        String keyword,
                                        String authName,
                                        Long adminNo,
                                        int campusNo,
                                        Pageable pageable) {

        QUserMember qUserMember = QUserMember.userMember;
        QUserAuth qUserAuth = QUserAuth.userAuth;
        QMemberStatus qMemberStatus = QMemberStatus.memberStatus;
        QAdminMember qAdminMember = QAdminMember.adminMember;
        QCampus qCampus = QCampus.campus;

        QCourse qCourse = QCourse.course;
        QUserCourse qUserCourse = QUserCourse.userCourse;

        JPQLQuery<UserMember> query = from(qUserMember);

        query.leftJoin(qUserMember.userAuth, qUserAuth).fetchJoin();
        query.leftJoin(qUserMember.memberStatus, qMemberStatus).fetchJoin();
        query.leftJoin(qUserMember.campus, qCampus).fetchJoin();
        query.leftJoin(qUserMember.adminMember, qAdminMember).fetchJoin();

        if (authName != null && !authName.isEmpty()) {
            if (authName.equals("JOB_COORDINATOR")) {
                query.where(qAdminMember.adminNo.eq(adminNo));
            }
        }

        query.where(qUserMember.campus.campusNo.eq(campusNo));

        // 강좌 필터링
        if (courseNo != null && courseNo != 0) {
            query.join(qUserCourse).on(qUserMember.userNo.eq(qUserCourse.userMember.userNo));

            query.where(qUserCourse.course.courseNo.eq(courseNo));
        }

        // i : 아이디
        // n : 이름
        // p : 핸드폰 번호
        // e : 이메일
        // a : 주소
        if ( (searchType != null && !searchType.isEmpty()) && keyword != null) {
            BooleanBuilder booleanBuilder = new BooleanBuilder();

            for (String type : searchType.split("")) {
                switch (type) {
                    case "i":
                        booleanBuilder.or(qUserMember.id.contains(keyword));
                        break;
                    case "n":
                        booleanBuilder.or(qUserMember.name.contains(keyword));
                        break;
                    case "p":
                        booleanBuilder.or(qUserMember.phone.contains(keyword));

                        String keywordRemovedHyphen = keyword.replaceAll("-", "");
                        booleanBuilder.or(qUserMember.phone.contains(keywordRemovedHyphen));
                        break;
                    case "e":
                        booleanBuilder.or(qUserMember.email.contains(keyword));
                        break;
                    case "a":
                        booleanBuilder.or(qUserMember.address.contains(keyword));
                        booleanBuilder.or(qUserMember.detailAddress.contains(keyword));
                        break;
                }
            }
            query.where(booleanBuilder);
        }

        this.getQuerydsl().applyPagination(pageable, query);

        List<UserMember> userMemberList = query.fetch();

        long totalCount = query.fetchCount();

        // entity -> dto
        List<UserDTO> dtoList = userMemberList.stream()
                .map(userMember -> new UserDTO(userMember))
                .collect(Collectors.toList());

        // 없으면 빈 페이지 반환
        if (dtoList.isEmpty()) {
            return new PageImpl<>(dtoList, pageable, totalCount);
        }

        // userNo list
        List<Long> userNoList = userMemberList.stream()
                .map(userMember -> userMember.getUserNo())
                .collect(Collectors.toList());

        // UserCourse, Course join
        JPQLQuery<Tuple> userCourseQuery = from(qUserCourse)
                .join(qCourse).on(qUserCourse.course.courseNo.eq(qCourse.courseNo)).fetchJoin()
                .join(qCourse.campus, qCampus).fetchJoin()
                .where(qUserCourse.userMember.userNo.in(userNoList))
                .select(qUserCourse.userMember.userNo, qCourse);

        List<Tuple> userCourseTuples = userCourseQuery.fetch();

        for (Tuple tuple : userCourseTuples) {
            Long userNo = tuple.get(qUserCourse.userMember.userNo);
            Course course = tuple.get(qCourse);

            // userNo에 해당하는 UserDTO 찾기
            for (UserDTO dto : dtoList) {
                if (dto.getUserNo().equals(userNo)) {
                    dto.addCourse(course);
                    break;
                }
            }
        }

        return new PageImpl<>(dtoList, pageable, totalCount);
    }

}
