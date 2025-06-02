<script setup>
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const chartData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            label: 'Sales',
            data: [20, 20, 12, 25],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4,
        },
    ],
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
}
</script>

<template>
    <div class="w-full h-70">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>
