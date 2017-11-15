<template>
<fieldset>
  <el-form-item label="Street">
    <el-input v-model="address.street" />
  </el-form-item>
  <div class="inline">
    <el-form-item label="City">
      <el-input v-model="address.city" />
    </el-form-item>
    <el-form-item label="State">
      <el-input v-model="address.state" />
    </el-form-item>
    <el-form-item label="Zipcode">
      <el-input v-model="address.zipCode" />
    </el-form-item>
  </div>
</fieldset>
</template>

<script>
export default {
  name: 'EditAddress',
  props: ['address']
}
</script>

<style lang="scss" scoped>
.inline .el-form-item {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}
</style>