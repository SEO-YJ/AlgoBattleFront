# AlgoBattle
> 신한투자증권 프로 디지털 아카데미 3기</br> 개발기간 : 24.02.16 ~ 24.02.29

## 개발 주소
> AWS 배포 주소 : <http://ec2-3-34-254-241.ap-northeast-2.compute.amazonaws.com/> <br/>
> Front-end Github : <https://github.com/jkl0124/AlgoBattleFront> <br/>
> Back-end Github : <https://github.com/SEO-YJ/AlgoBattleBack> <br/>

## 팀원 소개
|권기현|김현수|서유준|허상진|
|:---:|:---:|:---:|:---:|
|<img width="160px" src="https://avatars.githubusercontent.com/u/99806443?v=4"/> |<img width="160px" src="https://avatars.githubusercontent.com/u/122847760?v=4" />|<img width="160px" src="https://avatars.githubusercontent.com/u/76039485?v=4" />|<img width="160px" src="https://avatars.githubusercontent.com/u/128025654?v=4" />|
|[@kkh0331](https://github.com/kkh0331)|[@jkl0124](https://github.com/jkl0124)|[@SEO-YJ](https://github.com/SEO-YJ)|[@bookeers](https://github.com/bookeers)|

## 프로젝트 소개
AlgoBattle은 긴장감 넘치는 코딩테스트를 통해 알고리즘 실력 향상을 도모하는 게임이다. 사용자는 원하는 알고리즘 유형과 난이도를 선택하여 상대와의 실시간 경쟁을 즐길 수 있다. 랜덤으로 주어지는 문제를 풀고, 시간 내에 해결하지 못하거나 상대방에게 먼저 정답을 제출한 경우 게임이 종료된다. 이를 통해 사용자는 다양한 알고리즘 경험을 쌓을 뿐만 아니라, 푼 문제는 다시 출제되지 않아 새로운 도전을 계속할 수 있다.

## Stacks 🐈

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express.js](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/socketio-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)

## 화면 구성
| 메인 페이지  |  로그인 Modal  |
| :---: | :---: |
|<img width="400" alt="main_page" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/b25f6be2-27ca-4b4c-a819-489ed54cf193">|<img width="400" alt="login_modal" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/ce9370d1-7050-4949-8a24-58e2cb7bec9b">|
|방 생성 Modal|방 페이지|
|<img width="400" alt="create_room_modal" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/dc509b5e-c51c-4aee-bdee-65de5cb7dd2e">|<img width="400" alt="room_page" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/b80f5478-7f8b-4cb1-a091-b0d9c06c174f">|
|게임 페이지|결과 페이지|
|<img width="400" alt="game_page" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/d99e35dc-f743-4dbc-bb55-587414602232">|<img width="400" alt="result_page" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/75fa8c6a-989f-49ef-a591-25b3819235b5">|

## 주요 기능

### ⭐️ 백준 연동 기능
- 백준 아이디를 입력하면 solved.ac api를 통해 있는지 확인
- 만약 있을 경우, crawling을 통해 맞은 문제 리스트를 가져옴

### ⭐️ 방 생성 기능
- 공개와 비공개를 선택하고 티어(level)와 알고리즘 유형을 선택하여 방 생성
- Web Socket을 활용하여 새로 고침을 하지 않아도 Main Page에 있는 사용자 전부에게 실시간으로 생성된 방 정보를 확인 가능

### ⭐️ 문제를 추천해 주는 기능
- 티어, 알고리즘, 게임에 참여중인 플레이어가 푼 문제를 고려하여 랜덤하게 추첨
- 조건에 맞는 문제가 없을 경우에는 티어와 알고리즘을 다시 선택

### ⭐️ 채점 기능
- 문제를 풀었을 경우에 백준 아이디를 활용하여 채점된 결과를 받아옴

### ⭐️ Web Socket 기능
- socket.io room 기능을 활용하여 게임에 참여 중인 플레이어 간에 행동이 실시간으로 확인 가능

## 개발 과정 중 이슈

### 배포
- 문제 사항 : AWS을 통해서 EC2을 이용한 배포를 진행했는데, 백준 아이디를 연동할 때 서버로는 데이터를 보냈는데 서버에서 외부 api을 가져오지 못한다는 문제가 있었음
- 해결 방안 : 초반 배포 설정을 했을 때, npm과 node 버전이 너무 낮게 설정해서 문제였음. 그래서 npm과 node의 버전을 최신 버전으로 업그레이드를 해서 문제를 해결했음.

## Architecture
<img width="500" alt="AlgoBattle_Architecture" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/9f08cb35-be0a-40c3-aa45-563d331a7fca">
