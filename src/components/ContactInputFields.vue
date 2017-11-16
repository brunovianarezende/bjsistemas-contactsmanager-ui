<template>
  <el-form ref="form" :model="contactObj">
    <el-form-item label="First name">
      <el-input v-model="contactObj.firstname"></el-input>
    </el-form-item>
    <el-form-item label="Last name">
      <el-input v-model="contactObj.lastname"></el-input>
    </el-form-item>
    <el-form-item label="Date of birth">
      <el-date-picker
        v-model="contactObj.birthDate"
        type="date"
        format="dd/MM/yyyy"
        formatValue="yyyy-MM-dd"
        placeholder="Pick a day">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <label class="el-form-item__label no-float">E-mails</label>
        <ul>
          <li
            v-for="(email, index) in contactObj.emails"
            :key="index"
          >
            <el-input class="email-input" v-model="contactObj.emails[index]"></el-input>
            <span class="delete-item" v-on:click="onRemoveEmail(index)"><icon scale="2" name="minus-circle" color="red" /></span>
          </li>
          <div class="add-item" v-on:click="onAddEmail">
            <icon name="plus-circle" scale="2" color="green" />
          </div>
        </ul>
    </el-form-item>
    <fieldset>
      <legend>Addresses</legend>
      <template
        v-for="(address, index) in contactObj.addresses"
      >
        <div :key="index">
          <span class="delete-address" v-on:click="onRemoveAddress(index)"><icon name="minus-circle" scale="2" color="red" /></span>
          <edit-address :address="address" />
        </div>
      </template>
      <div class="add-item" v-on:click="onAddAddress">
        <icon name="plus-circle" scale="2" color="green" />
      </div>
    </fieldset>
    <el-form-item>
      <label class="el-form-item__label no-float">Phone numbers</label>
        <ul>
          <li
            v-for="(phoneNumber, index) in contactObj.phoneNumbers"
            :key="index"
          >
            <el-input class="email-input" v-model="contactObj.phoneNumbers[index]"></el-input>
            <span class="delete-item" v-on:click="onRemovePhoneNumber(index)"><icon scale="2" name="minus-circle" color="red" /></span>
          </li>
          <div class="add-item" v-on:click="onAddPhoneNumber">
            <icon name="plus-circle" scale="2" color="green" />
          </div>
        </ul>
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
      contactObj
    }
  },
  methods: {
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
</style>
