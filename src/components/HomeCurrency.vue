<template>
  <div>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">{{'currencyRate' | localize}}</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>{{'currency' | localize}}</th>
              <th>{{'rate' | localize}}</th>
              <th>{{'date' | localize}}</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{rates[cur].toFixed(4)}}</td>
              <td>{{date | date }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
}
</script>