<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      <tr>
        <td>1</td>
        <td>10000</td>
        <td>02 december 2022</td>
        <td>Category name</td>
        <td>
              <span class="white-text badge"
                    :class="[type === 'outcome' ? 'red' : 'green']"
              >{{type === 'outcome' ? 'Расход' : 'Приход'}}</span>
        </td>
        <td>
          <button class="btn-small btn">
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
  data: () => ({
    type: 'income'
  }),
}
</script>