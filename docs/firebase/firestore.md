# Firestore 사용하기

## Firestore 란?

Firestore 는 Firebase 에서 사용하는 데이터베이스로, **쉽다.** 

<img src="/images/easy.jpg" width="350px">

왜 쉽다고 말하냐면, 웹사이트 상에서 직접 눈으로 보면서 작업이 가능하기 때문이다! 이전 섹션이었던 [세팅하기](./start.md "세팅하기 링크") 에서 데이터베이스를 생성했을 때 나왔던 작업창은 실시간으로 Firestore 의 변경사항을 반영해서 나타내줄 뿐만 아니라, 웹사이트에서 직접 내용을 채워넣을 수 있다. **즉, 내가 삽질하고 있는 게 아닌지 실시간으로 확인, 수정이 가능하다!** ~~우와~~

그럼 *성점추* 프로젝트에서 Firestore를 사용해보자.

## 기존의 하드코딩 데이터 살펴보기

*성점추* 프로젝트의 `Review.vue` 파일에서 Firestore 를 이용해보자. 원래 코드 상에서는 화면에 표시할 리뷰와 관련된 내용을 하드코딩해서 사용하고 있었다. 여기서 *하드코딩* 이란 아래의 `reviews` 처럼 데이터 내용을 손으로 일일이 작성했다는 뜻이다. 

```js{10}
// Review.vue 파일 내 data() 내용
export default {
  data () {
    return {
      title: null,
      content: null,
      tags: [],
      feedback: null,
      anotherTag: null,
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
  },
```

그럼 이 하드코딩된 데이터를 그대로 Firebase 로 옮기면 어떨까? 즉, `Review.vue` 파일 내 `reviews` 데이터를 비어있는 Array `[]` 로 바꾸고, 그 내용을 Firestore 에서 가져오는 것이다. 

## Firestore 에 데이터 채워넣기

* Firestore 는 
  1. Collection
  1. Document
  1. Fields

의 순서로 단위가 작아진다. 다시 말해, Collection 이 여러 Document 를 가지고 있고, Document 는 여러 Fields 를 가지고 있다.


Firebase 의 Database 탭에 들어가 **reviews** 라는 *collection* 을 생성해주자. 


<img src="/images/firebase10.png">

그리고 나서, *document* 안에 들어갈 field 들을 다음과 같이 채워준다. 어렵게 생각할 필요 없이, 하나의 *Document* 가 기존의 하드코딩되어 있던 reviews 내 하나의 객체이고, 각 field 가 그 객체 내 key 값이고, 그 뒤 값이 value 값이라고 생각하면 된다. **_id** 값은 원래 구분하려고 만들었던 값이니, Firestore 의 **Auto-ID** 기능을 이용해보도록 하고 따로 Field 를 만들지 않았다. 

<img src="/images/firebase11.png">

원하는 만큼 **Add Document** 한 이후의 결과 모습은 다음과 같다. 

<img src="/images/firebase12.png">

## Firestore 의 데이터 가져오기

그럼 이제 이 Firestore 내 데이터를 *성점추* 프로젝트로 가져와보자. 우선 이전의 `firebase/init.js` 파일에서 firebase 세팅을 가져와야 한다. `import db from '@/firebase/init.js'` 를 이용해 **db** 라는 이름으로 해당 세팅을 가져오자.

```js{2,11}
// Review.vue 파일
import db from '@/firebase/init.js'
export default {
  data () {
    return {
      title: null,
      content: null,
      tags: [],
      feedback: null,
      anotherTag: null,
      reviews: [] // reviews 를 빈 Array 로 만들어놨다.
    }
  },
```

:::warning Question
**@는 뭐죠?**: 사실 firebase 에 대한 내용을 쓰면서 기존의 *성점추* 프로젝트를 **webpack-simiple** 에서 **webpack** 으로 옮겼다(복붙했다).. webpack 으로 생성한 프로젝트는 어디에서 경로를 쓰든 **@** 가 **src** 폴더를 가리키게 된다. webpack-simple 을 쓰고 있는 경우라면 여전히 상대경로로 지정해주어야 하므로, `../firebase/init.js` 라고 해주어야 정상 작동할 것이다. 
:::

