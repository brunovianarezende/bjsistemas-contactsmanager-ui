<template>
  <el-form ref="form" :model="contactObj" :rules="rules">
    <el-form-item label="First name" prop="firstname">
      <el-input v-model="contactObj.firstname"></el-input>
    </el-form-item>
    <el-form-item label="Last name" prop="lastname">
      <el-input v-model="contactObj.lastname"></el-input>
    </el-form-item>
    <el-form-item label="Date of birth" prop="birthDate">
      <el-date-picker
        v-model="contactObj.birthDate"
        type="date"
        format="dd/MM/yyyy"
        formatValue="yyyy-MM-dd"
        placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>
    <el-form-item prop="emails">
      <label class="el-form-item__label no-float">E-mails</label>
      <el-form-item
        v-for="(email, index) in contactObj.emails"
        :key="index"
        :prop="`emails.${index}`"
        :rules="emailRules"
      >
        <el-input class="email-input" v-model="contactObj.emails[index]"></el-input>
        <span class="delete-item" v-on:click="onRemoveEmail(index)"><icon scale="2" name="minus-circle" color="red" /></span>
      </el-form-item>
      <div class="add-item" v-on:click="onAddEmail">
        <icon name="plus-circle" scale="2" color="green" />
      </div>
    </el-form-item>
    <fieldset>
      <legend>Addresses</legend>
      <template
        v-for="(address, index) in contactObj.addresses"
      >
        <div :key="index">
          <span class="delete-address" v-on:click="onRemoveAddress(index)"><icon name="minus-circle" scale="2" color="red" /></span>
          <edit-address :address="address" :base-prop-id="`addresses.${index}`" />
        </div>
      </template>
      <div class="add-item" v-on:click="onAddAddress">
        <icon name="plus-circle" scale="2" color="green" />
      </div>
    </fieldset>
    <el-form-item prop="phoneNumbers">
      <label class="el-form-item__label no-float">Phone numbers</label>
      <el-form-item
        v-for="(phoneNumber, index) in contactObj.phoneNumbers"
        :key="index"
        :prop="`phoneNumbers.${index}`"
        :rules="phoneNumberRules"
      >
        <el-input class="email-input" v-model="contactObj.phoneNumbers[index]"></el-input>
        <span class="delete-item" v-on:click="onRemovePhoneNumber(index)"><icon scale="2" name="minus-circle" color="red" /></span>
      </el-form-item>
    <div class="add-item" v-on:click="onAddPhoneNumber">
      <icon name="plus-circle" scale="2" color="green" />
    </div>
    </el-form-item>
  </el-form>
</template>

<script>
import EditAddress from './EditAddress'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/minus-circle'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'ContactInputFields',
  props: ['contact'],
  data () {
    const contactObj = this.contact

    return {
      contactObj,
      rules: {
        firstname: { required: true, whitespace: true, message: 'First name is required', trigger: 'blur' },
        lastname: { required: true, whitespace: true, message: 'Last name is required', trigger: 'blur' },
        birthDate: { required: true, type: 'object', message: 'Date of birth is required', trigger: 'blur' },
        emails: {
          required: true,
          type: 'array',
          min: 1,
          message: 'Add at least one email',
          trigger: 'blur'
        },
        phoneNumbers: { required: true, type: 'array', min: 1, message: 'Add at least one phone number', trigger: 'blur' }
      },
      emailRules: [
        { whitespace: true, required: true, message: 'Email address is required', trigger: 'blur' },
        { type: 'email', message: 'Email address must be valid', trigger: 'blur' }
      ],
      phoneNumberRules: [
        { whitespace: true, required: true, message: 'Phone number is required', trigger: 'blur' },
      ]
    }
  },
  methods: {
    getForm () {
      return this.$refs.form
    },
    onAddAddress () {
      this.contactObj.addresses = [
        ...this.contactObj.addresses,
        {street: '', city: '', state: '', zipCode: ''}
      ]
    },
    onRemoveAddress (indexToRemove) {
      this.contactObj.addresses = this.contactObj.addresses
        .filter((i, index) => index !== indexToRemove)
    },
    onAddEmail () {
      this.contactObj.emails = [
        ...this.contactObj.emails,
        ''
      ]
    },
    onRemoveEmail (indexToRemove) {
      this.contactObj.emails = this.contactObj.emails
        .filter((i, index) => index !== indexToRemove)
    },
    onAddPhoneNumber () {
      this.contactObj.phoneNumbers = [
        ...this.contactObj.phoneNumbers,
        ''
      ]
    },
    onRemovePhoneNumber (indexToRemove) {
      this.contactObj.phoneNumbers = this.contactObj.phoneNumbers
        .filter((i, index) => index !== indexToRemove)
    }
  },
  components: {
    EditAddress, Icon
  }
}
</script>

<style lang="scss" scoped>
.add-item {
  margin: 10px;
}
.delete-item {
  margin: 10px;
}
.delete-address {
  position: relative;
  left: 0px;
  top: 15px;
}
.email-input {
  width: 40%;
}
.no-float {
  float: none;
}
.el-form-item .el-form-item {
  margin-bottom: 22px;
}
</style>
