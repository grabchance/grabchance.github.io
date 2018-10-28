module.exports = {
  title: 'Vue & Firebase',
  description: 'Vue + Firebase 로 세계정복하기',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'Firebase', link: '/firebase/'},
      { text: '멋사 네이버카페', link: 'https://cafe.naver.com/skkulikelion' },
      { text: 'Vue 공식문서', link: 'https://vuejs.org/v2/guide/'}      
    ],
    sidebar: [
      {
        title: 'Vue',
        collapsable: false,
        children: [
          '/vue/',
          '/vue/vuecli'
        ]
      },
      {
        title: 'Firebase',
        collapsable: false,
        children: [
          '/firebase/'
        ]
      }
    ],
    // sidebar: 'auto',
    displayAllHeaders: true
  }
}