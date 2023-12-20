<script lang="ts" setup></script>

<template>
  <div class="alter-box">
    <strong>This is an Error for Demo Purposes</strong>
    <p class="alter-message">
      <slot />
    </p>
  </div>
</template>

<style scoped>
.alter-box {
  border: 1px solid #ed3c50;
  margin: 28px 0;
  padding: 20px 24px 4px 42px;
  border-radius: 8px;
  overflow-x: auto;
  transition:
    color 0.5s,
    background-color 0.5s;
  position: relative;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: rgba(235, 235, 235, 0.6);
  background-color: #242424;

  &::before {
    color: #ed3c50;
    content: '⚠';
    font-size: 17px;
    top: 19px;
    position: absolute;
    font-weight: 600;
    left: 17px;
  }

  strong {
    display: block;
    color: #ed3c50;
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 500;
    transition: color 0.5s;
  }

  .alter-message {
    margin-bottom: 1.2em;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
}
</style>
