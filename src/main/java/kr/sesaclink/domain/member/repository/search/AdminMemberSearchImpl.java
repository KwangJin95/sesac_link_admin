package kr.sesaclink.domain.member.repository.search;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.member.entity.QAdminAuth;
import kr.sesaclink.domain.member.entity.QAdminMember;
import kr.sesaclink.domain.member.entity.QMemberStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminMemberSearchImpl extends QuerydslRepositorySupport implements AdminMemberSearch {

    public AdminMemberSearchImpl() {
        super(AdminMember.class);
    }

    @Override
    public Page<AdminMember> searchPreAdminList(String statusType,
                                                String searchType,
                                                String keyword,
                                                Pageable pageable) {

        QAdminMember qAdminMember = QAdminMember.adminMember;
        QAdminAuth qAdminAuth = QAdminAuth.adminAuth;
        QMemberStatus qMemberStatus = QMemberStatus.memberStatus;

        JPQLQuery<AdminMember> query = from(qAdminMember);

        query.leftJoin(qAdminAuth).on(qAdminMember.adminAuth.eq(qAdminAuth)).fetchJoin();;
        query.leftJoin(qMemberStatus).on(qAdminMember.memberStatus.eq(qMemberStatus)).fetchJoin();;

        query.where(qAdminMember.campus.isNull());

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
                        booleanBuilder.or(qAdminMember.id.contains(keyword));
                        break;
                    case "n":
                        booleanBuilder.or(qAdminMember.name.contains(keyword));
                        break;
                    case "e":
                        booleanBuilder.or(qAdminMember.email.contains(keyword));
                        break;
                }
            }
            query.where(booleanBuilder);
        }

        this.getQuerydsl().applyPagination(pageable, query);

        List<AdminMember> dtoList = query.fetch();

        long totalCount = query.fetchCount();

        return new PageImpl<>(dtoList, pageable, totalCount);
    }


    @Override
    public Page<AdminMember> searchAdminList(String authType,
                                             String searchType,
                                             String keyword,
                                             int campusNo,
                                             String authName,
                                             Pageable pageable) {

        QAdminMember qAdminMember = QAdminMember.adminMember;
        QAdminAuth qAdminAuth = QAdminAuth.adminAuth;
        QMemberStatus qMemberStatus = QMemberStatus.memberStatus;

        JPQLQuery<AdminMember> query = from(qAdminMember);

        query.leftJoin(qAdminMember.adminAuth, qAdminAuth).fetchJoin();
        query.leftJoin(qAdminMember.memberStatus, qMemberStatus).fetchJoin();

        query.where(qAdminMember.campus.campusNo.eq(campusNo));

        if (authName.equals("SUPER_ADMIN")) {
            query.where(qAdminMember.adminAuth.authName.ne(authName));
        }

        // 검색
        // s : 관리자, a : 운영진, j : 잡코디
        if ( (authType != null && !authType.isEmpty())) {
            BooleanBuilder booleanBuilder = new BooleanBuilder();

            for (String type : authType.split("")) {
                switch (type) {
                    case "s":
                        booleanBuilder.or(qAdminAuth.authName.eq("SUPER_ADMIN"));
                        break;
                    case "a":
                        booleanBuilder.or(qAdminAuth.authName.eq("ADMIN"));
                        break;
                    case "j":
                        booleanBuilder.or(qAdminAuth.authName.eq("JOB_COORDINATOR"));
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
                        booleanBuilder.or(qAdminMember.id.contains(keyword));
                        break;
                    case "n":
                        booleanBuilder.or(qAdminMember.name.contains(keyword));
                        break;
                    case "e":
                        booleanBuilder.or(qAdminMember.email.contains(keyword));
                        break;
                }
            }
            query.where(booleanBuilder);
        }

        this.getQuerydsl().applyPagination(pageable, query);

        List<AdminMember> dtoList = query.fetch();

        long totalCount = query.fetchCount();

        return new PageImpl<>(dtoList, pageable, totalCount);
    }

}
