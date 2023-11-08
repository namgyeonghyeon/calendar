<template>
  <v-app>
    <v-app-bar dark class ='fixed-bar' > <!--fixed를 이용해 다른 페이지 넘어가도 바의 크기가 같도록 설정-->
      <v-app-bar-nav-icon @click.stop="bDrawer = !bDrawer"></v-app-bar-nav-icon> <!--메뉴바를 생성-->
      <v-toolbar-title><div>나만의 Page</div></v-toolbar-title><!--타이틀 이름 설정-->
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="bDrawer" >
      <v-toolbar flat height="100px" >
        <v-app-bar absolute color="#6A76AB" height='100' shrink-on-scroll prominent
          src="https://picsum.photos/1920/1080?random" fade-img-on-scroll scroll-target="#scrolling-techniques-3"> <!--랜덤으로 사진을 가져와 메뉴상단부분에 사진 삽입-->
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title" >Menu</v-list-item-title><!--메뉴바 타이틀-->
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-app-bar>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list class="pt-3">
        <v-list-item v-for="item in items" :key="item.text" :href="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      bDrawer: false,
      items: [
        // to: 경로 지정한 곳으로 가라
        { text: '달력', icon: 'mdi-calendar', to: '/calendarView' },
        { text: '사진', icon: 'mdi-camera', to: '/PhotoView' },
      ],
    }
  }
};
</script>
<style scoped>
.fixed-bar {
  position: fixed;
  position: -webkit-sticky; /* for Safari */
  z-index: 2;
}
div {
  display: block;
  text-align: center;
}
</style>