#### 데이터를 가져오는 시점 

데이터를 Firestore 에서 가져오는 시점은 빠르면 빠를수록 좋다. 사실 Vue 의 각각의 컴포넌트에는 몇개의 **시점** 이 정해져 있고, 그 시점마다 어떤 일을 처리하도록 할 수 있다. 이 시점들의 모음을 Vue 의 Life Cycle Hooks 이라고 하고, 순서는 아래와 같다. 

* Vue Life Cycle Hooks
  1. beforeCreate
  1. created
  1. beforeMount
  1. mounted
  1. beforeUpdate
  1. updated
  1. beforeDestroy
  1. destroyed

자세한 내용이 궁금하다면 [공식문서](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram "LifeCycle 링크") 를 참고하도록 하자. 아무튼 우리는 **created** 의 시점, 즉 created hook 에 firestore 에 접근해서 데이터를 가져올 것이다. 

:::tip
**created** 는 컴포넌트가 막 생성되기 시작한 때로, 아직 `<div>` 같은 DOM 요소를 그리기도 전이다. 참고로 DOM 요소가 그려진 직후의 시점은 **mounted** 시점이다. 
:::

아래와 같이 created hook 을 작성해보자. 그 시점에 발동하는 함수를 만든다고 생각하면 되고, 아래처럼 작성할 경우 created 시점에 '시작!' 이라는 문자열을 로그로 기록한다.

```js{14,15,16}
// Review.vue 파일
import db from '@/firebase/init.js'
export default {
  data () {
    return {
      title: null,
      content: null,
      tags: [],
      feedback: null,
      anotherTag: null,
      reviews: []
    }
  },
  created () {
    console.log('시작!')
  },
```

그럼 이제 Firestore 에 접근해보자! Firestore 의 구조는 

**1**. Collection

**2**. Document

**3**. Fields 

의 단계로 이루어져 있고, 각 단계에서 CRUD 를 할 수 있다.

**1**. set() - CREATE

**2**. get() - READ

**3**. update() - Update

**4**. delete() - Delete

더 설명하기 보다, Firestore 에서 데이터를 가져오는 완성코드를 먼저 보자.

```js{14,15,16,17,18,19,20,21,22,23}
// Review.vue 파일
import db from '@/firebase/init.js'
export default {
  data () {
    return {
      title: null,
      content: null,
      tags: [],
      feedback: null,
      anotherTag: null,
      reviews: []
    }
  },
  created () {
    db.collection('reviews').get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        let review = doc.data()
        review._id = doc.id
        this.reviews.push(review)
      })
    })
  },
```

* created 안의 내용을 분석해보자.

  1. `db.collection('reviews')` 로 'reviews' collection 에 접근한다. (해당 위치에 대한 Reference 를 얻는다.)

  1. `.get()` 을 통해 앞서 말한 위치의 데이터를 얻는다. 위 경우에는 reviews collection 이 가지고 있는 모든 document 를 가지고 오게 된다.

  1. `.then()` 을 통해 Firestore 에서 데이터를 다 가져올 때까지 기다린다. 

  :::warning
  `.then()` 에 대해 전혀 아는 게 없다면 javascript 의 Promise 에 대한 개념을 공부하도록 하자. 쉽게 말하면,`.then` 앞에 쓴 일을 제대로 처리할 때까지 기다렸다가 그 다음에 다른 걸 하겠다는 거다.
  :::

  4. Firestore 에서 결과값을 받아오면, 그 결과값에 **snapshot** 이란 이름을 붙인다. 아까 우리가 Firestore 채워 넣었던 *Document* 의 개수가 3개였기 때문에, 이 snapshot 은 3개의 Document 를 지니고 있을 것이다.

  5. 이 snapshot 에 `forEach` 를 돌려 각각의 요소를 가지고 무엇을 할 지 설정한다. 각각의 Document 를 *doc* 라고 이름 붙이자. 이 doc 안의 값을 가져오려면 `doc.data()` 라고 해서 data 를 가져오는 메소드를 실행시켜주어야 한다. 이렇게 얻은 document 내용을 `let review = doc.data()` 를 통해 그대로 `review` 라는 변수에 집어넣어 주면 `review` 는 한 Object 가 되고, `review._id = doc.id` 라고 해줌으로써 `review` 의 `_id` key 에 Firestore 에서 **Auto-ID** 로 형성했던 key 값을 넣어준다. 이 때 review 라는 변수는 다음과 같은 형태의 객체를 가지고 있을 것이다.

  ```js
  {
    title: 'Firebase 에 입력했던 title',
    summary: 'Firebase 에 입력했던 summary',
    tags: ['태그1','태그2'],
    _id: 'Tdoaek1Zs6sPiWak52o8 같은 Firebase 에서 자동 생성된 ID 값'
  }
  ```

  6. 마지막으로 `this.reviews.push(review)` 를 통해, 이 `Review.vue` 컴포넌트의 data 내의 reviews 라는 빈 Array 에 위 review 를 하나씩 밀어넣어 준다.

  7. 제대로 따라왔다면 다음과 같이 제대로 출력되는 것을 볼 수 있다!!

  <img src="/images/firebase14.png">

