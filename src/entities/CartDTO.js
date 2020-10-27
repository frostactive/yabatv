export default class CartDTO {
  constructor(data = {}){
    this.film = data.film || {},
    this.showtime = data.showtime || {}
    this.concession = data.concession || {}
    this.cart = data.cart || {}
    this.vat = 5
  }

  getSubTotal() {
    let subTotal = 0
    Object.keys(this.cart).forEach(section => {
      subTotal += this.cart[section].reduce((acc, curr) => acc + (curr.deleted ? 0 : (curr.amount * curr.quantity)), 0)
    })
    return subTotal.toFixed(2)
  }

  getDelivery() {
    return (1000).toFixed(2)
  }

  getVat() {
    return ((this.getSubTotal() * this.vat)/100).toFixed(2)
  }

  getTotal() {
    const total = parseFloat(this.getSubTotal()) + parseFloat(this.getDelivery()) + parseFloat(this.getVat())
    return total.toFixed(2)
  }
}