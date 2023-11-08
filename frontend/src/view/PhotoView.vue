<template>
    <div class="home">
      <v-content>
        <v-container fluid>
              <Photo />
        </v-container>
      </v-content>
    </div>
  </template>
  
  <script>
  import Photo from '../components/Photo';
  
  export default {
    name: 'App',
    components: {
        Photo
  
    },
  
    data: () => ({
      //
    }),
  }
  </script>
  