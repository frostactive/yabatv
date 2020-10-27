export default class ConcessionDTO {
  constructor(data={}){
    this.id = data.id || null
    this.name = data.name || null
    this.group = data.group || null
    this.image = data.image || 'null'
    this.cost = data.cost || null
  }
}