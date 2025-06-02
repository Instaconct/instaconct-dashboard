<script setup>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const donutData = {
  labels: ['Direct', 'Referral', 'Social'],
  datasets: [
    {
      label: 'Traffic Sources',
      data: [55, 30, 15],
      backgroundColor: ['#4ade80', '#60a5fa', '#f87171'],
      hoverOffset: 4,
    },
  ],
}

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <div class="w-full h-70">
    <Doughnut :data="donutData" :options="donutOptions" />
  </div>
</template>
