# 컴포넌트 이해하기

## 나의 첫 컴포넌트 만들기

복잡하게 생각하기 싫다면, `.vue` 확장자 파일 하나하나가 하나의 컴포넌트라고 생각하면 된다. 프로젝트를 만들었을 때 주어진 `App.vue` 파일의 내용을 모두 삭제하고 아래와 같이 틀만 남겨 보자. 

```html
<template>
</template>

<script>
  export default {
      
  }
</script>

<style>
</style>
```

그리고 나서 간단한 컴포넌트를 만들어 보자.

```html
<template>
  <p>오늘의 날씨는 {{weather}} 입니다.</p>
</template>

<script>
  export default {
    data () {
      return {
        weather: '맑음'
      }
    }
  }
</script>
```
제대로 `npm run dev` 가 돌아가고 있다면 결과는 아래와 같다.

<img src="/images/firstComp.png" width="250px;"> <br>

* 이전에 복습을 제대로 했다면 코드에서 이상한 점이 2가지 눈에 띌 것이다. 

  1. `data: {}` 의 단순한 형식이었던 `data`부분이 `return` 이 있는 함수가 되었다.

  1. 그 함수 모양이 `data: function() { return }` 이 아닌, 많이 생략된 모양이다.

우선 2번의 경우, 자바스크립트 최신 문법인 ES6에서 쓰는 함수 형식으로, 본래의 것과 동일하다. 앞서 폴더구조를 설명할 때 말했듯이, `babel` 의 도움으로 우리는 ES6 자바스크립트 문법을 마음껏 쓸 수 있다. 훨씬 짧고 좋으니까 익숙해지도록 하자.

그리고 1 번의 경우, **그냥 외우거나**, 굳이 이해하는 두 가지 방법이 있다. 이해하는 것을 택했다면, 자바스크립트의 `Object` 는 `Primitive type` 이 아닌 `Reference Type` 라는 것을 떠올리자. 앞으로 우리는 컴포넌트를 여러군데에서 반복해서 쓸텐데, `data` 부분을 공유한다면 하나의 블록을 바꾸면 모든 블록이 함께 바뀌는 참사가 일어날 것이다. 따라서, 함수 형태로 사용할 `data` 를 필요할 때마다 새로 `return` 해주어야만 개별적으로 `data` 를 가질 수 있다.

이제 위에서 만든 컴포넌트에 method 추가하고, 그 method 를 실행시킬 수 있는 버튼을 추가하자. 

```html
<template>
  <p>오늘의 날씨는 {{weather}} 입니다.</p>
  <hr>
  <button @click="changeWeather">날씨 업데이트</button>
</template>

<script>
  export default {
    data () {
      return {
        weather: '맑음'
      }
    },
    methods: {
      // 여기도 ES6 축약형으로 함수 작성 가능
      changeWeather () {
        this.weather = '흐림'
      }
    }
  }
</script>
```

실행시켜보면, <span style="color:red">Error</span> 가 뜬다. 

에러 메시지를 잘 읽어보면 **Component template should contain exactly one root element** 라는 문구가 보일 것이다. 즉, 하나의 컴포넌트는 하나의 루트 element 로 감싸져 있어야 한다. 그래서 아래와 같이 `<div>` 태그로 전체를 감싸보면,

```html
<template>
  <div>
    <p>오늘의 날씨는 {{weather}} 입니다.</p>
    <hr>
    <button @click="changeWeather">날씨 업데이트</button>  
  </div>
</template>
```



<img src="/images/firstComp2.png" width="350px"> <br>
의 결과가 제대로 나오는 것을 확인할 수 있다. 

:::tip Question
왜 하나의 Root element 로 감싸야 하나요?
:::

 ~~그냥 외워라~~ 우리는 **하나의** 블록을 만드는 건데, 제대로 감싸지 않으면 블록이 아닌 모래를 쌓는 것이라 생각하면 좋다.

:::tip
`.vue` 파일을 만들자마자, `<template></template>` 태그 안에 `<div></div>` 를 집어넣고 시작하는 습관을 들이면 좋다.
:::

## 컴포넌트 폴더 만들기

컴포넌트의 목적은 **원하는 곳에 반복해서 사용할 수 있기 위해서** 이다. 

그런데 위에서 우리가 만든 컴포넌트는 반복할 수 없다. 왜냐면 현재 우리가 코드를 작성한 파일이 `App.vue` 라는 **Root Component** 이기 때문이다.

<img src="/images/mainjs.png" width="300px"><br>

위 이미지에서 보다시피, 프로젝트 내 유일한 `.js` 파일인 `main.js` 파일은 `App.vue` 파일을 가져와서 `render:` 라는 Vue 프로퍼티에 집어 넣는다. 여기서 `render:` 가 무엇인지 정확히 이해할 필요는 없고, 단어 의미 그대로 `App.vue` 파일을 화면에 그려준다고 생각하면 된다. 

:::tip el: '#app' 은 뭔가요?
처음에 Vue 를 배웠을 때 했다시피, 어느 태그에 Vue 로 만든 것들을 덮어씌울지 타겟 엘리먼트(element) 를 정해주어야 하고, 여기에선 그 타겟이 css selector 로 `'#app'`, 즉 `index.html` 파일 안에 있는 id 가 app 인 div이다. 
::: 

