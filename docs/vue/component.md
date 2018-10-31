# 나의 첫 Vue 컴포넌트 만들기

## 어디에 컴포넌트를 만들 것인가

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

우선 2번의 경우, 자바스크립트 최신 문법인 ES6에서 쓰는 함수 형식으로, 본래의 것과 동일하다. 앞서 폴더구조를 설명할 때 말했듯이, `babel` 의 도움으로 우리는 ES6 자바스크립트 문법을 마음껏 쓸 수 있다. 훨씬 짧으니까 익숙해지도록 하자.

그리고 1 번의 경우, **그냥 외우거나**, 굳이 이해하는 두 가지 방법이 있다. 이해하는 것을 택했다면, 자바스크립트의 `Object` 는 `Primitive type` 이 아닌 `Reference Type` 라는 것을 떠올리자. 앞으로 우리는 컴포넌트를 여러 군데에서 반복해서 쓸텐데, `data` 부분을 공유한다면 하나의 블록을 바꾸면 모든 블록이 함께 바뀌는 참사가 일어날 것이다. 따라서, 함수 형태로 사용할 `data` 를 필요할 때마다 새로 `return` 해주어야만 개별적으로 `data` 를 가질 수 있다.

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

에러 메시지를 잘 읽어보면 **Component template should contain exactly one root element** 라는 문구가 보일 것이다. 이건 어쩔 수 없이 외우자. 하나의 컴포넌트는 하나의 루트 element 로 감싸져 있어야 한다. 그래서 그냥 `<div>` 태그로 전체를 감싸보면,

<img src="/images/firstComp2.png" width="300px"> <br>

의 결과가 제대로 나오는 것을 확인할 수 있다. 

이제 새로운 환경에서 컴포넌트를 만드는 데 성공했으니 다음 단계로 넘어가자!