## Firestore 에 데이터 추가하기

코드를 통해 데이터를 가져오는 데 성공했으니, 이제 추가하는 데 도전해보자. 우선 추가할 값을 입력 받을 수 있는 `<input>` 태그를 몇 개를 포함하는 `<form></form>` 태그를 만들어야 한다. `Review.vue` 파일의 `<template>` 태그 내용을 다음과 같이 수정하자. `<form>` 태그를 포함한 `<div>` 하나가 추가되었다.

```html{19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42}
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
          <span class="review-tags" v-for="(tag, index) in review.tags" :key="index"># {{tag}}</span>
        </div>
      </router-link>
    </div>

    <div class="review" style="text-align:center;">
      <form>
        <h2 class="">새로운 리뷰</h2>

        <div>
          <label for="title">제목</label>
          <input type="text" name="title">
        </div>

        <div>
          <label for="content">내용</label>
          <input type="text" name="content">
        </div>

        <div>
          <label for="tag">태그</label>
          <input type="text" name="tag">
        </div>

        <div>
          <button>추가하기</button>
        </div>
      </form>
    </div>
  </div>
</template>
```

그럼 이제 각각의 `<input>` 태그들을 Vue 의 data 프로퍼티와 `v-model` 로 연결하자. 그리고 입력 받을 값 중 태그(Tag)의 경우 여러 개의 태그를 입력받아 Array 형식으로 보관해야 하니, 태그와 관련된 `<input>` 태그에서 *Tab* 키를 눌렀을 때, `addTag` 라는 함수가 시행되도록 해보자. 

```html{25,30,35,71,72,73,74,75,76,77,78,79}
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
        <span class="review-tags" v-for="(tag, index) in review.tags" :key="index"># {{tag}}</span>
      </div>
    </router-link>
  </div>

  <div class="review" style="text-align:center;">
    <form>
      <h2 class="">새로운 리뷰</h2>

      <div>
        <label for="title">제목</label>
        <input type="text" name="title" v-model="title">
      </div>

      <div>
        <label for="content">내용</label>
        <input type="text" name="content" v-model="content">
      </div>

      <div>
        <label for="tag">태그</label>
        <input type="text" name="tag" @keydown.tab.prevent="addTag" v-model="anotherTag">
      </div>

      <div>
        <p v-if="feedback" style="color: red;">{{feedback}}</p>
        <button>추가하기</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import db from '@/firebase/init.js'
export default {
  data () {
    return {
      title: null,
      content: null,
      tags: [],
      anotherTag: null,
      reviews: []
    }
  },
  created () {
    db.collection('reviews').get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        let review = doc.data()
        review._id = doc.id
        this.reviews.push(review)
        console.log(review)
      })
    })
  },
  methods : {
    addTag () {
      if (this.anotherTag) {
        this.tags.push(this.anotherTag)
        this.anotherTag = null
        this.feedback = null
      } else {
        this.feedback = '태그내용을 입력하세요'
      }
    }
  }
}
</script>
```

