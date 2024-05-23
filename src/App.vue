<template>
<div @click="tog" class="container">
  <button class="mybutton"><img class="mbut" :src="mshow ? close : menu" alt="menu"></button>
  <div class="always" :class="mshow ? 'bir' : 'ikki'">
    <nav v-if="mshow">
      <ul>
        <li><router-link class="links" to="/">Malumot</router-link></li>
        <li><router-link class="links" to="/havo">Ob-havo</router-link></li>
        <li><router-link class="links" to="/yozish">Yozish</router-link></li>
        <li><router-link class="links" to="/coding">Typing</router-link></li>
      </ul>
    </nav>
  </div>
  <div v-if="mshow" class="mine"></div>
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menu : require('@/assets/menu.svg'),
      close : require('@/assets/close.svg'),
      mshow: false,
    }
  },
  methods: {
    tog(event){
      if(event.target.className == 'mbut'){
        this.mshow = !this.mshow;
      }
      else if(event.target.className !== 'bir'){
        this.mshow = false
      }
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  min-height: 100vh;
}
.mybutton{
  z-index: 10;
  position: fixed;
  background: transparent;
  border: none;
  top: 10px;
  left: 10px;
}
li{
  text-align: center;
  font-size: 20px;
  margin: 6px;
  padding: 6px;
  border-radius: 4px;
}
li:hover{
  background-color: rgb(215, 205, 205);
}
img{
  width: 30px;
}
.bir{
  display: inline-block;
}
.ikki{
  display: none;
}
.always{
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: rgba(161, 153, 153, 0.9);
  transition: 0.5s;
}
.always > nav{
  margin-top: 50px;
  display: block;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
li a{
  text-decoration: none;
  color: black;
}
nav a.router-link-exact-active{
  color: rgb(84,84,250);
  font-size: 1.1em
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #111;
  width: 100%;
  min-height: 100vh;
}
</style>
