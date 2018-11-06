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

그리고 1 번의 경우, **그냥 외우거나**, 굳이 이해하는 두 가지 방법이 있다. 이해하는 것을 택했다면, 자바스크립트의 `Object` 는 `Primitive type` 이 아닌 `Reference Type` 라는 것을 떠올리자. 앞으로 우리는 컴포넌트를 여러군데에서 반복해서 쓸텐데, `data` 부분을 공유한다면 하나의 블록을 바꾸면 모든 블록이 함께 바뀌는 참사가 일어날 것이다. 따라서, `data` 를 함수 형태로 만들어서 필요할 때마다 새로 `return` 해주어야만 개별적으로 `data` 를 가질 수 있다.

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

## 루트 컴포넌트 & 컴포넌트 폴더 만들기

컴포넌트의 목적은 **원하는 곳에 반복해서 사용할 수 있기 위해서** 이다. 

그런데 위에서 우리가 만든 컴포넌트는 반복할 수 없다. 왜냐면 현재 우리가 코드를 작성한 파일이 `App.vue` 라는 **Root Component** 이기 때문이다.

<img src="/images/mainjs.png" width="300px"><br>

위 이미지에서 보다시피, 프로젝트 내 유일한 `.js` 파일인 `main.js` 파일은 `App.vue` 파일을 가져와서 `render:` 라는 Vue 프로퍼티에 집어 넣는다. 여기서 `render:` 가 무엇인지 정확히 이해할 필요는 없고, 단어 의미 그대로 `App.vue` 파일을 화면에 그려준다고 생각하면 된다. 

:::tip el: '#app' 은 뭔가요?
처음에 Vue 를 배웠을 때 했다시피, 어느 태그에 Vue 로 만든 것들을 덮어씌울지 타겟 엘리먼트(element) 를 정해주어야 하고, 여기에선 그 타겟이 css selector 로 `'#app'`, 즉 `index.html` 파일 안에 있는 id 가 app 인 div이다. 
::: 

다시 말해, **오직, 그리고 항상** `App.vue` 파일이 화면에 그려진다. 그렇기 때문에 다른 모든 `.vue` 파일은 `App.vue` 파일에 어떻게든 연결되어야만 화면에 그려질 수 있다. 이렇게 모든 `.vue` 파일의 부모가 되는 `App.vue` 파일을 **Root Component** 라고 부른다. 

`Root Component`는 필요할 때마다 교체할 수 있는 **블럭**이라기 보다는 모든 블럭이 놓여질 **장소**에 가깝다. 

그렇기 때문에 `src` 폴더 아래에 `components` 라는 폴더를 새로 만들고, 그곳에 지금까지 만들었던 컴포넌트를 옮겨 적도록 하자. 이름은 마음대로 해도 좋으나, 일반적으로 그 역할과 관련된, 대문자로 시작하는 이름을 짓는다. 예시로는 `Weather.vue` 를 썼다. 

<img src='/images/componentsfolder.png' width="300px;" />
<br>

## 컴포넌트 사용하기

모든 코드를 옮기고 `App.vue` 폴더가 다시 껍데기만 남게 되면, 당연하게도 화면에는 아무것도 그려지지 않는다. 이전처럼 화면에 컴포넌트가 그려지게 하려면 `Weather.vue` 파일을 `App.vue` 파일로 가지고 와서 써야 한다. 

`main.js` 파일을 참고해서 `Weather.vue` 파일을 가져오는 코드를 `App.vue` 파일 내에 작성한 후, 가져온 `Weather` 을 컴포넌트로 등록하도록 하자. 아래 예시에서는 `cmp-weather` 라는 이름으로 등록했지만 원하는 이름으로 등록해도 되며, 단순히 `Weather` 이라고 등록할 경우 자동으로 `Weather` 의 이름으로 등록된다.

