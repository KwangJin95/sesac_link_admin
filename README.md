# SeSAC LINK (학생 지원 플랫폼) - 운영자용

## 📌 프로젝트 개요
* **이름** : SeSAC LINK
* **기간** : 2025.03.05 ~
* **소개** :

  **SeSAC LINK**는 청년취업사관학교 **SeSAC**에서 필요한 '공지사항', 'QnA', '상담 및 시설 예약', '채용 정보' 등을 제공하는 **학생 지원 플랫폼**입니다.
  
  기존에는 이러한 서비스들이 **여러 플랫폼에 분산**되어 있어 학생들이 **불편함**을 겪고 있었습니다.
  
  이를 해결하고자, **모든 기능을 하나의 웹 서비스로 통합**한 플랫폼을 개발하게 되었습니다.

---

## 🛠️ 기술스택

| 영역 | 기술 |
|------|------|
| **Backend** | Java 17, Spring Boot, Spring Security, Spring Data JPA, QueryDSL |
| **Frontend** | Thymeleaf, HTML5, CSS3, JavaScript, Tailwind CSS |
| **Database** | AWS RDS (MySQL) |
| **DevOps** | AWS EC2, S3, Git |
| **Logging** | Log4j2 (레벨별/날짜별 파일 저장) |

---

## 🏗️ 시스템 아키텍처

<img src="https://github.com/user-attachments/assets/fb693ee3-db66-45d8-9791-924b6a945783" alt="Architecture" width="700"/>

- EC2 인스턴스에서 `nohup java -Xms128m -Xmx256m -jar .jar > /dev/null 2>&1 &`로 실행
- 8091/8092 포트로 운영자/학생 프로젝트 구분
- S3에서 정적 파일 로드
- RDS MySQL은 3306 포트로 연결
- Nginx, HTTPS 및 SSL 인증서 도입 예정
  
---

## 📐 ERD

