<template>
  <div>Error: {{ JSON.stringify(error) }}</div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: 404,
        message: 'Not found'
      })
    }
  }
};
</script>
