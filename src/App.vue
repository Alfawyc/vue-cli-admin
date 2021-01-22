<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {},
  methods: {}
};
</script>

<style lang="less">
@import "./style/variables";
@import "./style/element-ui";
@import "./style/common";
@import "./style/scrollBar";
@import "./style/own.css";
</style>