`@keydown.tab.prevent` 라는 코드는, 해당 `<input>` 태그에서 tab 키를 눌렀을 때의 이벤트를 감지한다. `.prevent` 라는 건 event modifier 의 일종으로, 기존의 키의 기능을 막는다. 이 경우 본래 tab 의 기능인 다음 섹션으로 넘어가주는 기능을 막아준다.

아무튼 `addTag()` 라는 함수는 이제 발생할 때마다 `tags` 프로퍼티에 현재 작성된 태그를 밀어넣는 역할을 하게 된다.

그럼 이제 Firestore 에 데이터를 추가하는 코드를 작성해보자. 일단 `<form>` 태그 안의 버튼이 눌러졌을 때, 원래 **Submit** 이라는 이벤트가 발생한다. 이건 딱히 Vue 에서만 발생하는 것이 아니라, 본래 HTML 의 규칙이다. 그런데 이 Submit 이라는 이벤트는 기본적으로 화면을 새로고침해버린다. 우린 그걸 원하지 않기 때문에, `<form>` 태그에서 Submit 이벤트를 수신하고, 그 기존 기능을 막고(prevent) 우리가 원하는 함수가 시행되도록 해야한다. 이를 위한 코드는 `@submit.prevent="addReview"` 로, `addReview` 라는 함수가 대신 시행되도록 한다.

그럼 이제 `addReview` 에 들어가야되는 내용을 살펴보자. 

```js
// Review.vue 파일 내 methods 중 하나
addReview () {
  if (this.title) {
    this.feedback = null
    db.collection('reviews').set({
      title: this.title,
      summary: this.content,
      tags: this.tags
    })
    .then((data) => {
      this.reviews.push({
        title: this.title,
        summary: this.summary,
        tags: this.tags
      })
      this.title = null
      this.summary = null
      this.tags = null
    })
  } else {
    this.feedback = '제목을 입력해주세요!'
  }
},
```

* 위 함수를 분석해보자. 

  1. 먼저 `if(this.title)` 문을 통해, title 값이 입력된 경우에만 함수가 제대로 시행되고, 아니면 `this.feedback` 값을 통해 제목을 요청하도록 했다.

  1. 만약 제목이 존재한다면, 혹시 feedback 값이 있을 경우 `null` 로 되돌린다.

  1. `db.collection('reviews')` 를 통해 Firestore 의 **reviews** Collection 에 접근한다. (해당 위치의 Reference 를 얻는다.)

  1. `.set()` 을 통해, 해당 위치에 값을 집어 넣는다. 집어넣는 값은 위에서 `<input>` 태그를 통해 입력받은 값들로, 각각 title, summary, tags 라고 이름 붙여 집어넣는다.

  1. `.then()` 을 통해 Firestore 에 제대로 입력이 될 때까지 기다린 후에, `this.reviews.push()` 를 통해 현재 Vue 컴포넌트 내의 reviews 도 업데이트 해준다.

  1. 이후 관련 데이터 값을 전부 `null` 값으로 변경시켜 리셋시켜준다.

:::tip
먼저 Vue 컴포넌트 내 data 값을 업데이트하고 Firestore 에 업데이트를 해도 상관없다. 다만 이 경우 만약 Firestore 에 데이터를 추가하는 데 실패하면, 다시 되돌리는 과정이 필요하다. 오류가 났을 때 무엇을 할 지는 `.catch()` 내에서 처리한다. 무슨 말인지 모르겠으면 javascript 의 Promise 를 공부하자.
:::

`<style>` 태그 내 CSS 값까지 모두 추가한 `Review.vue` 파일의 모습은 다음과 같다.

