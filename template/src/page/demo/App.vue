<template>
  <div id="app">
    <div aspectratio w-200-200 aspect-ratio="200/200">
      <div aspectratio-content>
        <img src="~assets/img/logo.png" width="100%" height="100%">
      </div>
    </div>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>

    <figure w-324-324 aspectratio aspect-ratio="324/324">
      <div aspectratio-content>
        <img src="//gw.alicdn.com/imgextra/i1/642910327/TB26bQ_bb_0UKFjy1XaXXbKfXXa_!!642910327-0-beehive-scenes.jpg" alt="" width="100%" height="100%">
      </div>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss" scoped>
  [w-324-324]{
    width: 324px;
    background: #fff;
    overflow: hidden;
  }
  [w-324-324]{
    aspect-ratio:'324:324';
  }

  [w-200-200] {
    width: 200px;
    aspect-ratio: '200:200'
  }
  img {
    width: 200px;
    height: 200px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    @include clearfix;
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
