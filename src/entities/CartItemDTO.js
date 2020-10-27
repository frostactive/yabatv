export default class CartItemDTO {
  constructor(data = {}) {
    this.id = data.id || null
    this.title = data.title || null
    this.amount = data.amount || null
    this.quantity = data.quantity || 1
    this.deletable = data.deletable ? false : true
    this.deleted = data.deleted || false
  }

  getSubTotal () {
    return (parseInt(this.quantity) * parseInt(this.amount)).toFixed(2)
  }
}