```html
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
        <span class="review-tags" v-for="(tag, index) in review.tags" :key="index"># {{tag}}</span>
      </div>
    </router-link>
  </div>

  <div class="review" style="text-align:center;">
    <form @submit.prevent="addReview">
      <h2 class="">새로운 리뷰</h2>

      <div>
        <label for="title">제목</label>
        <input type="text" name="title" v-model="title">
      </div>

      <div>
        <label for="content">내용</label>
        <input type="text" name="content" v-model="content">
      </div>

      <div>
        <label for="tag">태그</label>
        <input type="text" name="tag" @keydown.tab.prevent="addTag" v-model="anotherTag">
      </div>

      <div>
        <p v-if="feedback" style="color: red;">{{feedback}}</p>
        <button>추가하기</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import db from '@/firebase/init.js'
export default {
  data () {
    return {
      title: null,
      content: null,
      tags: [],
      feedback: null,
      anotherTag: null,
      reviews: []
    }
  },
  created () {
    db.collection('reviews').get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        let review = doc.data()
        review._id = doc.id
        this.reviews.push(review)
        console.log(review)
      })
    })
  },
  methods : {
    addReview () {
      if (this.title) {
        this.feedback = null
        db.collection('reviews').add({
          title: this.title,
          summary: this.content,
          tags: this.tags
        })
        .then((data) => {
          this.reviews.push({
            title: this.title,
            summary: this.summary,
            tags: this.tags
          })
          this.title = null
          this.summary = null
          this.tags = null
        })
      } else {
        this.feedback = '제목을 입력해주세요!'
      }
    },
    addTag () {
      if (this.anotherTag) {
        this.tags.push(this.anotherTag)
        this.anotherTag = null
        this.feedback = null
      } else {
        this.feedback = '태그내용을 입력하세요'
      }
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

그리고 화면에 출력되는 모습은 다음과 같다.

<img src="/images/firebase15.png">

## Firestore 의 데이터 삭제하기

마지막으로 Firestore 의 데이터를 삭제해보자. 우선 각 리뷰마다 삭제 버튼을 만들어줄 필요가 있다. 아래 코드를 참고해서 버튼을 만들고 위치를 조절해보자. 

```html{2,8}
<div class="review-main">
  <router-link style="position:relative;" :to="{name: 'ReviewDetail', params: {id: review._id, review: review}}" tag="div" class="review" v-for="(review,index) in reviews" :key="index">
    <h3 class="review-title">{{review.title}}</h3>
    <div class="review-summary">{{review.summary}}</div>
    <div>
      <span class="review-tags" v-for="(tag, index) in review.tags" :key="index"># {{tag}}</span>
    </div>
    <button @click="deleteReview(review._id)" style="position:absolute; top:5px; right: 10px;">삭제</button>
  </router-link>
</div>
```

위 코드의 결과물은 다음과 같다.

<img src="/images/firebase16.png">

코드를 보다시피, 삭제 버튼을 클릭했을 때, `deleteReview` 라는 함수가 시행되도록 해놓았고, 그 함수에 인자로 `review._id` 넘겨주고 있음을 확인할 수 있다. 그럼 `deleteReview` 를 살펴보자.

```js
// Review.vue 파일 내 method 중 하나
deleteReview (id) {
  db.collection('reviews').doc(id).delete()
  .then(() => {
    this.reviews = this.reviews.filter((review) => {
      return review._id != id
    })
    alert('삭제되었습니다!')
  })
},
```

* 마찬가지로 함수를 분석해보자.

  1. `db.collection('reviews').doc(id)` 로 Firestore 의 reviews Collection 의, 인자로 받아온 **id** 값을 가진 document 의 reference 를 얻는다. 지금까지와 달리 Collection 에서 멈추지 않고 한 단계 더 들어갔음에 유의하자! 어쨌거나 CRUD 관련 메소드가 시행되기 전까지는 똑같이 참조할 데이터의 위치를 얻는 과정(Reference)이다.

  1. `delete()` 를 이용해 해당 document 를 삭제한다.

  1. `then()` 으로 그 전까지의 처리가 완료될 때까지 기다렸다가, `this.reviews.filter()` 를 통해서 **_id** 프로퍼티가 인자로 받은 **id** 와 같지 않은 요소들만 남긴다. 이래야 Firestore 의 변화 내용을 바로 반영할 수 있다.

  1. `alert` 를 통해 삭제되었음을 알린다.

  여기까지 한 후 삭제 버튼을 눌러보면 다음 이미지와 같이 삭제가 제대로 이루어지는 것을 알 수 있다.

  <img src="/images/firebase17.png" style="margin-top: 10px;">

  그런데 아쉬운 점은, 삭제 버튼을 클릭하는 순간 부모 요소인 `router-link` 로 인해 **ReviewDetail** 페이지로 넘어가버린다는 것이다. 이렇게 자식 요소를 클릭했는데 부모까지 클릭되버리는 현상을 **event propagation** 이라고 한다. 이를 막아주려면 event.stopPropagation() 이라는 메소드를 실행시켜주어야 하는데, Vue 에서는 `.stop()` 이라는 간단한 이벤트 modifier 를 이용할 수 있다. 여기까지 이용해 완성된 `Review.vue` 파일은 다음과 같다.

```html{15}
<template>
  <div>

    <div class="review-header">
      <h1>리뷰s</h1>
    </div>

    <div class="review-main">
      <router-link style="position:relative;" :to="{name: 'ReviewDetail', params: {id: review._id, review: review}}" tag="div" class="review" v-for="(review,index) in reviews" :key="index">
        <h3 class="review-title">{{review.title}}</h3>
        <div class="review-summary">{{review.summary}}</div>
        <div>
          <span class="review-tags" v-for="(tag, index) in review.tags" :key="index"># {{tag}}</span>
        </div>
        <button @click.stop="deleteReview(review._id)" style="position:absolute; top:5px; right: 10px;">삭제</button>
      </router-link>
    </div>

    <div class="review" style="text-align:center;">
      <form @submit.prevent="addReview">
        <h2 class="">새로운 리뷰</h2>

        <div>
          <label for="title">제목</label>
          <input type="text" name="title" v-model="title">
        </div>

        <div>
          <label for="content">내용</label>
          <input type="text" name="content" v-model="content">
        </div>

        <div>
          <label for="tag">태그</label>
          <input type="text" name="tag" @keydown.tab.prevent="addTag" v-model="anotherTag">
        </div>

        <div>
          <p v-if="feedback" style="color: red;">{{feedback}}</p>
          <button>추가하기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init.js'
