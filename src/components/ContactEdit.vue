<template>
<modal
  name="contact-edit-modal"
  height="auto"
  width="80%"
  scrollable
  @before-open="beforeOpen"
  ref="_hackfortest"
  >
  <div class="edit-modal">
    <h1>Edit contact</h1>
    <el-form ref="form" :model="contact">
      <el-form-item label="First name">
        <el-input v-model="contact.firstname"></el-input>
      </el-form-item>
      <el-form-item label="Last name">
        <el-input v-model="contact.lastname"></el-input>
      </el-form-item>
      <el-form-item label="Date of birth">
        <el-date-picker
          v-model="contact.birthDate"
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
              v-for="(email, index) in contact.emails"
              :key="index"
            >
              <el-input class="email-input" v-model="contact.emails[index]"></el-input>
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
          v-for="(address, index) in contact.addresses"
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
              v-for="(phoneNumber, index) in contact.phoneNumbers"
              :key="index"
            >
              <el-input class="email-input" v-model="contact.phoneNumbers[index]"></el-input>
              <span class="delete-item" v-on:click="onRemovePhoneNumber(index)"><icon scale="2" name="minus-circle" color="red" /></span>
            </li>
            <div class="add-item" v-on:click="onAddPhoneNumber">
              <icon name="plus-circle" scale="2" color="green" />
            </div>
          </ul>
      </el-form-item>
    </el-form>
    <div class="buttons-container">
      <el-button class="save-edit" v-on:click="onSaveButtonClick" type="primary">Save</el-button>
      <el-button class="cancel-edit" v-on:click="onCancelButtonClick">Cancel</el-button>
    </div>
  </div>
</modal>
</template>

<script>
import EditAddress from './EditAddress'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/minus-circle'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'ContactEditModal',
  data () {
    return {
      contact: {}
    }
  },
  methods: {
    beforeOpen (event) {
      this.contact = {...event.params.contact}
      // hack to put the date in current timezone, otherwise the component will
      // treat it as a date in UTC and it may show the day as being the day
      // before, e.g., if you are in offset -3, 1980-03-12 will show as
      // 1980-03-11.
      const hack = new Date(this.contact.birthDate)
      hack.setMinutes(hack.getTimezoneOffset())
      this.contact.birthDate = hack
    },
    onSaveButtonClick () {
      // return birthDate back to a string
      this.contact.birthDate = this.contact.birthDate.toISOString().substring(0, 10)
      this.$store.dispatch('editContact', this.contact)
        .then(() => this.$modal.hide('contact-edit-modal'))
    },
    onCancelButtonClick () {
      this.$modal.hide('contact-edit-modal')
    },
    onAddAddress () {
      this.contact.addresses = [
        ...this.contact.addresses,
        {street: '', city: '', state: '', zipCode: ''}
      ]
    },
    onRemoveAddress (indexToRemove) {
      this.contact.addresses = this.contact.addresses
        .filter((i, index) => index !== indexToRemove)
    },
    onAddEmail () {
      this.contact.emails = [
        ...this.contact.emails,
        ''
      ]
    },
    onRemoveEmail (indexToRemove) {
      this.contact.emails = this.contact.emails
        .filter((i, index) => index !== indexToRemove)
    },
    onAddPhoneNumber () {
      this.contact.phoneNumbers = [
        ...this.contact.phoneNumbers,
        ''
      ]
    },
    onRemovePhoneNumber (indexToRemove) {
      this.contact.phoneNumbers = this.contact.phoneNumbers
        .filter((i, index) => index !== indexToRemove)
    },
    _visible () {
      return this.$refs._hackfortest.visible
    }
  },
  components: {
    EditAddress, Icon
  }
}
</script>

<style lang="scss" scoped>
.edit-modal {
  margin: 10px;
}
.buttons-container {
  margin-top: 20px;
}
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
