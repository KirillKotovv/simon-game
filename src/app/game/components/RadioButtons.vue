<template>
  <div class="radio-inputs">

    <div class="radio-inputs__title">Выберите уровень сложности:</div>
    <div class="radio-inputs__input">
      <input id="easy"
             type="radio"
             value="easy"
             v-model="checked"
             :disabled="disabled" />
      <label for="easy">Легкий</label>
    </div>
    <div class="radio-inputs__input">
      <input id="medium"
             type="radio"
             v-model="checked"
             value="medium"
             :disabled="disabled" />
      <label for="medium">Средний</label>
    </div>
    <div class="radio-inputs__input">
      <input id="hard"
             type="radio"
             v-model="checked"
             value="hard"
             :disabled="disabled" />
      <label for="hard">Сложный</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioButtons",
  props:{
    value: String,
    label: {type: String},
    disabled:{type: Boolean}
  },
  computed: {
    checked: {
      set: function(value) {
        this.$emit("input", value);
      },
      get: function() {
        return this.value;
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.radio-inputs {

  &__title {
    font-family: Raleway, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;

    color: #000000;

    margin-bottom: 14px;
  }
  &__input {
    display: flex;
    align-items: center;

    margin-bottom: 16px;

    input {
      margin-right: 14px;
      cursor: pointer;
    }
    label {
      font-family: Raleway, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;

      color: #000000;
      cursor: pointer;
    }
    cursor: pointer;
  }
}
</style>