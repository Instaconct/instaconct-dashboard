<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const barData = {
  labels: ['month', 'Two weeks', 'week', 'today'],
  datasets: [
    {
      label: 'conversations',
      data: [12, 19, 3, 5],
      backgroundColor: ['#f87171', '#60a5fa', '#facc15', '#34d399'],
    },
  ],
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <div class="w-full h-70">
    <Bar :data="barData" :options="barOptions" />
  </div>
</template>
