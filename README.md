# 🏠 집탈출
#### 집을 탈출하고 싶은 사람들에게 숙소 정보와 예약시스템을 제공하는 사이트
<img width="649" alt="1" src="https://github.com/jiin0104/ZIP/assets/122608411/cba7dc77-9ab2-4bbe-954e-fe9c70580c23">

<br>
<br>
<br>

## 목차
1. [개요](#개요)
2. [사용자](#사용자)
3. [개발환경](#개발환경)
4. [설계](#설계)
5. [미리보기](#미리보기)
6. [시연](#시연)
7. [실행](#실행)
<br>
<br>
   
## 개요
* 프로젝트 이름: 집탈출
* 기간: 2023.06.12-2023.07.20(약 5주)
* 인원: frontend 2명, backend 3명
* 목적: 코로나 이후 급증한 여행 심리에 따라 여행의 중요한 요소인 숙박 시설의 최신 정보를 제공하고, 예약까지 이어질 수 있는 여행 예약 플랫폼을 기획했습니다.
* 기여: frontend, Design
  * 웹 퍼블리싱(디자인), 내 정보, 예약 페이지, 예약 숙소 정보 모달창 구현, 회원 탈퇴 
<br>
<br>

## 사용자
* 성별, 연령대, 선호하는 장르, 현재 기분에 따른 영화 추천을 받고 싶은 유저
* 나와 비슷한 성별, 연령대의 사용자들이 많이 추천 받은 영화를 알고 싶은 유저
* 내가 관심있을만한 영화를 알고싶은 유저
<br>
<br>

## 개발환경
### ✔️Frond-end
<div><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"></div> <br>

### ✔️Back-end
<div><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=aws&logoColor=white"></div>
<br>
<br>

## 설계
### Wireframe
<img src="https://github.com/jiin0104/cinema/assets/122608411/939b5d47-a211-42e7-95b5-e30dc41cb741" width="700" height="500">

### E-R Diagram
<img src="https://github.com/jiin0104/cinema/assets/122608411/1f03cb85-11cd-4007-85c3-f6dd2c3fccb8" width="700" height="500">

### Usecase Diagram
<img src="https://github.com/jiin0104/cinema/assets/122608411/f3afd7c1-2c6f-4af3-b48c-f329485ca3f7" width="700" height="500">

### 요구사항 정의서
<img src="https://github.com/jiin0104/cinema/assets/122608411/86f35d21-bc66-431c-9c0b-6f74881fbbe2" width="700" height="500">

<br>
<br>
<br>


## 미리보기
### Main
|비로그인시|로그인시|
|:---:|:---:|
|<img src="https://github.com/jiin0104/cinema/assets/122608411/dada9fb8-3625-4836-a5ad-71784c60cca3" width="400" height="300">|<img src="https://github.com/jiin0104/cinema/assets/122608411/34c69036-7358-48f6-8a9a-cf3cd1d74006" width="400" height="300">|
|지금 상영중인 영화, 평점 좋은 영화|내가 좋아할 만한 영화, 나랑 비슷한 사람들이 추천 받은 영화|
<br>
<br>


## 시연
### Main & Filtering & Recommend
![ezgif com-video-to-gif (1)](https://github.com/jiin0104/cinema/assets/122608411/a84574dc-858f-4ddb-b611-8812fca8084b)
### UserRecommend & Review
![리뷰](https://github.com/jiin0104/cinema/assets/122608411/25250b56-bec2-425d-a164-6d109ca4fd24)
<br>
<br>

## 실행
### front

    cd vueserver
    npm install
    npm run serve

### back

    cd Nodeback
    npm install
    node app.js