```html
<script>
// main.js 에서는 App.vue 라고 써주었으나, .vue 파일 내에서는 Weather.vue 라고 확장자까지 써주지 않아도 잘 인식한다.
import Weather from './components/Weather'
export default {
  // 's' 복수형임에 주의
  components: {
    // key-vale 쌍 없이 그냥 Weather 만 써도 되며, 그 경우 이름도 Weather이다.
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

이렇게 하나의 컴포넌트가 다른 컴포넌트에서 사용되기 위해 등록되면, 등록된 컴포넌트를 **자식 컴포넌트(Child Component)** 라고 하고, 해당 컴포넌트를 등록해 사용하는 컴포넌트를 **부모 컴포넌트(Parent Component)** 라고 한다.

## 컴포넌트 구조 짜보기 (구상)

이제 간단한 프로젝트를 구상해보자. **성대생을 위한 오늘 점심메뉴 추천** 프로젝트는 어떨까? 여러 선택지 중에 3개 정도를 랜덤하게 뽑아서 제안하는 서비스를 목표로 해보자. 

* 당장 생각하기에 필요한 컴포넌트(기능)는 다음과 같다.
  1. 서비스의 이름을 보여주어야 한다.
  1. 서비스의 다른 페이지로 갈 수 있는 링크가 있는 Navbar 가 필요하다.
  1. 모든 선택지를 보여주고 또 추가나 삭제할 수 있는 기능이 필요하다. 
  1. 선택지 중에서 3개를 골라 보여주는 곳이 필요하다.
  1. 선택지를 추가하거나 삭제하는 데 참고할 수 있게 사람들의 음식점 리뷰를 볼 수 있으면 좋겠다. 
  1. 리뷰에 댓글을 달 수 있으면 좋겠다.

~~다 쓰고 보니 간단하지 않다.~~ 각 기능을 컴포넌트로 만든다고 생각했을 때, 부모 자식 관계를 고려하여 구조를 만들어보자

<img src="/images/projectStructure.png">

프로젝트의 규모에 따라 위처럼 `App.vue` 에 모든 걸 직접적으로 연결해도 되고, 사이에 다른 컴포넌트를 추가해서 보다 기능별 분류를 보다 확실히 해도 된다. 그럼 이제 코드를 짜보자.

## 컴포넌트 구조 짜보기 (코드)

서비스의 이름은 항상 보여야 한다. 그러므로 항상 그려지는 루트 컴포넌트인 `App.vue` 에 만들자. <small>[(루트 컴포넌트?)](#루트-컴포넌트-컴포넌트-폴더-만들기)</small> 물론 따로 `Header.vue` 컴포넌트를 만든 후 `App.vue` 에 컴포넌트로 등록해서 사용해도 된다.

```html
<!-- App.vue 파일 -->
<template>
<div>
  <div class="header">
    <h1>성점추</h1>
    <h3 class="subtitle">성대생을 위한 점심 추천 서비스</h3>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style>
  .header {
    text-align: center;
  }
  .subtitle {
    color: gray;
  }
</style>
```

네이밍 센스가 없으면 *성점추* 같은 어처구니 없는 서비스 이름이 나오기도 한다. 중요한 건 아니니 그냥 넘어가자. ~~마케터가 필요한 이유~~

이제 위에서 구상한대로, 필요한 모든 컴포넌트들을 `<template>` 태그 내 작성하고, `script` 태그 내에도 등록하자. 

```html{8,11,12,13,14,20,21,24,25,26,27}
<!-- App.vue 파일 -->
<template>
<div>
  <div class="header">
    <h1>성점추</h1>
    <h3 class="subtitle">성대생을 위한 점심 추천 서비스</h3>

    <Navbar />
  </div>

  <div class="main">
    <AllChoices />
    <Suggestion />
  </div>

</div>
</template>

<script>
import AllChoices from './components/AllChoices'
import Suggestion from './components/Suggestion'

