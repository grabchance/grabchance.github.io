# Vue-Router 박살내기

## '/' 탈출하기
지금까지 잘 따라왔다면, 뭔가를 많이 배운 건 알겠는데 대체 언제쯤 제대로 된 웹 서비스를 만들 수 있나 의문이 들 것이다. 그리고 보통 '제대로 된 웹 서비스' 는, 기본 경로인 **/** 을 벗어나 **/about** 이나 **/post** 같은 다른 페이지로 넘어가는 걸 포함한다.

<img src="/images/want.jpg">

각각의 웹페이지가 하나의 html 파일이었던 과거 웹사이트는, 브라우저 주소창에 주소를 치면 서버가 해당 주소에 맞는 html 파일을 사용자에게 던져줬다. 하지만 SPA(Single Page Application) 는 꼴랑 하나의 html 파일만 가지고 있고, 우리는 지금 서버도 없다. 그럼 뭐 어쩌라는 거냐 싶겠지만 한 번 더 생각해보자. 

우리가 지금까지 한 모든 것이 `index.html` 에 JS 로 원하는 블럭(Component)을 집어넣는 과정이었다. 그럼 그냥 페이지 하나당 하나의 블럭을 만들어, 그것들을 바꿔 끼울 때마다 브라우저 주소창만 바꿔주면 똑같아 보이지 않을까? 심지어 페이지 이동할 때마다 서버에 Request 를 넣고 Response 를 받아올 필요가 없어서 서버를 오가는 시간 없이 스무-스한 사용자 경험을 제공해준다. ~~궁금하지 않겠지만~~ 서버와 연결이 끊겨도 돌아다닐 수 있단 점을 잘 활용하면 모바일 앱처럼 오프라인에서도 작동하는 웹앱도 만들 수 있다! 

:::tip
오프라인에서 작동가능한 점을 포함하여 마치 모바일 앱처럼 스마트폰에 아이콘도 설치할 수 있고, 푸쉬 알림까지 지원가능한 웹앱을 만드는 기술을 PWA (Progressive Web App) 이라고 한다. 관심있으면 찾아보도록 하자.
:::

## Vue-Router 시작하기
개념을 이해했다면, 복잡한 건 잘 만들어진 라이브러리를 활용하면 된다. 커맨드 창을 열고 프로젝트 경로로 가, vue-router 을 설치해주자.

```
npm install vue-router --save
```
설치가 완료된 후 에디터로 프로젝트 폴더를 확인해보면, `package.json` 파일에 **vue-router** 가 기록된 것을 확인할 수 있다.

<img src="/images/package.png" />

그리고 이전에 `component` 폴더를 만들었듯이, 같은 레벨에 `router` 라는 폴더를 만들고 그 안에 `index.js` 라는 파일을 생성하자.

<img src="/images/routerFolder.png" />

그리고 나서 새로 만든 `index.js` 파일에 다음과 같은 코드를 입력하자.

```js
// index.js 파일
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: []
})
```

그리고 나서 `main.js` 파일에 다음과 같은 코드를 추가하자.

```js{4,9}
// main.js 파일
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// './router' 은 자동으로 './router/index.js' 를 찾아간다.

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```
이렇게 하면 **Vue-router** 을 이용하기 위한 기본 틀이 완성되었다. 간단하게 설명을 하자면, `index.js` 파일에서 Vue 에서 vue-router 을 사용할 수 있게 세팅하고, 그 세팅을 `main.js` 에 불러와서 현재 Vue instance 에 등록한 것이다. 정확히 이해하지 못해도 괜찮으니 적당히 넘어가도록 하자.

## '/' 에 Home.vue 등록하기
먼저 기본 경로인 '/' 에 해당하는 블록을 만들고, vue-router 에 등록해보자. vue-router 을 배우기 전에 만들었던 것들이 아까우니, 그것들을 그대로 새로 만든 `Home.vue` 파일에 복붙하자. 

:::warning
본인이 어떻게 작업했느냐에 따라 (특히나 오프라인 세션에서 온라인 코드와 다르게 작업했기 때문에) 컴포넌트 import 경로가 달라졌을 수 있다. 어떻게 수정해야 할지 헷갈린다면 아래 이미지를 참고하여 고치도록 하자.
:::

<img src="/images/routerHome.png" />

