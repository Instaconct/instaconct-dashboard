<script>
export const description
  = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'

definePageMeta({ layout: 'default' })

import LineChart from '~/components/LineChart.vue'
import BarChart from '~/components/BarChart.vue'
import DonutChart from '~/components/DonutChart.vue'
import UserTable from '~/components/UserTable.vue'
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div class="bg-muted/50 aspect-video rounded-xl p-2">
        <BarChart />
      </div>
      <div class="bg-muted/50 aspect-video rounded-xl p-2">
        <DonutChart />
      </div>
      <div class="bg-muted/50 aspect-video rounded-xl p-2">
        <LineChart />
      </div>
    </div>

    <!-- 2 box -->
    <div class="space-y-6">
      <!-- Box 1 -->
      <div class="grid grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-sm">
        <div>
          <p class="text-3xl font-semibold">20</p>
          <p class="text-sm text-muted-foreground">0.20% from last day</p>
        </div>
        <div>
          <p class="text-3xl font-semibold">6000</p>
          <p class="text-sm text-muted-foreground">60% from last month</p>
        </div>
        <div>
          <p class="text-3xl font-semibold">10</p>
          <p class="text-sm text-muted-foreground">10% from last week</p>
        </div>
        <div>
          <p class="text-3xl font-semibold">500 +</p>
          <p class="text-sm text-muted-foreground">chat solved</p>
        </div>
      </div>

      <!-- Box 2 -->
      <div class="grid grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-sm">
        <div>
          <p class="text-3xl font-semibold">3 s</p>
          <p class="text-sm text-muted-foreground">first response time</p>
        </div>
        <div>
          <p class="text-3xl font-semibold">5 s</p>
          <p class="text-sm text-muted-foreground">response time</p>
        </div>
        <div>
          <p class="text-3xl font-semibold">10 s</p>
          <p class="text-sm text-muted-foreground">wait time</p>
        </div>
        <div>
          <p class="text-3xl font-semibold">60 s</p>
          <p class="text-sm text-muted-foreground">resolution time</p>
        </div>
      </div>
    </div>

    <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <UserTable />
    </div>
  </div>
</template>