다시 말해, **오직** `App.vue` 파일만이 화면에 그려진다. 그렇기 때문에 다른 모든 `.vue` 파일은 `App.vue` 파일에 어떻게든 연결되어야만 화면에 그려질 수 있다. 이렇게 모든 `.vue` 파일의 부모가 되는 `App.vue` 파일을 **Root Component** 라고 부른다. 

`Root Component`는 필요할 때마다 교체할 수 있는 **블럭**이라기 보다는 모든 블럭이 놓여질 **장소**에 가깝다. 

그렇기 때문에 `src` 폴더 아래에 `components` 라는 폴더를 새로 만들고, 그곳에 지금까지 만들었던 컴포넌트를 옮겨 적도록 하자. 이름은 마음대로 해도 좋으나, 일반적으로 그 역할과 관련된, 대문자로 시작하는 이름을 짓는다. 예시로는 `Weather.vue` 를 썼다. 

<img src='/images/componentsfolder.png' width="300px;" />
<br>

## 컴포넌트 사용하기

모든 코드를 옮기고 `App.vue` 폴더가 다시 껍데기만 남게 되면, 당연하게도 화면에는 아무것도 그려지지 않는다. 이전처럼 화면에 컴포넌트가 그려지게 하려면 `Weather.vue` 파일을 `App.vue` 파일로 가지고 와서 써야 한다. 

`main.js` 파일을 참고해서 `Weather.vue` 파일을 가져오는 코드를 `App.vue` 파일 내에 작성한 후, 가져온 `Weather` 을 컴포넌트로 등록하도록 하자. 아래 예시에서는 `cmp-weather` 라는 이름으로 등록했지만 원하는 이름으로 등록해도 되며, 단순히 `Weather` 이라고 등록할 경우 자동으로 `Weather` 의 이름으로 등록된다.

```html
<script>
import Weather from './components/Weather'
export default {
  // 's' 복수형임에 주의
  components: {
    'cmp-weather': Weather
  },
}
</script>
```

이렇게 등록을 마치면, 이제 원하는 곳에 일반 태그처럼 반복적으로 사용할 수 있다.

```html
<template>
  <div>
    <!-- 꼭 / 로 닫아주도록 한다. -->
    <cmp-weather />
    <cmp-weather />
  </div>
</template>
```
## 부모 컴포넌트 > 자식 컴포넌트로 대화하기 (데이터 전달하기)

아무런 variation 없이 단순 반복하기보다, 부모 컴포넌트(App.vue) 가 자식 컴포넌트(Weather.vue) 에게 사용할 데이터를 넘겨주고, 자식 컴포넌트는 그 데이터를 토대로 화면을 그릴 수 있다면 좋을 것이다. 이 경우 자식 컴포넌트에서는 어떤 이름의 데이터를 부모로부터 받아올지를 `props` 라는 프로퍼티에 명시한다. 아래 예시에서는 'weather' 과 'date' 를 부모로부터 받기로 했음을 알 수 있다. 

```html
<template>
  <div>
    <p>{{date}} 의 날씨는 {{weather}} 입니다.</p>
    <hr>
    <button @click="changeWeather">날씨 업데이트</button>
  </div>
</template>

<script>
  export default {
    props: ['weather','date'],
    data () {
      return {
        
      }
    },
    methods: {
      // 여기도 ES6 축약형으로 함수 작성 가능
      changeWeather () {
        this.weather = '흐림'
      }
    }
  }
</script>

<style>
</style>
```

그럼 부모 컴포넌트(App.vue) 에서는 자식에게 어떻게 데이터를 넘겨줄까? Vue 기본 문법 때 배웠듯이, 어떤 태그에 원하는 속성을 부여하려면 `v-bind` 를 사용하면 된다. 아래 예시에서는 축약형인 `:` 를 사용했다.

```html
<template>
  <div>
    <cmp-weather v-for="selectOne in weatherData" :weather="selectOne.weather" :date="selectOne.date"></cmp-weather>
  </div>
</template>

<script>
import Weather from './Weather'
export default {
  components: {
    'cmp-weather': Weather
  },
  data () {
    return {
      weatherData: [
        {weather: '맑음', date: '오늘'},
        {weather: '흐림', date: '내일'},
        {weather: '우박', date: '모레'},
        {weather: '안개', date: '다음주'},
        {weather: '눈', date: '내년'},        
      ]
    }
  }
}
</script>
```

위와 같이 작성할 경우, 현재 부모 컴포넌트(App.vue) 가 가지고 있는 `data` 인 **weatherData** 가 v-for 을 통해 하나씩(selectOne) 자식 컴포넌트에게 부여되고, 그 하나마다 존재하는 프로퍼티인 `weather` 과 `date` 가 각각 자식 컴포넌트(Weather.vue) 가 받고자 하는 weather, date `props` 에 분배되고 있음을 알 수 있다. 코드의 실행결과는 아래와 같다. 

<img src="/images/vforchild.png" width="300px" />