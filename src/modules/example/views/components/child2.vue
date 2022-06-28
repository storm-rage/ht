<template>
  <div class="child-2">
    <b>in child2:</b>
    <p>props: {{pChild2}}</p>
    <p>$attrs: {{$attrs}}</p>
  </div>
</template>
<script>
  export default {
    props: ['pChild2'],
    data () {
      return {};
    },
    inheritAttrs: true,
    mounted () {
      this.$emit('test2');
    }
  };
</script>
