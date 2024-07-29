const requests = require("./utils/requests.js")

class payment {
  constructor(access_token) {
    this.access_token = "Bearer " + access_token
    this.user_id = null
    this.payment_id = null
    this.user_name = null
    this.value = null
  }

  async expire_date(time) {
    this.date = new Date()
    this.date.setMinutes(this.date.getMinutes() + 30)
    this.sum_time = time * 60
    this.max_time = new Date(
      (this.date.getTime() + this.sum_time - this.date.getTimezoneOffset() * 60000)
    )
    return this.max_time.toISOString().slice(0, -1) + "-10:00"
  }

  async create_payment(value, time = 30) {
    this.expire = await this.expire_date(time)
    this.response = await requests.requests({
      method: "POST",
      uri: "https://api.mercadopago.com/v1/payments",
      headers: {
        Authorization: this.access_token
      },
      json: {
        transaction_amount: parseFloat(value),
        description: "PixAuto-Bot_ebooks",
          payment_method_id: "pix",
          payer: {
            email: "seuemailaqui@gmail.com",
            identification: {type: "cpf", number: "00000000272"},
            address: {}
        },
        date_of_expiration: this.expire
      }
    })
    this.payment = this.response.res.body
    this.payment_id = this.payment.id.toString()

    return {
      payment_id: this.payment_id,
      copy_paste: this.payment.point_of_interaction.transaction_data.qr_code,
      qr_code: this.payment.point_of_interaction.transaction_data.qr_code_base64,
    }
  }

  async check_payment() {
    this.response = await requests.requests({
      method: "GET",
      uri: "https://api.mercadopago.com/v1/payments/" + this.payment_id,
      headers: {
        Authorization: this.access_token
      }
    })
    this.get_pay = JSON.parse(this.response.res.body)

    return {status: this.get_pay.status}
  }

}

module.exports = { payment }
