<template>
<nav>
    <v-toolbar dark class="blue darken-4" flat app>
        <v-app-bar-nav-icon v-if="user_validated" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <span class="font-weight-light">Traktix</span>
            <span>Fleet Management</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu v-if="user_validated" offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                    <v-avatar color="blue lighten-3" v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                        <span class="white--text headline">{{ user_initials }}</span>
                    </v-avatar>
                </template>
                <span>{{ user_name }}</span>
            </v-tooltip>
        </template>
        <v-list>
            <v-list-item
            link
            @click="logOut()"
            >
            <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>
        
        
    </v-toolbar>

    <v-navigation-drawer v-if="user_validated" absolute temporary app v-model="drawer" class="blue darken-4">
        <v-layout column align-center>
            <v-flex class="mt-4">
                <v-btn class="success" @click="$router.push('new_vehicle')">Add New Vehicle</v-btn>
            </v-flex>
        </v-layout>
        <v-list>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-icon>
                    <v-icon class="white--text">{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</nav>
</template>

<script>
import firebase from 'firebase';

export default {
data() {
    return {
        user_validated: true, 
        drawer: false,
        links: [
            { icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
            { icon: 'directions_bus', text: 'Vehicles', route: '/vehicles' },
        ],
        user_name: 'Talha Siddique',
        user_initials: 'TS',
    }
},

methods: {
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/')
        })
      })
    }
}

}
</script>