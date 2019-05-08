<template>
  <div class="content">
    <Row type="flex" justify="center">
      <Col span="10">
      <img src="../assets/404.jpg" alt="not found">
    </Col>
    </Row>
    <Row type="flex" justify="center">
      <Col span="6">
      <Button @click="back" type="primary" long class="btn">返回首页</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  methods: {
    back: function () {
      window.history.back(-1)
    }
  }
}
</script>
<style scoped>
  .content {
    margin-top: 100px;
  }
  .btn {
    margin-top: 150px;
    line-height: 35px;
    font-size: 20px;
  }
</style>
