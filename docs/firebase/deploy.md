# Firebase 로 웹앱 호스팅하기

## Firebase 프로젝트 생성하기

1. 구글에 firebase 검색

1. '시작하기' 클릭

1. 구글 계정으로 로그인

1. 'Add Project' 눌러서 새 프로젝트 만들기 창 열기

1. 프로젝트 이름 정하기 (아래 Project ID 가 url 이름으로 들어가므로 주의)

1. Continue 눌러서 프로젝트 생성

<img src="/images/firebase1.png" />
<br/>
<img src="/images/firebase2.png" style="margin-top: 20px;" />

7. 왼쪽 사이드 메뉴에서 'Hosting' 선택

8. 시키는대로, **npm** 으로 필요한 도구 몇가지를 설치해야 한다. (이제 웹사이트는 닫아도 된다.)

<img src="/images/firebase3.png" />

9. 커멘드 창을 열고 (혹은 Visual studio code 에서 터미널을 열고), 현재 우리가 배포하고 싶은 프로젝트 폴더 경로로 가서, 다음 순서대로 진행. 

```
npm install -g firebase-tools
```
```
firebase login
```
```
firebase init
```

10. 그 후, Yes => Hosting 에만 spacebar 로 체크 => firebase 웹사이트에서 생성한 프로젝트 이름 고르기 => `dist` 라고 쓰기 => y 의 순서로 대답 (아래 이미지 참고)

<img src="/images/firebaseDeploy1.png" />

11. 지금까지 우리는 `npm run dev` 라는 개발용 서버를 사용중이었기 때문에, 이제 서비스를 위해 어딘가에 프로젝트를 올리려면 `npm run build` 로 최적화를 시켜주어야 한다. 따라서 프로젝트 폴더 경로에서 `npm run build` 작성 후 엔터.

12. `npm run build` 를 마치고 나면 `dist` 폴더가 생기는데, 그 안에 있는 `index.html` 은 firebase 가 생성한 것이지 우리가 원래 쓰고 있던 `index.html` 파일이 아니다. 따라서 프로젝트 폴더에 있는 `index.html` 을 복사하여 `dist` 폴더 안에 있는 `index.html` 덮어쓰기. 그 후, `index.html` 파일 내 `build.js` 파일 참조하는 위치를 수정해 줌. (아래 그림 참고) (원래 이런 귀찮은 일을 안해도 되는데, 우리가 사용중인 **webpack-simple** 템플릿이 여기까지 지원해주지 않는 것으로 보임. webpack 으로 했다면 자동 세팅이 됨.)

<img src="/images/firebaseDeploy2.png" />

<img src="/images/firebaseDeploy3.png" />

13. 여기까지 했다면, 다시 터미널에서

```
firebase deploy
```

위 커멘드를 작성 후 엔터쳐서 실행시키면 배포 완료. 

14. Firebase 홈페이지 Hosting 탭에 들어가서 주소를 확인하여 들어가면 우리가 만든 웹앱이 잘 돌아가고 있는 것을 볼 수 있다! :tada:

<img src="/images/firebaseDeploy4.png" />