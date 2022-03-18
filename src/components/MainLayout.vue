<template>
  <main :class="$style.Container">
    <n-gradient-text :class="$style.Title" :size="48">
      Simple Convert
    </n-gradient-text>
    <n-card :class="$style.Card" hoverable>
      <template v-if="!loading">
        <slot name="navigation"></slot>
        <slot></slot>
      </template>
      <div v-else :class="$style.SpinnerWrapper">
        <n-spin size="large" />
      </div>
    </n-card>
  </main>
</template>

<style lang="less" module>
.Container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 48px 0;
  min-width: 375px;
  background-color: #f9f9f9;
}

.Title {
  margin-bottom: 24px;
}

.Card {
  width: 75%
}

.SpinnerWrapper {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { NCard, NGradientText, NSpin } from 'naive-ui'

export default defineComponent({
  name: 'MainLayout',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NCard,
    NSpin,
    NGradientText
  }
})
</script>
