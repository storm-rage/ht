<template>
  <p id="app">
    <child1
      :p-child1="child1"
      :p-child2="child2"
      :p-child3="child3"
      v-on:test1="onTest1"
      v-on:test2="onTest2">
    </child1>
  </p>
</template>
<script>
  import child1 from './components/child1.vue';
  export default {
    data () {
      return {
        child1: '11',
        child2: '22',
        child3: '33'
      };
    },
    components: { child1 },
    methods: {
      onTest1 () {
        console.log('test1 running...');
      },
      onTest2 () {
        console.log('test2 running');
      }
    }
  };
</script>