export default {
  components: {
    // 'AllChoices': AllChoices 와 아래 코드 동일
    AllChoices,
    Suggestion
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>
  .header {
    text-align: center;
  }
  .subtitle {
    color: gray;
  }
</style>

```

물론 우린 아직 `AllChoices.vue` 파일과 `Suggestion.vue` 파일을 아직 만들지 않았다. 그리고 `Review.vue` 와 `Comment.vue` 파일은 다른 페이지에서 필요할 예정이니 아직은 생각하지 말도록 하자. header 와 main 부분을 별도의 `<div>`로 나누는 것도 개인 코드 취향이지만, 나눠 놓는 게 나중에 css 편집할 때 편하다. 

그럼 `AllChoices.vue` 파일과 `Suggestion.vue` 파일을 각각 만들어보자. `AllChoices.vue` 에서는 모든 선택지를 보여 주어야 하고, `Suggestion.vue` 에서는 그 중에서 3개만을 선택적으로 보여주어야 한다. 

아래 코드 예시에서는 거의 동일한 코드를, `Suggestion.vue` 에서만 `v-if` 로 3개만 표시되도록 걸러냈다. `v-if` 의 기준은 해당 데이터 오브젝트의 `selected` 프로퍼티가 `true` 이냐 아니냐의 여부로 만들었다.

```html
<!-- AllChoices.vue 파일 -->
<template>
  <div>
    <h3>모든 선택지</h3>

    <div v-for="choice in choices">
      <span>{{choice.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      choices: [
        {name: '청춘직화', selected: true},
        {name: '품', selected: false},
        {name: '재즈앤라멘', selected: false},
        {name: '쇼타돈부리', selected: true},
        {name: '더닭', selected: false},
        {name: '600주년 학식', selected: true},        
      ]
    }
  }
}
</script>
```
```html
<!-- Suggestion.vue 파일 -->
<template>
  <div>
    <h3>오늘의 추천</h3>

    <div v-for="choice in choices">
      <span v-if="choice.selected == true">{{choice.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      choices: [
        {name: '청춘직화', selected: true},
        {name: '품', selected: false},
        {name: '재즈앤라멘', selected: false},
        {name: '쇼타돈부리', selected: true},
        {name: '더닭', selected: false},
        {name: '600주년 학식', selected: true},        
      ]
    }
  }
}
</script>
```

코드의 결과물은 아래와 같다. (`App.vue` 파일에 class 가 main 인 부분을 가운데 정렬하고 위쪽에 마진을 50px 더 주는 css 코드를 추가했다.)

<img src="/images/codeResult1.png" />

## 부모 컴포넌트 > 자식 컴포넌트로 데이터 전달하기 (Props)
위 코드가 겉보기에는 멀쩡하지만 뭔가 눈에 거슬리는 게 있다. 바로 `AllChoices.vue` 와 `Suggestion.vue` 가 똑같은 데이터(choices: [ ])를 기반으로 쓰고 있는데 코드를 중복해서 쓴다는 것이다. 이건 보기에도 좋지 않지만, **데이터 관리**를 위해서도 좋지 않다. 나중에 선택지를 추가하거나 제거하는 기능을 넣을텐데, 그때마다 각 컴포넌트에서 따로 처리하기보다 **한 곳에서 처리**한 후 그 결과물만 각 컴포넌트에 던져주는 게 훨씬 낫다.

그럼 어디서 처리해주느냐, 바로 두 컴포넌트가 공통적으로 연결되어 있는 **부모 컴포넌트**, 이 경우엔 `App.vue` 파일이다. 부모 컴포넌트(`App.vue`) 가 자식 컴포넌트(`AllChoices.vue`, `Suggestion.vue`) 에게 사용할 데이터를 넘겨주고, 자식 컴포넌트는 그 데이터를 토대로 화면을 그리게 되는 것이다. 

그럼 부모 컴포넌트(App.vue) 에서는 자식에게 어떻게 데이터를 넘겨줄까? Vue 기본 문법 때 배웠듯이, 어떤 태그에 원하는 속성을 부여하려면 `v-bind` 를 사용하면 된다. 아래 예시에서는 축약형인 `:` 를 사용했다.

자식 컴포넌트에서 **choices** 데이터를 모두 삭제하고, `App.vue` 파일에 **choices** 를 data 로 추가한 후, 그 데이터를 `v-bind` 로 넘겨주자.

```html{12,13,30,31,32,33,34,35,36,37}
<!-- App.vue 파일 -->
<template>
<div>
  <div class="header">
    <h1>성점추</h1>
    <h3 class="subtitle">성대생을 위한 점심 추천 서비스</h3>

    <Navbar />
  </div>

  <div class="main">
    <AllChoices :choices="choices" />
    <Suggestion :choices="choices" />
  </div>

</div>
</template>

<script>
import AllChoices from './components/AllChoices'
import Suggestion from './components/Suggestion'

