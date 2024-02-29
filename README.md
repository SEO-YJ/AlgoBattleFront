# AlgoBattle
> 신한투자증권 프로 디지털 아카데미 3기</br>
> 개발기간 : 24.02.16 ~ 24.02.29

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

## 시작 가이드
### Requirements
- [nodejs 20.11.1](https://nodejs.org/en/blog/release/v20.11.1)
- [npm 10.2.4](https://www.npmjs.com/package/npm/v/10.2.4)

### Front-end
```bash
$ git clone https://github.com/jkl0124/AlgoBattleFront.git
$ cd AlgoBattleFront

$ npm install 
$ npm run dev
```

### Back-end
```bash
$ git clone https://github.com/SEO-YJ/AlgoBattleBack.git
$ cd AlgoBattleBack/AlgoBattleBack

$ npm install 
$ npm run dev
```

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

## Stacks
<img width="500" alt="AlgoBattle_Architecture" src="https://github.com/jkl0124/AlgoBattleFront/assets/99806443/9f08cb35-be0a-40c3-aa45-563d331a7fca">
