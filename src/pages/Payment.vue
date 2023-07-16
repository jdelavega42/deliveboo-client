<template>
  <div class="container">
    <h2 class="text-success mt-5 fs-3 fw-bolder text-center text-uppercase">Pagamento</h2>
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
              <input id="form1" min="1" name="quantity" type="number" class="text-center form-control form-control-sm w-50"
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
    <div class=" text-end total me-5">
      <h2>Totale:</h2>
      <h3 class="">€ {{ store.state.total }}</h3>
    </div>


    <div class="position-relative">
      <form class="">

        <hr />
        <div class="">
          <div class="email d-inline-block w-50 pe-2">
            <label for="exampleFormControlInput3" class="form-label">Nome <span class="text-danger">*</span></label>
            <input v-model="name" type="text" class="form-control" id="exampleFormControlInput3">
          </div>
          <div class="phone d-inline-block w-50 ps-2">
            <label for="exampleFormControlInput4" class="form-label">Indirizzo <span class="text-danger">*</span></label>
            <input v-model="address" type="text" class="form-control" id="exampleFormControlInput4" maxlength="25">
          </div>
        </div>
        <div class="">
          <div class="email d-inline-block w-50 pe-2">
            <label for="exampleFormControlInput1" class="form-label">Email <span class="text-danger">*</span></label>
            <input v-model="email" type="email" class="form-control" id="exampleFormControlInput1"
              placeholder="name@example.com">
          </div>
          <div class="phone d-inline-block w-50 ps-2">
            <label for="exampleFormControlInput2" class="form-label">Telefono <span class="text-danger">*</span></label>
            <input v-model="phone" type="text" class="form-control" id="exampleFormControlInput2" maxlength="11">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Numero carta di credito <span class="text-danger">*</span></label>
          <div id="creditCardNumber" class="form-control"></div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-6">
              <label class="form-label">Scadenza <span class="text-danger">*</span></label>
              <div id="expireDate" class="form-control"></div>
            </div>
            <div class="col-6">
              <label class="form-label">CVV <span class="text-danger">*</span></label>
              <div id="cvv" class="form-control"></div>
            </div>
          </div>
          <p id="card-message" class="d-none  text-danger fw-bold mt-2">Controlla i campi della carta di
            credito</p>
        </div>
        <button class="btn btn-primary btn-block my-2" :data-bs-toggle="store.state.ordable ? '' : 'modal'"
          data-bs-target="#errorPayment" @click.prevent="payWithCreditCard">Paga ora</button>
      </form>
      <div v-if="this.loading"
        class="d-flex justify-content-center align-items-center position-absolute w-100 h-100 bg-white bg-opacity-50 top-50 start-50 translate-middle">
        <div class="fs-1 fw-bold">
          CARICAMENTO

        </div>
      </div>
    </div>

  </div>

  <!-- MODAL -->
  <div class="modal fade" :class="store.state.ordable ? 'd-none' : ''" id="errorPayment" tabindex="-1"
    aria-labelledby="errorPayment" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Attenzione</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Il tuo carrello è vuoto
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>

        </div>
      </div>
    </div>
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
      productForPay: [],
      loading: false
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
      if (!this.hostedFieldInstance._state.fields.cvv.isValid || !this.hostedFieldInstance._state.fields.number.isValid || !this.hostedFieldInstance._state.fields.expirationDate.isValid) {
        let error = document.getElementById('card-message')
        error.classList.remove('d-none')

      }
      else if (this.hostedFieldInstance) {
        let error = document.getElementById('card-message')
        error.classList.add('d-none')
        this.loading = true;


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


            }).finally(() => {
              this.loading = false;

            })
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
