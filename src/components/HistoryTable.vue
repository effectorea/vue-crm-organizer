<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{'amount' | localize}}</th>
        <th>{{'date' | localize}}</th>
        <th>{{'category' | localize}}</th>
        <th>{{'type' | localize}}</th>
        <th>{{'open' | localize}}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(rec, index) in records" :key="rec.id">
        <td>{{index + 1}}</td>
        <td>{{rec.amount | currency('RUB')}}</td>
        <td>{{rec.date | date}}</td>
        <td>{{rec.categoryName}}</td>
        <td>
              <span class="white-text badge"
                    :class="[rec.typeClass]"
              >{{rec.typeText}}</span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
            class="btn-small btn"
            @click="$router.push('/detail/' + rec.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'historyTable',
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>