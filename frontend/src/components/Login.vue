<template>
  <v-app id="app">
    <v-main>
      <v-container style="position: relative; top: 50%; margin-left: 25%" class="text-xs-center">
        <v-layout row wrap class="text-xs-center">
          <v-flex>

            <v-card flat class="mx-auto" max-width="800">
              <v-row style="margin-top: 60px">
                <v-col>
                  <v-form style="width: 400px; height: 300px">
                    <form @submit.prevent="fnLogin">
                      <h2>로그인</h2>
                      <div class="mx-3">
                        <v-text-field id='userId' ref='userId' :counter="10" v-model="userId"
                          :error-messages="nameErrors" label="userId" required @input="$v.name.$touch()"
                          @blur="$v.name.$touch()"></v-text-field>
                        <!--10글자까지 제한, 이름잘못입력시 호출, 이름선언-->
                      </div>
                      <div class="mx-3">
                        <v-text-field id='Password' ref='Password' :counter="16" type="Password" v-model='Password'
                          label='Password' required></v-text-field>
                        <!--16글자까지 제한, 숫자가 안보이도록 설정, 이름선언-->

                      </div>

                      <v-card-actions>
                        <!--로그인 버튼 설정-->
                        <v-btn @click.prevent="doLogin" class="pink white--text" dark large rounded
                          @click="login = true">
                          로그인
                        </v-btn>
                        <!--회원가입 버튼 설정-->
                        <v-btn @click.prevent="adduser" class="pink white--text" dark large rounded
                          @click.stop="register = true">
                          회원가입
                        </v-btn>
                      </v-card-actions>
                    </form>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog v-model="register" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addUser">
              <!--회원가입 누를시 다음 창이 뜨도록 설정 adduser 호출-->
              <v-text-field :counter="10" v-model="userid" type="text" label="아이디"></v-text-field>
              <v-text-field :counter="16" v-model="password" type="text" label="비밀번호"></v-text-field>
              <v-text-field :counter="8" v-model="birth" type="text" label="생년월일(8자)"></v-text-field>
              <v-text-field color="success" loading disabled></v-text-field>
              <!--로딩 디스플레이 생성-->
              <v-btn type="submit" class="pink white--text" @click.stop="register = false">
                <!--register라는 변수 호출-->
                회원가입
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>
  
<script>
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data: function () {
    return {
      userId: '',
      Password: '',
      errorMessage: '',
      birth: null,
      login: false,
      register: false,
    };
  },
  computed: {
    ...mapState([ // store에 있는 함수 호출
      'events'
    ]),
  },
  methods: {
    getEvents() {
      this.$store.dispatch('loadEvents')
    },
    async addUser() {
      let uri = 'http://localhost:8000/register/signup'; // db 경로 설정
      await this.axios.post(uri, { // db 테이블내 데이터 생성
        userid: this.userid,
        password: this.password,
        birth: this.birth,
      })
      this.userid = '',
        this.password = '',
        this.birth = '',
        this.getEvents()
      alert("회원가입 성공!");
      this.$router.push('../LoginView');
    },
    doLogin() {
      if (this.userId == "") {
        alert("아이디를 입력하세요.");
        this.$refs.userIdInput.focus();
        return;
      } else if (this.Password == "") {
        alert("패스워드를 입력하세요.");
        this.$refs.PasswordInput.focus();
        return;
      } else {
        this.$router.push('../CalendarView');
        alert("로그인 성공!");
      }
    },
  },
  mounted() {
    this.$refs.userIdInput.focus();
    this.getEvents() // getEvents 호출
  }
};
</script>