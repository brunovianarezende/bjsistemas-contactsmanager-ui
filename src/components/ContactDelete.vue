<template>
<modal
  name="contact-delete-modal"
  @before-open="beforeOpen"
  height="auto"
  scrollable
  ref="_hackfortest"
  >
  <div class="delete-modal">
    <h1>Attention!</h1>
    <p>Are you sure you want to delete this contact?</p>
    <div class="contact-info">
      <div>
        <b>Name: {{name}}</b>
      </div>
      <div>
        <b>Date of birth: {{contact.birthDate}}</b>
      </div>
      <div>
        <b>E-mail:</b>
        <ul>
          <li
            v-for="(email, index) in contact.emails"
            v-bind:key="index"
            >{{email}}</li>
        </ul>
      </div>
      <div>
        <b>Addresses:</b>
        <ul>
          <li
            v-for="(address, index) in contact.addresses"
            v-bind:key="index"
            >{{formatFirstLine(address)}}<br />{{formatSecondLine(address)}}</li>
        </ul>
      </div>
      <div>
        <b>Phone numbers:</b>
        <ul>
          <li
            v-for="(phoneNumber, index) in contact.phoneNumbers"
            v-bind:key="index"
            >{{phoneNumber}}</li>
        </ul>
      </div>
    </div>
    <el-button class="dont-delete" v-on:click="onNoButtonClick">No</el-button>
    <el-button class="do-delete" v-on:click="onYesButtonClick" type="danger">Yes</el-button>
  </div>
</modal>
</template>

<script>
import { notEmpty, formatFirstLine, formatSecondLine } from './utils'

export default {
  name: 'ContactDeleteModal',
  data () {
    return {
      contact: {},
    }
  },
  methods: {
    beforeOpen (event) {
      this.contact = event.params.contact
    },
    formatFirstLine,
    formatSecondLine,
    onNoButtonClick () {
      this.$modal.hide('contact-delete-modal');
    },
    onYesButtonClick () {
      this.$store.dispatch('deleteContact', this.contact.id)
      this.$modal.hide('contact-delete-modal');
    },
    _visible() {
      return this.$refs._hackfortest.visible
    }
  },
  computed: {
    name: function() {
      return notEmpty([this.contact.firstname, this.contact.lastname]).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-modal {
  margin: 10px;
}
.contact-info {
  margin: 10px;
  margin-bottom: 20px;
}
</style>
