<template>
  <div id="app">
   <preloader v-if="showLoader" class="preload"/>
  </div>
</template>

<script>

import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

import preloader from './components/preloader.vue';

export default {
  components: {
    preloader
  },
  name: 'app',
  data () {
    return {
      showLoader: true
    }
  },
  watch: {
      people: {
        immediate: true,
        handler(){
          if(this.people.length > 0){
            this.showLoader = false;
          }
        }
      }
    },
    created(){
        this.loadPeople();  
    },
    computed:{
      ...mapGetters(['people']),
    },
    methods:{
      ...mapActions(['loadPeople']),
    }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body, html{
  width: 100%;
  height: 100%;
  margin: 0;
  position: relative;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
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

.margin{
  &__auto{
    margin: auto;
  }
  &__top{
    &--10{
      margin-top: 10px;
    }
  }
  &__bottom{
    &--10{
      margin-bottom: 10px;
    }
  }
}

.preload{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-75%, -50%);
}

</style>
