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
    <contact-input-fields :contact="contact" />
    <div class="buttons-container">
      <el-button class="save-edit" v-on:click="onSaveButtonClick" type="primary">Save</el-button>
      <el-button class="cancel-edit" v-on:click="onCancelButtonClick">Cancel</el-button>
    </div>
  </div>
</modal>
</template>

<script>
import ContactInputFields from './ContactInputFields'

export default {
  name: 'ContactEditModal',
  data () {
    return {
      contact: {}
    }
  },
  methods: {
    beforeOpen (event) {
      const contact = {...event.params.contact}
      // hack to put the date in current timezone, otherwise the component will
      // treat it as a date in UTC and it may show the day as being the day
      // before, e.g., if you are in offset -3, 1980-03-12 will show as
      // 1980-03-11.
      if (contact.birthDate) {
        const hack = new Date(contact.birthDate)
        hack.setMinutes(hack.getTimezoneOffset())
        contact.birthDate = hack
      }

      this.contact = contact
    },
    onSaveButtonClick () {
      const contact = this.contact
      if (contact.birthDate) {
        // return birthDate back to a string
        contact.birthDate = contact.birthDate.toISOString().substring(0, 10)
      }

      this.$store.dispatch('editContact', contact)
        .then(() => this.$modal.hide('contact-edit-modal'))
    },
    onCancelButtonClick () {
      this.$modal.hide('contact-edit-modal')
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
.edit-modal {
  margin: 10px;
}
.buttons-container {
  margin-top: 20px;
}
</style>
