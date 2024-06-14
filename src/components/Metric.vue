<template>
    <div class="metric">
      <p>
        <span class="title">{{ title }}</span>
        <span class="number">{{ number }}</span>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
    number: String
    }
  };
  </script>
  
  <style scoped>
  .metric {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding-right: 5%;
    padding-left: 5%;
    margin: 5%;
    background-color: white;
    border: 3px solid #dce6eb;
  }
  .metric p {
    margin-bottom: 0;
    line-height: 1.2;
    text-align: right;
  }
  .metric .number {
    display: block;
    font-size: 30px;
    font-weight: 700;
  }
  .metric .title {
    font-size: 20px;
  }
  </style>
  