그리고 나서 `router/index.js` 파일에 다음과 같이 첫번째 경로를 등록하자. 해당 경로에 사용할 컴포넌트를 **import** 하고 **component(단수)** 에 쓴다는 것에 유의하자.

```js{4,10,11,12,13,14}
// index.js 파일
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
```

이렇게 뭔가 많이 했지만, 아직까지는 브라우저 화면에 표시되는 게 달라진 게 없다. 이전에 화면에 그려지는 모든 것은 `App.vue` 파일과 관련있어야 된다고 했던 것을 떠올려보자. `App.vue` 파일에, 이 서로 교체될 블록들이(아직은 `Home.vue` 밖에 없지만) 들어갈 자리를 만들어야 한다. 그 자리를 `<router-view />` 라고 부른다.

```html
<!-- App.vue 파일 -->
<template>
  <div>

    <div class="header">
      <h1>성점추</h1>
      <h3 class="subtitle">성대생을 위한 점심 추천 서비스</h3>
    </div>

    <div class="app-main">
      <router-view/>
    </div>

  </div>
</template>
```

취향에 따라 `<div class="app-main">` 로 한 번 감싸놓았지만, 어쨌거나 `<router-view />` 가 위치한 곳에 앞으로 우리가 `router/index.js` 에 등록하는 파일들이 주소에 맞게 서로 교체되며 자리하게 된다. `npm run dev` 로 서버를 돌려, vue-router 를 사용하기 전과 동일하게 브라우저에 표시되는지 확인해보도록 하자. 

:::tip
주소창에 # 가 붙은 것을 볼 수 있는데 일단은 무시하도록 하자. 나중에 아주 간단하게 없앨 수 있다.
:::

## '/review' 에 Review.vue 등록하기
드디어 새로운 페이지, **/review** 를 만들어보도록 하자. github 이나 아래 코드를 참고하자. ~~복붙하자~~ 

```html
<!-- Review.vue 파일 -->
<template>
<div>

  <div class="review-header">
    <h1>리뷰s</h1>
  </div>

  <div class="review-main">
    <div :to="{name: 'ReviewDetail', params: {id: review._id, review: review}}" tag="div" class="review" v-for="(review,index) in reviews" :key="index">
      <h3 class="review-title">{{review.title}}</h3>
      <div class="review-summary">{{review.summary}}</div>
      <div>
        <span class="review-tags" v-for="tag in review.tags"># {{tag}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      reviews: [
        {
          _id: 1,
          title: '오랜만에 품 갔다온 썰',
          summary: '예전엔 엄청 괜찮았던 것 같은데 최근엔 좀 아닌듯. 가격도 오르고..',
          tags: ['품', '그저그럼','추억']
        },
        {
          _id: 2,
          title: '맘스터치는 맘스터치',
          summary: '맘스터치는 실망시키지 않는다.',
          tags: ['킹갓존엄','싸이버거','존맛','맘스터치']
        },
        {
          _id: 3,
          title: '학식 볶음우동은 언제먹어도..',
          summary: '생각날 때마다 가는데 역시나 맛있다.',
          tags: ['가성비','매운맛도전','학식']
        }
      ]
    }
  }
}
</script>

<style>
.review-header {
  text-align: center;
}
.review-main {
  text-align:center;
}
.review {
  border: 2px solid skyblue;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #ccc;
  margin: 15px 0;
  padding: 8px;
  cursor: pointer;
}
.review-title {
  font-weight: 800;
}
.review-summary {
  margin: 10px;
}
.review-tags {
  color: blue;
  margin: 5px;
}
</style>
```

그 후 이 `Review.vue` 파일을 router 에 등록해주도록 하자.

```js{5,16,17,18,19,20}
// 'router/index.js' 파일
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Review from '../components/Review.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/review',
      name: 'Review',
      component: Review
    }
  ]
})
```

