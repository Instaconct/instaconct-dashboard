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
    <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <UserTable />
    </div>
  </div>
</template>
