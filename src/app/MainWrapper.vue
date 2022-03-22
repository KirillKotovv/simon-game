<template>
  <div class="main-wrapper container">
    <h1 class="main-wrapper__title">Simon Game</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "MainWrapper"
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  &__title {
    font-family: Raleway, sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
    letter-spacing: 0em;
    text-align: center;

    color: #000000;

    margin: 24px 0;
  }
}
</style>