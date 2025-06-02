<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

import { useRoute } from 'vue-router'
import { type LucideIcon } from 'lucide-vue-next'

const props = defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()

const route = useRoute()
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title"
        :data-state="route.path === item.url ? 'active' : undefined">
        <NuxtLink :to="item.url" class="w-full">
          <SidebarMenuButton :tooltip="item.title" class="w-full text-left">
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ item.title }}</span>
          </SidebarMenuButton>
        </NuxtLink>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>

<style scoped>
[data-state="active"] {
  background-color: #eeeeee;
  color: black;
  font-weight: bold;
  border-radius: 8px;
}
</style>
