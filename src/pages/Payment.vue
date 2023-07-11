<template>
  <div class="container">
    <h1>Payment Form</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Prezzo</th>
          <th scope="col">Quantità</th>
          <th scope="col">Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in store.state.cart" :key="product.id">
          <td>{{ product.name }}</td>
          <td>&euro;{{ product.price }}</td>
          <td>
            <div class="d-flex align-items-center">
              <div class="p-2" @click="store.decrement(product)">
                <i class="fa-solid fa-minus"></i>
              </div>
              <input id="form1" min="1" name="quantity" type="number" class="text-center form-control form-control-sm"
                :class="product.quantity > 0 ? '' : 'is-invalid'" :value="product.quantity"
                @input="store.updateQuantity(product, $event)" />
              <div class="p-2" @click="store.increment(product)">
                <i class="fa-solid fa-plus"></i>
              </div>
            </div>
          </td>
          <td>
            <div class="btn btn-outline-danger" @click="store.deleteCartProduct(product)">
              <i class="fas fa-trash"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>


    <form>

      <hr />
      <div class="">
        <div class="email d-inline-block w-50 pe-2">
          <label for="exampleFormControlInput3" class="form-label">Name</label>
          <input v-model="name" type="text" class="form-control" id="exampleFormControlInput3">
        </div>
        <div class="phone d-inline-block w-50 ps-2">
          <label for="exampleFormControlInput4" class="form-label">Address</label>
          <input v-model="address" type="text" class="form-control" id="exampleFormControlInput4" maxlength="25">
        </div>
      </div>
      <div class="">
        <div class="email d-inline-block w-50 pe-2">
          <label for="exampleFormControlInput1" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="exampleFormControlInput1"
            placeholder="name@example.com">
        </div>
        <div class="phone d-inline-block w-50 ps-2">
          <label for="exampleFormControlInput2" class="form-label">Phone</label>
          <input v-model="phone" type="text" class="form-control" id="exampleFormControlInput2" maxlength="11">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Credit Card Number</label>
        <div id="creditCardNumber" class="form-control"></div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-6">
            <label class="form-label">Expire Date</label>
            <div id="expireDate" class="form-control"></div>
          </div>
          <div class="col-6">
            <label class="form-label">CVV</label>
            <div id="cvv" class="form-control"></div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-block mt-4" @click.prevent="payWithCreditCard">Pay with Credit Card</button>
    </form>
  </div>
</template>

<script>
import { store } from '../store';
import axios from 'axios';
import braintree from 'braintree-web';
export default {
  data() {
    return {
      store,
      hostedFieldInstance: false,
      name: '',
      address: '',
      email: '',
      phone: '',
      productForPay: []
    }
  },
  mounted() {
    this.elementsForPay()
    axios.get(`${this.store.apiBaseUrl}/api/order`).then(resp => {
      braintree.client.create({
        authorization: resp.data.token
      })
        .then(clientInstance => {
          let options = {
            client: clientInstance,
            styles: {
              input: {
                'font-size': '14px',
                'font-family': 'Open Sans'
              }
            },
            fields: {
              number: {
                selector: '#creditCardNumber',
                placeholder: 'Enter Credit Card'
              },
              cvv: {
                selector: '#cvv',
                placeholder: 'Enter CVV'
              },
              expirationDate: {
                selector: '#expireDate',
                placeholder: '00 / 0000'
              }
            }
          }
          return braintree.hostedFields.create(options)
        })
        .then(hostedFieldInstance => {
          // @TODO - Use hostedFieldInstance to send data to Braintree
          this.hostedFieldInstance = hostedFieldInstance;
        })
        .catch(err => {
        });
    })
  },
  methods: {
    elementsForPay() {
      this.store.state.cart.forEach(product => {
        this.productForPay.push({
          "id": product.id,
          "quantity": product.quantity
        })
      });
    },
    payWithCreditCard() {
      if (this.hostedFieldInstance) {
        this.hostedFieldInstance.tokenize().then(payload => {
          if (this.store.state.ordable) {
            axios.post('http://127.0.0.1:8000/api/payment', {
              "token": payload.nonce,
              "products": this.productForPay,
              "name": this.name,
              "phone": this.phone,
              "email": this.email,
              "address": this.address
            }).then(resp => {
              this.store.state.cart = [];
              this.store.updateLocalStorage();
              this.store.ordable();
              this.$router.push('/state');


            })
          } else {
            alert('Le quantità dei prodotti devono essere maggiori di 0');
          }
        })
          .catch(err => {
            console.error(err);
          })
      }
    }
  }
}
</script>
