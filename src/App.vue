<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NMessageProvider } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NMessageProvider
  }
})
</script>