export default {
  data () {
    return {
      title: null,
      content: null,
      tags: [],
      feedback: null,
      anotherTag: null,
      reviews: []
    }
  },
  created () {
    db.collection('reviews').get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        let review = doc.data()
        review._id = doc.id
        this.reviews.push(review)
        console.log(review)
      })
    })
  },
  methods : {
    deleteReview (id) {
      db.collection('reviews').doc(id).delete()
      .then(() => {
        this.reviews = this.reviews.filter((review) => {
          return review._id != id
        })
        alert('삭제되었습니다!')
      })
    },
    addReview () {
      if (this.title) {
        this.feedback = null
        db.collection('reviews').add({
          title: this.title,
          summary: this.content,
          tags: this.tags
        })
        .then((data) => {
          this.reviews.push({
            title: this.title,
            summary: this.summary,
            tags: this.tags
          })
          this.title = null
          this.summary = null
          this.tags = null
        })
      } else {
        this.feedback = '제목을 입력해주세요!'
      }
    },
    addTag () {
      if (this.anotherTag) {
        this.tags.push(this.anotherTag)
        this.anotherTag = null
        this.feedback = null
      } else {
        this.feedback = '태그내용을 입력하세요'
      }
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
이제 삭제버튼을 클릭해도 **ReviewDetail** 로 넘어가지 않는 것을 확인할 수 있다. 

<img src="/images/firebase18.png">

## Firestore CRUD 마무리

Firestore 를 위한 CRUD 액션 중에서 `update()` 가 하나 남았지만 이건 그냥 Collection 에서 원하는 Document 로 한 단계 더 들어가서, `set()` 과 유사하게 사용하면 된다. 

그러므로 이제 Firestore 을 사용할 준비가 끝났다! :tada: 뭐 대단한 걸 배운건가 싶겠지만 이제 원하는 데이터를 삽입하고 삭제하고 수정할 수 있는 **데이터베이스**가 생겼다. 그것도 **단 한 줄의 백엔드 코드 없이!** Firestore 와 Firebase 에는 지금까지 배운 것보다 훨씬 더 많은 기능이 있고 이를 잘 활용하면 손쉽게 서비스를 개발할 수 있을 것이다. ~~이제 어디가서 웹개발 할 줄 안다고 해도 된다.~~

<img src="/images/clap.jpg">


<hr style="margin-top: 45px;">

<DisqusNew />