- 👉 [ERD Cloud에서 보기](https://www.erdcloud.com/d/oWYh4L629Kzbut6Ei)

<img src="https://github.com/user-attachments/assets/5e5ef095-17f0-48cd-9201-a9eeebd7f596" alt="ERD" width="700"/>

---

## ✨ 권한별 기능 정리 (추가 예정)

🔓 비로그인 사용자
- 회원가입(이메일 인증)
- 아이디 찾기
- 비밀번호 재설정(이메일 인증)
- 로그인

  

🧑‍💼 관리자 (SUPER_ADMIN)
- 계정 정보 수정
1. 👤 회원 관리
<ul>
 - 예비 운영진 (PRE_ADMIN)
 <ul>
  <li>목록 & 상세 조회</li>
  <li>소속 캠퍼스 & 권한 & 회원 상태 변경</li>
 </ul>
 - 소속 캠퍼스 운영진 (ADMIN, JOB_COORDINATOR)
 <ul>
  <li>목록 & 상세 조회</li>
  <li>등록</li>
  <li>계정 정보 수정</li>
  <li>권한 변경</li>
  <li>강제 탈퇴(회원 상태 변경)</li>
 </ul>
 - 예비 학생 (PRE_USER) 
 <ul>
  <li>목록 & 상세 조회</li>
  <li>소속 캠퍼스 & 권한 변경</li>
 </ul>
 - 소속 캠퍼스 학생 (USER)
 <ul>
  <li>목록 & 상세 조회</li>
  <li>계정 정보 수정</li>
  <li>강제 탈퇴(소속 캠퍼스 & 회원 상태 & 권한 변경)</li>
  <li>강좌 정보 등록/조회/삭제</li>
 </ul>
</ul>

2. 🏢 공간 관리
- 공간 정보 등록/조회/수정/삭제

3. 📅 예약 관리
<ul>
  <li>
    공간 예약
    <ul>
      <li>목록 & 상세 조회</li>
      <li>등록</li>
      <li>예약 상태 변경</li>
    </ul>
  </li>
  <li>
    상담 예약
    <ul>
      <li>목록 & 상세 조회</li>
      <li>등록</li>
      <li>예약 상태 변경</li>
    </ul>
  </li>
</ul>



🛠️ 예비 운영진 (PRE_ADMIN)
- 계정 정보 수정
- 계정 탈퇴(회원 상태 변경)



🛠️ 운영진 (ADMIN)
- 계정 정보 수정
- 계정 탈퇴(회원 상태 변경)
- 
1. 👤 회원 관리
<ul>
  <li>
    소속 캠퍼스 운영진(SUPER_ADMIN, ADMIN, JOB_COORDINATOR)
    <ul>
      <li>목록 & 상세 조회</li>
    </ul>
  </li>     
  <li>
    소속 캠퍼스 학생(USER)
    <ul>
      <li>목록 & 상세 조회</li>
      <li>계정 정보 수정</li>
      <li>강제 탈퇴(소속 캠퍼스 & 회원 상태 & 권한 변경)</li>
      <li>강좌 정보 등록/조회/삭제</li>
    </ul>
  </li>     
</ul>

2. 🏢 공간 관리
- 공간 정보 등록/조회/수정/삭제

3. 📅 예약 관리
<ul>
  <li>
    공간 예약
    <ul>
      <li>목록 & 상세 조회</li>
      <li>등록</li>
      <li>예약 상태 변경</li>
    </ul>
  </li>
  <li>
    상담 예약
    <ul>
      <li>목록 & 상세 조회</li>
      <li>등록</li>
      <li>예약 상태 변경</li>
    </ul>
  </li>
</ul>



👤 잡코디네이터 (JOB_COORDINATOR)
- 계정 정보 수정
- 계정 탈퇴
  
1. 👤 회원 관리
<ul>
  <li>
    소속 캠퍼스 운영진(SUPER_ADMIN, ADMIN, JOB_COORDINATOR)
    <ul>
      <li>목록 & 상세 조회</li>
    </ul>
  </li>     
  <li>
    소속 캠퍼스 내 본인에게 배정된 학생(USER)
    <ul>
      <li>목록 & 상세 조회</li>
    </ul>
  </li>     
</ul>

3. 📅 예약 관리
<ul>
  <li>
    공간 예약
    <ul>
      <li>목록 & 상세 조회</li>
      <li>등록</li>
      <li>예약 상태 변경</li>
    </ul>
  </li>
  <li>
    본인에 대한 상담 예약
    <ul>
      <li>목록 & 상세 조회</li>
      <li>등록</li>
      <li>예약 상태 변경</li>
    </ul>
  </li>
</ul>

---

## 🔐 권한별 기능 정리

| 기능 항목 | ROLE_USER | ROLE_ADMIN | ROLE_SUPER_ADMIN |
|-----------|-----------|------------|------------------|
| 회원가입 / 로그인 | ✅ | ❌ | ❌ |
| 마이페이지 (정보 수정, 비밀번호 변경) | ✅ | ❌ | ❌ |
| 서비스 신청 / 조회 | ✅ | ❌ | ❌ |
| 사용자 목록 보기 | ❌ | ✅ | ✅ |
| 사용자 권한 변경 | ❌ | ❌ | ✅ |
| 사용자 계정 상태 변경 | ❌ | ✅ | ✅ |
| 로그 확인 | ❌ | ✅ | ✅ |
| 파일 업로드 (S3) | ✅ | ✅ | ✅ |
| 관리자 페이지 접근 | ❌ | ✅ | ✅ |

---

## ⚙️ 기능 흐름도
- 공통
![Image](https://github.com/user-attachments/assets/8edadfae-6c54-45b6-8148-4ccfba605fdb)


---

## 🖥️ 주요 화면

<table>
  <tr>
    <th>기능</th>
    <th>화면</th>
  </tr>
  <tr>
    <td><b>채널</b></td>
    <td width="85%"><img src="https://github.com/user-attachments/assets/66147753-aab9-46f4-b5f3-b9f5013285a0"></td>
  </tr>
</table>

 - 채널 프로필 사진 또는 이름 클릭 시 이동되는 페이지
 - 내 채널인 경우 프로필 사진 클릭 시 비밀번호 확인 및 회원 정보 수정 페이지로 이동
 - 채널 자세히 알아보기 클릭 시 채널 세부 정보 창을 띄워 채널 URL, 구독자 수, 동영상 개수, 조회수, 가입일 등의 정보 조회 가능
 - 동영상 관리 버튼 클릭 시 채널 콘텐츠 화면으로 이동
 - 만들기 버튼 클릭 시 동영상 업로드 창을 띄움
 - 동영상 섬네일 또는 제목 클릭 시 해당 동영상 시청 페이지로 이동
---


---

## 📁 패키지 구조

```
pom.xml
fakeTube.sql                            : DB 관련 SQL문 작성 파일
└─src
     └─main
         ├─java
         │   └─com
         │       └─spring
         │           └─ft
         │               ├─comments     : 댓글 service 인터페이스 및 댓글 VO 클래스
         │               │   └─impl     : 댓글 service 구현 클래스 및 댓글 DAO 클래스
         │               ├─common       : 페이징 클래스
         │               ├─likes        : 좋아요 service 인터페이스 및 좋아요 VO 클래스
         │               │   └─impl     : 좋아요 service 구현 클래스 및 좋아요 DAO 클래스
         │               ├─members      : 회원, 이메일 인증 service 인터페이스 및 회원, 구독 VO 클래스
         │               │   └─impl     : 회원 service 구현 클래스 및 회원 DAO 클래스
         │               ├─qna          : 문의 service 인터페이스 및 문의, 페이징 VO 클래스
         │               │   └─impl     : 문의 service 구현 클래스 및 문의 DAO 클래스
         │               ├─sub          : 구독 service 인터페이스 및 구독 VO 클래스
         │               │   └─impl     : 구독 service 구현 클래스 및 구독 DAO 클래스
         │               ├─video        : 동영상 service 인터페이스 및 동영상, 채널 VO 클래스
         │               │   └─impl     : 동영상 service 구현 클래스 및 동영상 DAO 클래스
         │               └─view         : controller
         │                   ├─comments
         │                   ├─likes
         │                   ├─members
         │                   ├─myChannel
         │                   ├─qna
         │                   └─video
         │                           
         ├─resources
         │   │   applicationContext.xml : root 컨테이너 설정 파일
         │   │   log4j.xml              : log4j 설정 파일
         │   │   mybatis-config.xml     : mybatis 설정 파일
         │   └─mappings                 : mybatis mapper 파일
         │       ├─comments   
         │       ├─likes
         │       ├─members
         │       ├─qna
         │       ├─sub
         │       └─video
         │               
         └─webapp                       : 각종 jsp 파일
             ├─common                   : 각종 jsp 파일
             ├─iconImage                : 아이콘 이미지 파일
             ├─profileImage             : 계정 이미지 파일
             ├─resources
             │   ├─css                  : css 파일
             │   └─images
             │       ├─icon             : 아이콘 이미지 파일
             │       └─members          : 기본 계정 이미지 파일
             ├─thumimgs                 : 동영상 섬네일 이미지 파일
             ├─videos                   : 동영상 파일
             └─WEB-INF
                 │   web.xml
                 ├─config               : servlet 컨테이너 설정 파일
                 ├─jsp                  : 각종 jsp 파일
                 │   ├─comments
                 │   ├─frame
                 │   ├─member
                 │   ├─myChannel
                 │   ├─qna
                 │   └─video
                 └─views                : 각종 jsp 파일

```

---
## 🔧 향후 개선 방향


---

