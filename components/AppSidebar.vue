<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'

import {
  Home,
  User,
  MessageCircle,
  Building,
} from 'lucide-vue-next'

import logo from "../assets/images/logo.png"

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Organisations',
      url: '/Organisations',
      icon: Building,
    },
    {
      title: 'Chats',
      url: '/Chats',
      icon: MessageCircle,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <img :src="logo" :alt="instaconect" class="w-8 h-8 mx-auto my-2" />
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
