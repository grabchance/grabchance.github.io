<template>
  <div>
    <div id="disqus_thread"></div>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>  
  </div>
</template>

<script>
export default {
  mounted () {
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
    console.log(this.$route.path)
    var that = this
    var disqus_config = function () {
      this.page.url = that.$route.path;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = that.$route.path; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
  
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://kim-taewoo-blog.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
       
  }
}
</script>

