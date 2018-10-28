# Vue CLI 파헤치기

## 순서
* 설치 순서는 다음과 같다.

  1. node js 설치하기
  1. Vue cli 설치하기
  1. Vue cli init 설치하기
  1. 첫 프로젝트 만들기

## node js 설치하기

[설치 링크](https://nodejs.org/ko/download/ "nodejs 링크")

설치페이지에서 본인 컴퓨터에 맞는 버전을 설치한다.

설치를 마친 후, cmd 나 powershell 등의 커멘드 창에서 

```
node -v
```

라고 쳤을 때 버전이 뜨면 성공적으로 설치된 것이다. 
:::tip
**개발자 티낼 수 있는 꿀팁**: 윈도우 사용자의 경우 윈도우 키 + r 을 누르면 뜨는 실행창에 cmd 나 powershell 을 쳐서 커멘드 창에 들어가면 간지난다.
:::

## Vue CLI 설치하기

몇달 전에 Vue CLI ver.3 이 등장했지만, 아직 관련자료가 부족해서 아직은 Vue CLI ver.2 로 공부하는 것이 낫다. 

[Vue CLI 공식문서 링크](https://cli.vuejs.org/guide/ "공식문서 링크")

그래도 언제 ver.3 를 쓸지 모르니, 공식문서를 따라 ver.3 를 설치하고, ver.2 처럼 쓸 수 있도록 해주는 걸 다시 깔아줄 것이다.

* 설치 순서
  1. 커멘드 창에 들어간다.
```
npm install -g @vue/cli
```
로 설치한다. 여기서 -g 는 global 이란 뜻으로, 어느 폴더위치에서나 쓸 수 있도록 컴퓨터 전체를 대상으로 설치한다.

설치를 마친 후, 커멘드 창에 
```
vue --version
```
이라고 쳤을 때 3 버전이라고 나오면 제대로 설치된 것이다.

이제 2 버전처럼 쓸 수 있도록 추가적인 설치를 해준다. 커멘드 창에 
```
npm install -g @vue/cli-init
```
이라고 입력 후 설치한다.

## 첫 Vue CLI 프로젝트 만들기
이전 문서에서 말했듯이, Vue CLI 의 역할은 잘 만들어져있는 프로젝트 틀(template)을 제공하는 것이다. 프로젝트의 목적에 따라 그 틀은 달라질 수 있다. 2 버전에서 대표적으로 제공하는 template 은 
1. simple 
1. webpack-simple 
1. webpack 
1. browserify/browserify-simple

네가지이다. **simple** 은 우리가 처음 Vue 를 접했을 때 사용했던, 단순히 html 파일에 vuejs 를 `<script>` 태그로 가져와 사용했던 아주아주 단순한 학습용 template 이다.

**webpack** 의 경우 아직 배우지 않은 부분까지 모두 만들어 주기 때문에 학습용으로 적합하지 않다. 

**browerify** 는 몰라도 된다. 스킵.

그래서 우리는 **webpack-simple** 을 사용해서 앞으로 Vue 개발을 배운다.

커멘드 창에 들어가서, 프로젝트를 생성하고 싶은 폴더 위치로 이동한다. (cd 로 이동하는 바로 그거다. 기억나지 않는다면 cmd 명령어 등으로 구글링하거나 주변에 물어보도록 하자.)

원하는 위치로 갔다면

```
vue init webpack-simple first-project
```
위 명령어를 입력해서 'first-project' 라는 프로젝트를 생성한다. 물론 이름은 원하는 것으로 마음대로 바꾸어도 된다. 

그럼 뭔가 다운로드 한 뒤 몇가지 질문을 던진다. Use Sass? 만 N 라고 대답해주고 나머지는 엔터를 쳐서 넘기자. 

그 뒤, 시키는대로 

1. `cd first-project` 로 만들어진 프로젝트로 이동 후
1. `npm install` 로 필요한 파일들을 다운로드 받고
1. `npm run dev` 로 개발서버를 실행시키면 **webpack-simple** 이 제공하는 기본적인 틀을 브라우저 창에서 확인할 수 있다! :tada:

<img src="/images/firstproject.png" width="300px;" />

## Vue CLI 폴더 구조 이해하기
지금부터는 어떤 코드를 나에게 줬길래 이런 결과물을 보여주는 지 확인해보도록 하자. 프로젝트를 생성했던 위치로 가서 본인이 사용하는 에디터로 해당 폴더를 열어보면, 아래와 같은 폴더구조가 나타날 것이다.

<img src="/images/folderstructure.png" width="300px;" />
<br>

하나하나 살펴보며, Vue CLI 가 어떤 것을 제공하는 지 알아보도록 하자. 우선 바로 보이는 것들부터 간단하게 말해보면,

1. `.babelrc` 라는 파일은 babel 이란 것과 관련있다. babel 은 자바스크립트 최신 문법인 es6 을 이전 버전으로 번역해주어서 인터넷 익스플로어 같은 구버전 브라우저에서도 실행되도록 변환해준다. 더 궁금하면 찾아봐도 되지만 당장은 몰라도 된다. 그냥 우리 대신에 뭔갈 해준다는 것에 감사하며 넘어가자.

1. `.gitignore` 은 알다시피 git 과 관련된 것으로, git 에 올리지 않아도 되는 코드를 무시하도록 미리 작성되어 있다. 감사하며 넘어가자.

1. `.editorconfig` 는 에디터 세팅으로, Vue CLI 에서 제공하기 보다는 vs code 에서 주는 것이니 스킵.

1. `package.json` 은 레일즈의 jam 과 같이 이 프로젝트에 쓰인 각종 라이브러리와 그 의존관계를 정리해둔 곳이다. 격렬히 감사하며 넘어가자.

1. `webpack.config.js` 는 webpack 이라는 프로젝트 build 도구와 관련된 세팅이다. 웹팩은 공부할 게 많은 아주 고마운 도구인데, 초보 개발자인 우리로서는 필요할 때 조금씩 공부하고 아직은 잘 몰라도 된다. 단순하게는, 앞으로 우리가 작성할 수많은 파일들을 하나의 파일로 잘 합치고 최적화해주는 고마운 도구라고 생각하면 된다.

1. `index.html` 이 SPA(Single Page Application) 개발의 중심이 되는 그 Single Page 파일이다. 앞으로 우리가 **src** 폴더에 작성할 수많은 vue 컴포넌트들이 이 **index.html** 파일에 씌워지고 제거되며 하나의 서비스가 될 것이다. SPA 말 그대로, 앞으로 어떤 서비스를 만들든, 이 **index.html** 이외의 다른 `.html` 파일은 없다.

<img src="/images/indexFile.png" width="400px;" />
<br>

`index.html` 파일에 들어가보면, script 태그 안에 `/dist/build.js` 라는 경로가 있는데, 폴더 구조를 보면 아직 `/dist` 라는 폴더가 없다. 이는 아직 우리가 `npm run dev` 라는 개발 환경에서 작업하고 있기 떄문이고, 나중에 개발을 마친 후에 `npm run build` 로 빌드를 하면 생기게 된다.

7. `src` 폴더가 앞으로 우리가 제일 많이 들어갈 곳으로, 대부분의 코드가 이 곳에 쓰이게 된다. `asset` 폴더는 이미지 등을 넣는 곳이니 나중에 신경쓰도록 하고, 대부분의 코드는 이 `src` 파일 내에 또다른 폴더를 만든 후 그 안에 .vue 파일을 생성하는 형식으로 프로젝트를 완성해나가게 된다. 그렇다면 이 .vue 파일의 정체를 알아보자.

## .vue 확장자 파일 이해하기

:::tip
`.vue` 파일은 결국에는 `html`, `css`, `js` 파일로 컴파일 된다. 
:::

앞서 말했듯이 보다 원활한 컴포넌트 중심의 개발을 위해 만들어진 것으로, 어렵게 생각할 필요가 없다. 결국 안에 들어갈 내용은 우리가 잘 아는 `html`, `css`, `js(Vue)` 코드다. 

미리 만들어져 있는 `App.vue` 파일을 살펴보면, 우리가 Vue 를 처음 배울 때 썼던 일반적인 html 코드 구조였던

```html

<html>
  <head>
  
    <style>
      css 코드들
    </style>
  </head>

  <body>
  
    html 코드들

    <script>
      자바스크립트 코드들
    </script>
  </body>
</html>

```

대신에 

```html

<template>
  html 코드들
</template>

<script>
  자바스크립트 코드들
</script>

<style>
  css 코드들
</style>

```

로 바뀌었을 뿐 아주 새로운 문법이나 개념이 추가된 것은 아니다. 

다만 특이한 게 하나 있는데, `<script>` 태그 안에 `export default{}` 라는 게 있고, 그 안에 Vue 코드들이 존재한다는 것이다. 

그럼 우리가 원래 썼던 `new Vue({})` 는 어디에 있을까? 바로 `main.js` 파일에 있다.

`main.js` 파일은 처음보는 게 좀 있는데, 어렵게 생각할 필요 없이, `import App from './App.vue'` 는 방금 우리가 본 `App.vue` 파일을 가지고 와서 App 이란 변수로 쓰겠다는 것이다. 이렇게 가져오려면 `App.vue` 가 자기를 가지고 가도 된다고 허락해야 되기 때문에 `export default{}` 라는 게 있었구나라고 생각하면 된다.

맨 위에 `import Vue from 'vue'` 같은 경우, 이 Vue CLI 전에 쓰던 기본적인 html 환경에서 우리가 `<script>` 태그로 가지고 왔던 Vue 를 이제는 이 프로젝트 내에 미리 다운 받아놓고 그걸 가져오는 것이라고 생각하면 된다. 'vue' 에 딱히 경로 표시가 되어있지 않은 이유는 기본 경로 설정이 `node_modules`, 즉 이 프로젝트에 설치된 모든 것들이 있는 곳을 이미 가리키고 있기 때문이다. 진짜 있는지 의심된다면 `node_modules` 폴더를 뒤져보도록 하자.

이제 기본적인 배경 설명은 끝났다. 앞으로는 즐겁게 Vue 개발을 배워보도록 하자!

