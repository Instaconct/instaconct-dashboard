<script setup>
import { useRoute } from 'vue-router'
import AppSidebar from '~/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import Ellipse1Img from "@/assets/images/Ellipse1.png"
import Ellipse2Img from "@/assets/images/Ellipse2.png"

// get current route
const route = useRoute()

// extract the last part of the path
const currentPage = computed(() => {
  const segments = route.path.split('/')
  return segments[segments.length - 1] || 'Dashboard'
})

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="relative">
      <header
        class="z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  instaconect
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{{ currentPage }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class=" z-10 flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </div>
      <!-- <img :src="Ellipse1Img" class="absolute bottom-0 right-0" />
      <img :src="Ellipse2Img" class="absolute top-0 left-0" /> -->
    </SidebarInset>
  </SidebarProvider>
</template>
