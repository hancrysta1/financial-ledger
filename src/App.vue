<template>
  <div>
    <RouterView />
  </div>
  <div id="home">
    <div class="container">
      <Header />
      <GridContainer/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import GridContainer from './components/GridContainer.vue';

export default {
  name: 'App',
  components: {
    Header,
    GridContainer
  }
}
</script>

<style>
@font-face {
  font-family:'NanumSquareRoundEB';
  src: url('./assets/fonts/NanumSquareRoundEB.ttf');
}
@font-face {
  font-family:'NanumSquareRoundB';
  src: url('./assets/fonts/NanumSquareRoundB.ttf');
}

@font-face {
  font-family:'BlackHanSans';
  src: url('./assets/fonts/BlackHanSans.ttf') format('truetype');
}

.container{
  font-family: 'NanumSquareRoundEB'
}
</style>
