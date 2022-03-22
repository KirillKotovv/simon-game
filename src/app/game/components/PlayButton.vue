<template>
<button class="play-button" @click="$emit('playAgain')">
  {{title}}
</button>
</template>

<script>
export default {
  name: "PlayButton",
  props: {
    title: {type: String, default: 'Начать игру'}
  }
}
</script>

<style lang="scss" scoped>
.play-button {
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Raleway, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
  color: #232222;

  width: 200px;
  height: 42px;

  border: 1px solid #232222;
  box-shadow: 0 0 8px -4px #FFFFFF;
  background: #FFFFFF;
  border-radius: 20px;
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    color: #FFFFFF;
    box-shadow: 0 0 8px -4px #FFFFFF;
    background: #232222;
    transition: 0.2s;
  }
}
</style>