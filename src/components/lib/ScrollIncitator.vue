<template>
  <div class="incite-wrapper" :class="{ visible }">
    <div class="incite"></div>
  </div>
</template>

<script>
export default {
  name: "ScrollIncitator",
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">

.incite {
  border: solid #fff 3px;
  border-radius: 20px;
  width: 25px;
  height: 50px;
  transition: all .4s;
  cursor: pointer;
  opacity: 0.8;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #fff;
    left: 50%;
    top: 40%;
    animation: bounce 1s infinite cubic-bezier(.42, 0, .11, .98);
  }
  &:hover {
    opacity: 1;
  }
}
.incite-wrapper {
  pointer-events: none;
  position: relative;
  opacity: 0;
  transition:  all .4s;
  &.visible {
    opacity: 1;
  }
}

@keyframes bounce {
  from {
    transform: translate(-50%, -12px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
}
</style>
