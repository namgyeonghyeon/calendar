<template>
    <div class="home">
      <v-content>
        <v-container fluid>
              <Login />
        </v-container>
      </v-content>
    </div>
  </template>
  
  <script>
  import Login from '../components/Login';
  
  export default {
    name: 'App',
    components: {
        Login
  
    },
  
    data: () => ({
      //
    }),
  }
  </script>
  