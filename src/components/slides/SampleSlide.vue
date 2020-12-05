<template>
  <article
      class="slide"
      :class="{ current: currentState === 'current', past: currentState === 'past' }"
      @click="click"
  >
    {{ currentState }}
  </article>
</template>

<script>
export default {
  name: "SampleSlide",
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  methods: {
    click () {
      this.$emit('next-slide')
    }
  }
}
</script>

<style scoped lang="scss">
  .slide {
    padding: 30px;
    box-sizing: border-box;
    background-color: #d2d2d2;
    &.current {
      background-color: #dd1111;
    }
    &.past {
      background-color: #77a8c1;
    }
  }
</style>
