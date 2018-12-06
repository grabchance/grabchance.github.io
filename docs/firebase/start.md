# 세팅하기

## Firebase 홈페이지에서 프로젝트 만들기

아래 이미지들을 참고하면서 순서대로 진행해보자.

1. Firebase 홈페이지에 접속한다. [Firebase](https://firebase.google.com/ "Firebase 링크")

1. **시작하기** 버튼을 눌러 들어간 후 구글 로그인을 한다. 

<img src="/images/firebase1.png" />

1. **Add project** 버튼을 눌러서 새 프로젝트 만들기 창을 연다.

1. 프로젝트 이름 정한다. (이름이 임시로 발급되는 url 의 일부로 들어가므로 조금 고민할 가치가 있다.)

1. 분석 지역을 South Korea 로 변경해준다.

1. *Use the default settings~* 부분을 체크 해제한다. ~~나이가 들수록 우리는 함부로 체크 안 하는 습관을 들여야 한다.~~ 최근 보안 규정이 개정되면서 어차피 체크해야 되는 것 같기도 하니 이 단계는 건너뛰어도 된다.

1. Continue 눌러서 프로젝트를 생성한다.

<img src="/images/firebase2.png" style="margin-top: 20px;" />

6. 처음 이용해볼 **Firebase** 의 서비스는 **Database** 이다. Firebase 에서는 **FireStore** 라는 이름의 NoSQL 기반 데이터베이스를 이용한다. ~~궁금하면 찾아봐도 되지만 그냥 이름이 Firestore 라는 것만 알고 넘어가도 된다.~~  왼쪽 메뉴 탭에서 **Database** 를 클릭 후, *Create database* 버튼을 눌러준다. 그리고나면 뜨는 창에서 *test mode* 를 클릭하여 데이터베이스를 생성해주자. 테스트 모드는 말 그대로 테스트 모드로, 누구나 쓰고 읽을 수 있어서 보안 문제가 발생할 수 있지만, 아직 학습중이니까 편할 걸 쓰자!

<img src="/images/firebase7.png" />
<br>
<img src="/images/firebase8.png" />
<br>
<img src="/images/firebase9.png" />

7. 다 따라한 후 위와 같은 화면이 떴다면 이제 이 **firebase** 데이터베이스를 우리가 만들었던 *성점추* 프로젝트와 연결해보자!

## 로컬 프로젝트와 Firebase 연결하기

1. 프로젝트가 생성된 뒤에 나오는 창이었던 **Project Overview** 를 메뉴 탭에서 찾아 들어가서 중앙 부분의 **Add an app to get start** 위 웹 아이콘을 클릭한다.

<img src="/images/firebase4.png">

2. 클릭 후 뜨는 창을 보면 우리가 로컬에서 작업한 프로젝트를 지금 막 생성한 Firebase 프로젝트와 연결할 수 있는 `<script>` 태그가 2 개 있다. 그 중에서 두 번째 태그의 내용을 태그를 제외하고 복사한다.

<img src="/images/firebase5.png">

3. 이제 Vue CLI 실습을 하며 만들었던 *성점추* 로 돌아가보자.



4. 위에서 만들었던 Firebase 프로젝트와 로컬에서 작업중이던 *성점추* 를 연결하려면 우선 *성점추* 프로젝트에 **firebase** 라이브러리를 설치해야 한다. cmd 로 작업 중인 폴더 경로로 들어가 (혹은 visual studio code 내 터미널을 이용해서) 다음 코드를 이용해서 **firebase** 를 설치하자. 

```
npm install firebase --save
```

5. 그리고 `src` 폴더 내에 **firebase** 라는 폴더와 그 안에 `init.js` 파일을 만들어서 **firebase** 관련 세팅을 할 장소를 만들자. 그 후, 이전에 복사해놨던 script 태그 내용을 붙여넣기 한다. 

6. 붙여넣기를 마친 후에는, 그 위 아래에 `import` 와 `export` 관련 코드를 써준다. `import` 는 우리가 `npm install firebase` 를 통해서 다운 받았던 **firebase** 를 가져오는 과정이고, `export` 는 그렇게 가져온 firebase 관련 코드와 세팅을 다른 곳에서도 쓸 수 있도록 내보내는 과정이다. 아래 코드를 참고해서 작성해주자. 가운데 `var config` 내용 외에는 조금씩 바뀐 부분이 있다.

<img src="/images/firebase6.png">

7. 세팅을 마쳤으니 *성점추* 프로젝트에서 **Firebase** 의 데이터베이스(Firestore) 를 사용해보도록 하자!


<hr style="margin-top: 45px;">

<DisqusNew />