export default {
  components: {
    AllChoices,
    Suggestion
  },
  data () {
    return {
      choices: [
        {name: '청춘직화', selected: true},
        {name: '품', selected: false},
        {name: '재즈앤라멘', selected: false},
        {name: '쇼타돈부리', selected: true},
        {name: '더닭', selected: false},
        {name: '600주년 학식', selected: true},        
      ]
    }
  }
}
</script>

<style>
  .header {
    text-align: center;
  }
  .subtitle {
    color: gray;
  }
  .main {
    margin-top: 50px;
    text-align: center;
  }
</style>
```
그런데 여기까지 한 후 저장하면, 아까처럼 화면에 선택지 리스트가 제대로 뜨지 않는다. 그 이유는, 부모 컴포넌트에서 자식 컴포넌트로 데이터를 보냈을 뿐, 자식 컴포넌트가 부모 컴포넌트에서 데이터를 받는 코드를 아직 작성하지 않았기 때문이다. 

자식 컴포넌트에서는 **어떤 이름**의 데이터를 부모로부터 받아올지를 `props` 라는 프로퍼티에 명시한다. `props` 로 받아온 것을 다시 data 로 등록할 필요는 없다.

```html{14}
<!-- AllChoices.vue 파일과 Suggestion.vue 파일 공통으로 추가되어야 함. -->
<template>
  <div>
    <h3>모든 선택지</h3>

    <div v-for="choice in choices">
      <span>{{choice.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['choices'],
  data () {
    return {
      
    }
  }
}
</script>
```

이제 모든 것이 정상적으로 작동한다. 

:::tip
props 의 이름은 자유롭게 설정할 수 있다. 예를 들어, 위에서 부모 컴포넌트가 가지고 있는 **choices** 데이터를 **parentData** 라는 이름으로 받아오고 싶다면, 자식 컴포넌트에서 `props:['parentData']` 라고 작성하고, 부모 컴포넌트에서 `<ChildComponent :parentData="choices" />` 처럼 전달해주면 된다.
:::

## 자식 컴포넌트 > 부모 컴포넌트로 이벤트 전달하기 (Custom Events)

부모 컴포넌트가 자식 컴포넌트와 관련된 데이터를 관리한다면, 해당 데이터에 변화가 생겼을 때 부모가 그것을 알 수 있어야 한다. 그래야 부모 컴포넌트에서 그 변화에 맞춰 데이터를 변경할 수 있기 때문이다. 

예를 들어, 우리는 현재 `AllChoices.vue` 파일에서 모든 선택지를 화면에 그려주고 있다(Rendering). 그런데 이용자가 어떤 선택지를 클릭했을 때 그 선택지를 목록에서 삭제해주고 싶다면 어떻게 해야될까? 우선 **자식 컴포넌트 내에서 자체적으로 데이터를 변경시켜서는 안된다.** 자식 컴포넌트가 가지고 있는 데이터는 props 로 부모로부터 받아온 것이지, 오리지널 데이터가 아니다. 복제본을 수정해봐야 원본에는 아무 영향이 없는 것이다.

그래서 자식 컴포넌트에서 할 수 있는 일은, **어떤 이벤트(Event)** 가, **누구를 대상**으로 일어났는지 부모한테 보고하는 것이다. 그럼 부모는 그 보고를 받고, 그것에 맞춰 데이터를 수정한다. 위에서 말했듯이 이용자가 클릭하는 이벤트가 발생한다고 생각해보자. 우선 그 클릭 이벤트를 인식하는 이벤트 리스너(Event Listener) 가 정의되어 있어야 한다. `AllChoices.vue` 파일 내 `<span>` 태그에 클릭리스너를 붙이고, 클릭이 발생할 시 **removeAChoice()** 라는 메서드가 동작하도록 하자. 아직 존재하지 않는 함수이므로, `methods` 로도 등록해주어야 한다. 그 다음, **누구를 대상** 으로 일어난 일인지를 **removeAChoice** 의 인자로 넣어준다. `v-for` 문이 choice 라는 이름으로 하나씩 빼내고 있으므로, choice 전체를 인자로 넣어줘도 되고 더 자세히 해주고 싶으면 choice.name 을 넣어줘도 된다. 아래 예시에서는 choice.name 을 넣어주었다. 

```html{7,20,21,22,23,24}
<!-- AllChoices.vue -->
<template>
  <div>
    <h3>모든 선택지</h3>

    <div v-for="choice in choices">
      <span @click="removeAChoice(choice.name)">{{choice.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['choices'],
  data () {
    return {
      
    }
  },
  methods: {
    removeAChoice(name) {
      
    }
  }
}
</script>
```
이제 다음과 같이 자식 컴포넌트 > 부모컴포넌트로 이벤트를 전달한다.

```js
methods: {
  removeAChoice(name) {
    this.$emit('delete', {name})
  }
}
```
뭔가 복잡해 보이지만 `props` 를 배울 때 그랬듯 그냥 그러려니 하고 외우면 된다. `$emit` 이라는 Vue 자체 내장 함수를 통해, 우리가 인자로 받은 `choice.name` 을 현재 컴포넌트의 부모에게 전달한다. 'delete' 는 그냥 이 이벤트에 이름을 붙인 것으로, 원하는 이름을 붙여도 된다. 마치 `props` 에서도 원하는 이름을 붙일 수 있었던 것과 동일하다.

그럼 부모 컴포넌트에서는 이 이벤트를 어떻게 수신할까? 지금 자식 컴포넌트가 부모에게 보내고 있는 것도 하나의 이벤트이기 때문에, 마치 클릭 이벤트 리스너처럼 `v-on`, 즉 `@` 으로 수신할 수 있다. 다만 이벤트 이름은 우리가 위에서 원하는대로 정했던 그 이름이다. 그렇게 자식으로부터 이벤트를 보고받은 후, 그 이벤트를 받았을 때 수행할 메소드(method) 를 정의한다. 우선 해당 이벤트를 통해 자식으로부터 어떤 것을 받았는지 `console.log` 로 기록해보자.

```html{12,40,41,42,43,44}
<!-- App.vue 파일 -->
<template>
<div>
  <div class="header">
    <h1>성점추</h1>
    <h3 class="subtitle">성대생을 위한 점심 추천 서비스</h3>

    <Navbar />
  </div>

  <div class="main">
    <AllChoices :choices="choices" @delete="deleteAChoice" />
    <Suggestion :choices="choices" />
  </div>

</div>
</template>

<script>
import AllChoices from './components/AllChoices'
import Suggestion from './components/Suggestion'

export default {
  components: {
    AllChoices,
    Suggestion
  },
  data () {
    return {
      choices: [
        {name: '청춘직화', selected: true},
        {name: '품', selected: false},
        {name: '재즈앤라멘', selected: false},
        {name: '쇼타돈부리', selected: true},
        {name: '더닭', selected: false},
        {name: '600주년 학식', selected: true},        
      ]
    }
  },
  methods: {
    deleteAChoice(payload) {
      console.log(payload)
    }
  }
}
</script>

<style>
  .header {
    text-align: center;
  }
  .subtitle {
    color: gray;
  }
  .main {
    margin-top: 50px;
    text-align: center;
  }
</style>
```

모든 것을 저장한 후, 브라우저에서 '모든 선택지' 밑의 선택지를 하나씩 클릭해보면, 크롬 개발자도구의 'Console' 탭에 다음과 같이 로그가 찍히는 것을 확인할 수 있다.

<img src="/images/consoleLog.png">

그럼 로그를 찍는 게 아니라 삭제를 하려면 어떻게 해야될까? **숙제로 해보도록 하자.**

 
## (응용) props 를 v-for 과 함께 이용하기

*성점추* 를 구상하기 전에 사용했던 `<cmp-weather />` 컴포넌트로 잠시 돌아가보자. 아래처럼, 'weather' 과 'date' 를 부모로부터 받기로 `props` 에 명시하자.

```html
<!-- Weather.vue 파일 -->
<template>
  <div>
    <!-- date 가 추가되었다. -->
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
      changeWeather () {
        this.weather = '흐림'
      }
    }
  }
</script>
```

그리고 부모 컴포넌트(App.vue) 에서 WeatherData 를 자식 컴포넌트인 `<cmp-weather />` 에 넘겨주는데, *성점추* 때와 달리 그냥 넘겨주지 않고 `v-for` 로 넘겨주자. 

```html
<template>
  <div>
    <cmp-weather v-for="selectOne in weatherData" :weather="selectOne.weather" :date="selectOne.date"></cmp-weather>
  </div>
</template>

<script>
import Weather from './components/Weather'
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