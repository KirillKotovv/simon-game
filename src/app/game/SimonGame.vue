<template>
<div class="simon-game__wrapper">
  <div class="simon-game__field">
    <div v-for="(sector,i) in sectors"
         :key="sector.id"
         class="simon-game__sector"
         :class="[sector.class, {'simon-game__sector--highlighted':sector.isHighlighted}]" @click="clickSector(i)"/>
  </div>

  <div class="simon-game__options">
    <div class="simon-game__settings">
      <radio-buttons v-model="level"/>
      <play-button @playAgain="startGame" :title="titleButton"/>
    </div>
    <div class="simon-game__info">
      <div>Score: {{score}}</div>
      <div>Best score: {{bestScore}}</div>
    </div>
  </div>

</div>
</template>

<script>

import RadioButtons from "@/app/game/components/RadioButtons";
import PlayButton from "@/app/game/components/PlayButton";
import audio_0 from '@/assets/sounds/0.ogg'
import audio_1 from '@/assets/sounds/1.ogg'
import audio_2 from '@/assets/sounds/2.ogg'
import audio_3 from '@/assets/sounds/3.ogg'

export default {
  name: "SimonGame",
  components:{
    PlayButton,
    RadioButtons
  },
  data(){
    return {
      sectors: [
        {
          id: 0,
          class: 'simon-game__sector--first',
          isHighlighted: false
        },
        {
          id: 1,
          class: 'simon-game__sector--second',
          isHighlighted: false
        },
        {
          id: 2,
          class: 'simon-game__sector--third',
          isHighlighted: false
        },
        {
          id: 3,
          class: 'simon-game__sector--fourth',
          isHighlighted: false
        },
      ],
      level:'easy',
      audios: [
        audio_0,
        audio_1,
        audio_2,
        audio_3
      ],

      sectorsInterval: null,
      sequence:[],
      playerSequence:[],

      score:0,
      bestScore:0,

      isClickable:true,
      titleButton: 'Начать игру'
    }
  },
  computed:{
    speedLevel(){
      return this.level === 'easy' ? 1500 : this.level === 'medium' ? 1000 : 400
    }
  },
  methods:{
    startGame() {
      this.sequence = [];
      this.score = 0;
      this.playerSequence = [];
      this.titleButton = 'Начать заново'
      clearInterval(this.sectorsInterval);
      this.showSequence();
    },
    clickSector(index){
      if(this.isClickable) {
        this.playerSequence.push(index)
        this.lightUp(index)
        this.soundUp(index)
        this.checkWinLose()
      }
    },
    lightUp(index){
      this.sectors[index].isHighlighted = true
      setTimeout(()=>this.sectors[index].isHighlighted = false, 300)
    },
    soundUp(index){
      const audio = new Audio(this.audios[index])
      audio.play()
    },

    checkWinLose() {
      for (let i = 0; i < this.playerSequence.length; i++) {
        if (this.playerSequence[i] !== this.sequence[i]) {
          this.playerSequence = []
          this.sequence = []
          this.titleButton = 'Начать заново'

          if(this.score > this.bestScore)
            this.bestScore = this.score

          return
        }
      }

      if (this.playerSequence.length === this.sequence.length) {
        this.playerSequence = [];
        this.score++;

        if (this.score === 20) {
          this.isClickable = false;
          this.titleButton = 'Победа';
        } else {
          this.showSequence();
        }
      }
    },

    showSequence() {
      let currentIndex =0;

      this.isClickable = false;
      this.sequence.push(Math.floor(Math.random() * 4));

      this.sequenceInterval = setInterval(() => {
        if (currentIndex >= this.sequence.length) {
          clearInterval(this.sequenceInterval);
          return this.isClickable = true;
        }

        this.soundUp(this.sequence[currentIndex])
        this.lightUp(this.sequence[currentIndex])
        currentIndex++;
      }, this.speedLevel);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.simon-game {

  &__wrapper {
    display: flex;
    padding: 20px;
    min-height: 400px;

    border: 1px solid #42b983;
    border-radius: 20px;
    box-shadow: 0 0 8px -2px #389d6f;
    box-sizing: border-box;
  }

  &__field {
    position: relative;

    width: 300px;
    height: 300px;

    margin-right: 60px;

    border: 3px solid black;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.55);
    box-sizing: border-box;
    border-radius: 10px;

    cursor: pointer;

    &:after {
      content: '';
      position: absolute;
      height: 3px;
      width: 101%;
      background: black;
      top: 50%;
      left: -1px;
      z-index: 2;
    }
    &:before {
      content: '';
      position: absolute;
      height: 101%;
      width: 3px;
      background: black;

      left: 50%;
      top: -1px;
      z-index: 2;
    }
  }

  &__sector {
    transition: 0.25s;
    position: absolute;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    opacity: 0.7;

    &--first {
      clip-path: polygon(50% 0%, 50% 50%, 0 50%, 0 0);
      background-color: $firstSector_color;
    }
    &--second {
      clip-path: polygon(100% 0%, 100% 50%, 50% 50%, 50% 0%);
      background-color: $secondSector_color;
    }
    &--third {
      clip-path: polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%);
      background-color: $thirdSector_color;
    }
    &--fourth {
      clip-path: polygon(0 50%, 0 100%, 50% 100%, 50% 50%);
      background-color: $fourthSector_color;
    }
    &--highlighted {
      opacity: 1!important;
    }
  }

  &__options {
    display: flex;
    justify-content: space-between;
    flex: auto;
  }

  &__info {
    display: flex;

    font-family: Raleway, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    text-align: left;
    color: #000000;

    div {
      margin-right: 16px;
    }
  }

  @media screen and(max-width: 920px) {
    &__wrapper {
      justify-content: space-between;
    }

    &__options {
      flex-direction: column;
      justify-content: flex-start;

      .simon-game__settings {
        order: 2;
      }
      .simon-game__info {
        margin-bottom: 24px;
      }
    }
  }

  @media screen and (max-width: 680px){
    &__wrapper {
      flex-direction: column;
      align-items: center;
    }

    &__field {
      margin-bottom: 24px;
      margin-right: 0;
    }
  }
}
</style>