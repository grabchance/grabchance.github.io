# 부모 컴포넌트 => 자식 컴포넌트

```html
<template>
<div>
  <cmp-weather v-for="weather in weatherData" :weather="weather"></cmp-weather>
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
      weatherData: ['맑음','흐림','번개','천둥','안개']
    }
  }
}
</script>
```
`App.vue` 파일

```html
<template>
  <div>
    <p>오늘의 날씨는 {{weather}} 입니다.</p>
    <hr>
    <button @click="changeWeather">날씨 업데이트</button>
  </div>
</template>

<script>
  export default {
    props: ['weather'],
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
`Weather.vue` 파일