const days = { 1: 'Sunday', 2: 'Monday', 3: 'Tuesday', 4: 'Wednesday', 5: 'Thursday', 6: 'Friday', 7: 'Saturday' }
export default class ShowtimeDTO {
  constructor(data={}){
    this.id = data.id || null
    this.week_day = data.week_day || null
    this.time = data.time || null
    this.minute = data.minute || null
    this.amount = data.amount || null
  }

  getDay () {
    return days[this.week_day]
  }

  getTime () {
    return `${this.time}:${parseInt(this.minute) < 10 
      ? '0'+parseInt(this.minute) 
      : this.minute}`
  }
}