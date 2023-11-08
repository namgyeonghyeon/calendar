<template>

    <v-card>
        <h2></h2>
        <v-tabs color="deep-purple accent-4" center>
            <!--v-tab 20까지 만들어 20페이지를 만듬-->
            <v-tab>1</v-tab>
            <v-tab>2</v-tab>
            <v-tab>3</v-tab>
            <v-tab>4</v-tab>
            <v-tab>5</v-tab>
            <v-tab>6</v-tab>
            <v-tab>7</v-tab>
            <v-tab>8</v-tab>
            <v-tab>9</v-tab>
            <v-tab>11</v-tab>
            <v-tab>12</v-tab>
            <v-tab>13</v-tab>
            <v-tab>14</v-tab>
            <v-tab>15</v-tab>
            <v-tab>16</v-tab>
            <v-tab>17</v-tab>
            <v-tab>18</v-tab>
            <v-tab>19</v-tab>
            <v-tab>20</v-tab>

            <v-tab-item v-for="n in 20" :key="n"> <!--in 20을 이용해 20페이지까지 사진 생성하도록 설정 key의 n은 갯수-->
                <v-container fluid>
                    <v-row>
                        <v-col v-for="i in 6" :key="i" cols="12" md="4">
                            <v-img :src="`https://picsum.photos/1920/1080?random=${i * n * 5 + 10}`"
                                :lazy-src="`https://picsum.photos/1920/1080?random=${i * n * 5 + 10}`" aspect-ratio="1">
                            </v-img> <!--https://picsum.photos/1920/1080?random의 링크를 이용해 계속 다른 사진이 나오도록 설정 -->
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<style>
h2 {
    display: block;
    height: 70px;
}
</style>