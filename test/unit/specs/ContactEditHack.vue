<template>
  <div id="hack">
    <contact-edit-modal ref="hack" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactEditModal from '@/components/ContactEdit'

export default {
  name: 'Hack',
  computed: mapState([
    'contacts'
  ]),
  methods: {
    showModal (contact) {
      this.$modal.show('contact-edit-modal', { contact })
    },
    getModalComponent () {
      return this.$refs.hack
    },
    getContacts() {
      return this.contacts
    }
  },
  components: {
    ContactEditModal
  }
}
</script>
