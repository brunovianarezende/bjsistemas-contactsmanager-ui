<template>
  <div>
    <contact-edit-modal />
    <contact-delete-modal />
    <el-row>
      <el-col :span="24"><div><h1>Contacts</h1></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table
            :data="contacts"
            stripe
            border
            empty-text="There are no contacts"
            style="width: 100%">
            <el-table-column
              align="left"
              prop="firstname"
              label="First name">
            </el-table-column>
            <el-table-column
              align="left"
              prop="lastname"
              label="Last Name" />
            <el-table-column
              align="left"
              prop="birthDate"
              label="Date of birth">
            </el-table-column>
            <el-table-column
              align="left"
              label="E-mail">
              <template slot-scope="scope">
                <ul>
                  <li
                    v-for="(email, index) in scope.row.emails"
                    v-bind:key="index"
                    >{{email}}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="Addresses">
              <template slot-scope="scope">
                <ul>
                  <li
                    v-for="(address, index) in scope.row.addresses"
                    v-bind:key="index"
                    >{{ formatAddress(address) }}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="Phone numbers">
              <template slot-scope="scope">
                <ul>
                  <li
                    v-for="(phoneNumber, index) in scope.row.phoneNumbers"
                    v-bind:key="index"
                    >{{phoneNumber}}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Actions"
              width="120"
              >
              <template slot-scope="scope">
                <a class="edit-contact-icon" v-on:click="editContact(scope.row)"><icon name="edit" scale="2" color="green" /></a>
                <br />
                <a class="delete-contact-icon" v-on:click="deleteContact(scope.row)"><icon scale="2" name="remove" color="red" label="Delete" /></a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/remove'
import Icon from 'vue-awesome/components/Icon'
import ContactEditModal from './ContactEdit'
import ContactDeleteModal from './ContactDelete'

const notEmpty = (l) => l.filter((i) => !!i)

export default {
  name: 'ContactsList',
  computed: mapState([
    'contacts'
  ]),
  methods: {
    formatAddress (address) {
      const lines = [
        address.street,
        notEmpty([address.city, address.state, address.zipCode]).join(', ')
      ]
      return notEmpty(lines).join(' - ')
    },
    editContact (contact) {
      this.$modal.show('contact-edit-modal')
    },
    deleteContact (contact) {
      this.$modal.show('contact-delete-modal')
    }
  },
  components: {
    Icon, ContactEditModal, ContactDeleteModal
  }
}
</script>

<style lang="scss" scoped>
@import url("//unpkg.com/element-ui@2.0.4/lib/theme-chalk/index.css");
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  min-height: 36px;
}
.fa-icon {
  cursor: pointer;
}
</style>