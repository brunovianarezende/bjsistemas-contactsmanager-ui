<template>
<modal
  name="contact-add-modal"
  height="auto"
  width="80%"
  scrollable
  @before-open="beforeOpen"
  ref="_hackfortest"
  >
  <div class="add-modal">
    <h1>Add contact</h1>
    <contact-input-fields :contact="contact" />
    <div class="buttons-container">
      <el-button class="save-add" v-on:click="onSaveButtonClick" type="primary">Save</el-button>
      <el-button class="cancel-add" v-on:click="onCancelButtonClick">Cancel</el-button>
    </div>
  </div>
</modal>
</template>

<script>
import ContactInputFields from './ContactInputFields'

export default {
  name: 'ContactAddModal',
  data () {
    return {
      contact: {}
    }
  },
  methods: {
    beforeOpen (event) {
      this.contact = {
        firstname: '',
        lastname: '',
        addresses: [],
        emails: [],
        phoneNumbers: []
      }
    },
    onSaveButtonClick () {
      const contact = this.contact
      if (contact.birthDate) {
        // make sure birthDate is a string
        contact.birthDate = contact.birthDate.toISOString().substring(0, 10)
      }

      this.$store.dispatch('addContact', contact)
        .then(() => this.$modal.hide('contact-add-modal'))
    },
    onCancelButtonClick () {
      this.$modal.hide('contact-add-modal')
    },
    _visible () {
      return this.$refs._hackfortest.visible
    }
  },
  components: {
    ContactInputFields
  }
}
</script>

<style lang="scss" scoped>
.add-modal {
  margin: 10px;
}
.buttons-container {
  margin-top: 20px;
}
</style>
