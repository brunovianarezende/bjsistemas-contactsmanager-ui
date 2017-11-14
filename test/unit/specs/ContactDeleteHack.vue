<template>
  <div id="hack">
    <contact-delete-modal ref="hack" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactDeleteModal from '@/components/ContactDelete'

export default {
  name: 'Hack',
  computed: mapState([
    'contacts'
  ]),
  methods: {
    showModal (contact) {
      this.$modal.show('contact-delete-modal', { contact })
    },
    getModalComponent () {
      return this.$refs.hack
    }
  },
  components: {
    ContactDeleteModal
  }
}
</script>
