<template>
    <div class="home">
      <v-content>
        <v-container fluid>
              <Calendar />
        </v-container>
      </v-content>
    </div>
  </template>
  
  <script>
  import Calendar from '../components/Calendar';
  
  export default {
    name: 'App',
    components: {
        Calendar
  
    },
  
    data: () => ({
      //
    }),
  }
  </script>
  