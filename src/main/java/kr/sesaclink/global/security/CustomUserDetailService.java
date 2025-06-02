package kr.sesaclink.global.security;

import kr.sesaclink.domain.member.dto.AdminMemberSecurityDTO;
import kr.sesaclink.domain.member.entity.AdminMember;
import kr.sesaclink.domain.member.repository.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final AdminMemberRepository adminMemberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {

        AdminMember adminMember = adminMemberRepository.getWithAuthAndMemberStatusAndCampus(username).orElseThrow();

        // 회원 상태 ACTIVE 아님
        if (!adminMember.getMemberStatus().getMemberStatusName().equals("ACTIVE")) {
            throw new UsernameNotFoundException(username);
        }

        return new AdminMemberSecurityDTO(adminMember);
    }
}
