<template>
  <v-row class="fill-height" >
    <v-col>
      <h2></h2>
      <v-sheet height="64">
        <v-toolbar flat color="white"><!--버튼 생성-->
          <v-btn color="mr-4" dark @click.stop="dialog = true">
            일정 추가
          </v-btn>
          <v-btn color="mr-4" dark @click="setToday">
            현재날짜로
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title >{{ title }}</v-toolbar-title>
          <div class="flex-grow-1" ></div>
          <v-menu bottom right >
            <template v-slot:activator="{ on }" > <!--activator 이름을 가진 슬롯에서 on을 가져옴-->
              <v-btn outlined v-on="on" >
                <span >{{ typeToLabel[type] }}</span>
                <v-icon right >mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list dark><!--오른쪽 상단에 메뉴 리스트 생성-->
              <v-list-item @click="type = 'day'">
                <v-list-item-title >Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title >Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500" ><!--버튼 누를시 새로 뜨는 화면 생성-->
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent" text-align >
              <v-text-field v-model="name" type="text" label="제목"></v-text-field>
              <v-text-field v-model="details" type="text" label="설명"></v-text-field>
              <v-text-field v-model="start" type="date" label="시작일"></v-text-field>
              <v-text-field v-model="end" type="date" label="종료일"></v-text-field>
              <v-text-field v-model="color" type="color" label="색"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                일정 추가
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDate" max-width="500" ><!--버튼 누를시 새로 뜨는 화면 생성-->
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="제목"></v-text-field>
              <v-text-field v-model="details" type="text" label="설명"></v-text-field>
              <v-text-field v-model="start" type="date" label="시작일"></v-text-field>
              <v-text-field v-model="end" type="date" label="종료일"></v-text-field>
              <v-text-field v-model="color" type="color" label="색"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                일정 추가
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>


<v-sheet height="600">
  <!--v-calendar api 호출-->
  <v-calendar
  ref="calendar"
  v-model="focus"
  color="primary"
  :events="events"
  :event-color="getEventColor"
  :event-margin-bottom="3"
  :now="today"
  :type="type"
  @click:event="showEvent"
  @click:more="viewDay"
  @click:date="setDialogDate"
  @change="updateRange"
  ></v-calendar>
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  full-width
  offset-x
  >
  <v-card color="grey lighten-4" :width="350" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-btn @click="deleteEvent(selectedEvent._id)" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <form v-if="currentlyEditing !== selectedEvent._id">
        {{ selectedEvent.details }}
      </form>
      <form v-else>
        <textarea-autosize
        v-model="selectedEvent.details"
        type="text"
        style="width: 100%"
        :min-height="100"
        placeholder="add note">
      </textarea-autosize>
    </form>
  </v-card-text>

  <v-card-actions> <!--일정 선택시 뜨는 창에서 창닫기 버튼을이용해 창에서 빠져나옴-->
    <v-btn text color="secondary" @click="selectedOpen = false">
      창닫기
    </v-btn>
  </v-card-actions>
</v-card>
</v-menu>
</v-sheet>
</v-col>
</v-row>
</template>

<script>
import { mapState } from 'vuex' //vuex를 이용해 store에 있는 mapState을 쉽게 가져옴
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10), 
    focus: new Date().toISOString().substr(0, 10), 
    type: 'month' , // 기본타입 month
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    name: null, // 일정 이름
    details: null, // 일정 설명
    start: null, // 일정 시작일
    end: null, // 일정 종료일
    color: '#1976D2', // 기본색
    currentlyEditing: null, // 편집
    selectedEvent: {}, // 일정 불러옴 
    selectedElement: null, // 선택한 일정
    selectedOpen: false, // 선택한 일정 자세히 열기
    dialog: false, // 선택
    dialogDate: false, // 일정 선택
  }),
  mounted () {
    this.getEvents() //getevent 호출
  },
  computed: {
    ...mapState([ // 이벤트 호출
      'events'
    ]),
    title () {
      const { start, end } = this
      if (!start || !end) { // 달력 생성
        return ''
      }
      const startMonth = this.monthFormatter(start) // 시작일
      const endMonth = this.monthFormatter(end) // 종료일
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year // 시작년
      const endYear = end.year // 종료년
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':  // 메뉴 리스트 month
        return `${startMonth} ${startYear}`
        case 'week': // 메뉴 리스트 week
        case '4day': // 메뉴 리스트 4day
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day': // 메뉴 리스트 day
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
        
      })
    }
  },
  methods: {
    getEvents () { // vuex로 loadevents 호출
      this.$store.dispatch('loadEvents')
    },
    setDialogDate( { date }) { // date클릭시 dialogDate, focus 호출
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
      alert("현재날짜로 이동");
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async addEvent (){
      let uri = 'http://localhost:8000/events/add';
      await this.axios.post(uri, {
        name: this.name,
        details: this.details,
        start: this.start,
        end: this.end,
        color: this.color,
      })
      this.name = '',
      this.details = '',
      this.start = '',
      this.end = '',
      this.color = ''
      this.selectedOpen = false,
      this.getEvents()
      alert("일정추가성공!");
      
    },
    async deleteEvent (id) {
      let uri = `http://localhost:8000/events/delete/${id}`;
      await this.axios.delete(uri)
        this.selectedOpen = false,
        this.getEvents()
        alert("일정삭제성공!");
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  }
}
</script>
