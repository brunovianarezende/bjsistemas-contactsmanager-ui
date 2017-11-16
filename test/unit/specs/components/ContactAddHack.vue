<template>
  <div id="hack">
    <contact-add-modal ref="hack" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactAddModal from '@/components/ContactAdd'

export default {
  name: 'Hack',
  computed: mapState([
    'contacts'
  ]),
  methods: {
    showModal (contact) {
      this.$modal.show('contact-add-modal', { contact })
    },
    getModalComponent () {
      return this.$refs.hack
    },
    getContacts() {
      return this.contacts
    }
  },
  components: {
    ContactAddModal
  }
}
</script>
