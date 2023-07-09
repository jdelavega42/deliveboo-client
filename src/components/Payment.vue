<template>
  <div>
    <h1>Payment Form</h1>
    <form>

      <hr />
      <div class="form-group">
        <label>Credit Card Number</label>
        <div id="creditCardNumber" class="form-control"></div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-6">
            <label>Expire Date</label>
            <div id="expireDate" class="form-control"></div>
          </div>
          <div class="col-6">
            <label>CVV</label>
            <div id="cvv" class="form-control"></div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-block" @click.prevent="payWithCreditCard">Pay with Credit Card</button>
    </form>
  </div>
</template>

<script>
import braintree from 'braintree-web';
export default {
  data() {
    return {
      hostedFieldInstance: false
    }
  },
  mounted() {
    braintree.client.create({
      authorization: "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyT0RnNU56RTNNelFzSW1wMGFTSTZJalE1TVdJNU1Ua3pMV1JsTWprdE5HUTROUzA0WW1NekxUY3lOR0V3TkRjMFptSTNPQ0lzSW5OMVlpSTZJbXMxZUhScmVXWTBaRzF6WnprNWQza2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYXpWNGRHdDVaalJrYlhObk9UbDNlU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LmpSRi1oYXY4ZDZDd0FMeGt5MW12ZG0xME9jcXZUOHZDWkE2dnpISnJlNkhlRm9yMjZMR2NxekhsNTFiRWpZa1pjY3RXZ2JGNDBUT1B3ZmR4NDBzNC1RIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2s1eHRreWY0ZG1zZzk5d3kvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvazV4dGt5ZjRkbXNnOTl3eS9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6Ims1eHRreWY0ZG1zZzk5d3kiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2s1eHRreWY0ZG1zZzk5d3kifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiZGVsaXZlYm9vIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiZGVsaXZlYm9vIiwiY3VycmVuY3lJc29Db2RlIjoiRVVSIn19"
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
  },
  methods: {
    payWithCreditCard() {
      if (this.hostedFieldInstance) {
        this.hostedFieldInstance.tokenize().then(payload => {
          console.log(payload);
        })
          .catch(err => {
            console.error(err);

          })
      }
    }
  }
}
</script>