이제, 브라우저의 주소창 (현재는 http://localhost:8080 인 경우가 가장 많을 것이다.) 맨뒤에 /review 를 붙여서 내용이 바뀌는지 확인해보도록 하자!

## Router-Link 사용하기
언제까지고 주소창에 직접 타이핑하며 페이지를 이동할 수는 없다. HTML 을 배울 때 다른 페이지로 이동할 때는 `<a>` 태그를 사용했지만 Vue-router 에서도 똑같은 걸 쓸 수는 없다. 왜냐하면 `<a>` 태그는 무조건 서버에 새로 요청을 넣기 때문에 기껏 JS 로 라우팅하는 보람이 없이 모든 것을 새로 불러오게 된다. 그 외에도 이후에 배울 Vue-router 만의 여러 기능들을 쓸 수 없게 된다. 

그래서 대신 사용하는 것이 `<router-link>` 이다. 우선 이 링크를 적용시킬 곳이 필요하니, `<Navbar />` 컴포넌트를 `App.vue` 파일의 `<router-view />` 의 위쪽에 집어 넣자. 이렇게 하는 이유는 어떤 페이지(경로)로 가든, 언제나 같은 위치에 Navbar 를 자리하게 하고 싶기 때문이다. 컴포넌트 등록하는 것도 잊지 말자! 

```html{8,16,18,19,20}
<!-- App.vue 파일 -->
<template>
  <div>
    <div class="header">
      <h1>성점추</h1>
      <h3 class="subtitle">성대생을 위한 점심 추천 서비스</h3>
    </div>
    <Navbar />
    <div class="app-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  }
  
}
</script>

<style>
.header {
  text-align: center;
}
html, body {
  padding: 0;
  margin: 0;
}
.app-main {
  max-width: 980px;
  margin: 0 auto;
}
</style>
```

그리고 나서 `Navbar.vue` 파일을 아래와 같이 작성하자. ~~복붙하자~~

```html
<!-- Navbar.vue 파일 -->
<template>
  <div class="navbar">
    <ul>
      <router-link tag="li" :to="{name: 'Home'}">홈</router-link>
      <router-link tag="li" :to="{name: 'Review'}">리뷰</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.navbar {
  padding: 10px;
  color: white;
  font-size: 20px;
  background-color: skyblue;
}

ul {
  list-style: none;
  text-align: center;
}

ul li {
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
}

</style>
```

`Navbar.vue` 파일에서 처음보는 태그를 발견할 수 있을 것이다.

`<router-link tag="li" :to="{name: 'Home'}">홈</router-link>`

어렵게 생각하지 말자. 그냥 Vue-router 에서 `<a>` 대신 사용하는 코드로, `tag="li"` 는 지금 작성한 건 `<router-link>` 이지만 겉보기엔 `<li>` 인 것처럼 쓰고 싶다는 것이고(이게 없어도 정상 작동한다. `<li>` 대신 `<a>` 로 렌더링될 뿐), 좀 복잡해 보이는 `:to="{name: 'Home'}"` 도 해석하면 name 을 'Home' 으로 등록했던 경로로 가고 싶다는 것이다. `:`, 즉 `v-bind` 를 이용해서 자바스크립트 코드를 썼다는 것에만 유의하자. `router/index.js` 파일에 가보면 우리가 등록했던 name 을 확인할 수 있다.

이제 브라우저로 이동해서 Navbar 를 각각 클릭해보면 다음과 같은 결과물을 확인할 수 있다.

<img src="/images/HomeRoute.png" width="430px "/>
<img src="/images/ReviewRoute.png" width="430px" />

## '/review/:id' 에 ReviewDetail.vue 등록하기 (params)
리뷰 하나하나마다 컴포넌트를 일일이 만들 수는 없다. 그래서 어떤 리뷰를 자세히 보고 싶어서 클릭했을 때, '/review/1', '/review/2' 와 같이 경로에서 해당 리뷰의 아이디 값만 달라지게 하고 싶을 수 있다. 그때 이용하는 게 **params** 이다. 단순하게 어떤 컴포넌트를 사용할 때 그 컴포넌트 내에서 사용하기 위해 같이 넘겨주는 값이라 생각하면 된다. 우선 review 목록에서 하나를 클릭했을 때 보여지는 페이지에서 사용할 `ReviewDetail.vue` 파일을 다음과 같이 만들자.

```html
<!-- ReviewDetail.vue 파일 -->
<template>
<div>
  <div class="review-detail-main">
    <h2>Review Detail 페이지 for Review ID: {{$route.params.id}}</h2>
    <div>
      <h3 class="review-title">{{review.title}}</h3>
      <div class="review-summary">{{review.summary}}</div>
      <div>
        <span class="review-tags" v-for="tag in review.tags"># {{tag}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['review']
}
</script>

<style>
.review-detail-main {
  text-align: center;
}
.review-title {
  font-weight: 800;
}
.review-summary {
  margin: 10px;
}
.review-tags {
  color: blue;
  margin: 5px;
}
.backBtn {
  background-color: transparent;
  border: none;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #cccccc;
  cursor: pointer;
  padding: 8px;
  background: skyblue;
  color: white;
}
</style>
```

익숙한 게 눈에 띌 것이다. 바로 `props: ['review']` 이다. 분명 params 와 props 는 영어철자부터 다르지만, 괜히 새로운 것을 따로 배우기 복잡하니, props 쓰듯이 사용할 수 있다. 솔직히 역할이 별 다를 것도 없다. 부모 컴포넌트가 자식 컴포넌트에게 데이터를 넘겨주듯이 params 도 링크를 타고 넘어갈 곳에 데이터를 넘겨주는 것이니까. 그래서 params 로 넘겨받은 것을 props 를 받듯이 쓰겠다고 해놓은 상태다.

대신 `router/index.js` 파일에 `ReviewDetail.vue` 를 등록할 때, params 를 props 처럼 사용할 것이라고 말해주어야 한다. 아래 코드를 참고하자.

```js{6,22,23,24,25,26,27}
// router/index.js 파일
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Review from '../components/Review.vue'
import ReviewDetail from '../components/ReviewDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/review',
      name: 'Review',
      component: Review
    },
    {
      path: '/review/:id', // 정해져있지 않고 변하는 부분은 ':' + '변하는 부분의 params 이름' 으로 해준다.
      name: 'ReviewDetail',
      props: true, // 이거 주의!
      component: ReviewDetail
    }
  ]
})
```

이제 리뷰 목록을 지니고 있는 `Review.vue` 로 가서, `ReviewDetail` 로 경로 이동을 하면서 필요한 정보를 어떻게 넘기는지 보도록 하자. 

```html{10}
<!-- Review.vue 파일 -->
<template>
<div>

  <div class="review-header">
    <h1>리뷰s</h1>
  </div>

  <div class="review-main">
    <router-link :to="{name: 'ReviewDetail', params: {id: review._id, review: review}}" tag="div" class="review" v-for="(review,index) in reviews" :key="index">
      <h3 class="review-title">{{review.title}}</h3>
      <div class="review-summary">{{review.summary}}</div>
      <div>
        <span class="review-tags" v-for="tag in review.tags"># {{tag}}</span>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      reviews: [
        {
          _id: 1,
          title: '오랜만에 품 갔다온 썰',
          summary: '예전엔 엄청 괜찮았던 것 같은데 최근엔 좀 아닌듯. 가격도 오르고..',
          tags: ['품', '그저그럼','추억']
        },
        {
          _id: 2,
          title: '맘스터치는 맘스터치',
          summary: '맘스터치는 실망시키지 않는다.',
          tags: ['킹갓존엄','싸이버거','존맛','맘스터치']
        },
        {
          _id: 3,
          title: '학식 볶음우동은 언제먹어도..',
          summary: '생각날 때마다 가는데 역시나 맛있다.',
          tags: ['가성비','매운맛도전','학식']
        }
      ]
    }
  }
}
</script>

<style>
.review-header {
  text-align: center;
}
.review-main {
  text-align:center;
}
.review {
  border: 2px solid skyblue;
  border-radius: 8px;
  box-shadow: 1px 1px 1px #ccc;
  margin: 15px 0;
  padding: 8px;
  cursor: pointer;
}
.review-title {
  font-weight: 800;
}
.review-summary {
  margin: 10px;
}
.review-tags {
  color: blue;
  margin: 5px;
}
</style>
```

보다시피, div 를 통째로 `<router-link>` 로 바꿔준 후, `tag="div"` 로 겉보기엔 div 태그인 것처럼 한 후에 처음 보는 코드를 적용시켜준다. 

여기에서는 `params: {id: review._id, review: review}` 를 이용하여, id 라는 이름의 params 에는 현재 for 루프를 돌고 있는 review 의 _id 값을, review 라는 이름의 params 에는 review 를 통째로 넣어주고 있음을 알 수 있다. 이 두 개의 params 중에, id 는 `router/index.js` 파일에 설정했듯이 주소창에 표시되는 값으로 쓰이고, review 는 props 처럼 `ReviewDetail.vue` 에서 쓰이게 된다.


<hr style="margin-top: 45px;">

<DisqusNew />