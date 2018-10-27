module.exports = {
  title: 'SKKU Likelion Vue & Firebase',
  description: 'Vue + Firebase 로 세계정복하기',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'Firebase', link: '/firebase/'},
      { text: '네이버카페', link: 'https://cafe.naver.com/skkulikelion' },      
    ],
    // sidebar: [
    //   {
    //     title: 'Vue',
    //     collapsable: false,
    //     children: [
    //       '/vue/'
    //     ]
    //   },
    //   {
    //     title: 'Firebase',
    //     collapsable: false,
    //     children: [
    //       '/firebase/'
    //     ]
    //   }
    // ],
    sidebar: 'auto',
    displayAllHeaders: true
  }
}