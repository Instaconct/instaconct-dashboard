<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useDashboardStore } from '~/store/dashboard'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Eye, Search, Filter } from 'lucide-vue-next'
import EditAgentSheet from '~/components/EditAgentSheet.vue'

const auth = useAuthStore()
const dashboard = useDashboardStore()

const organizationName = auth?.user?.organization?.name

// State for filtering and pagination
const searchQuery = ref('')
const selectedRole = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sheet state
const sheetOpen = ref(false)
const selectedUser = ref(null)
const isEditing = ref(false)

// Mock data for pagination (you can replace this with real pagination from API)
const totalItems = ref(100)

// Computed properties
const filteredEmployees = computed(() => {
  let filtered = dashboard.agents || []

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(agent =>
      agent.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by role
  if (selectedRole.value !== 'all') {
    filtered = filtered.filter(agent => agent.role === selectedRole.value)
  }

  return filtered
})

const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredEmployees.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredEmployees.value.length / itemsPerPage.value)
})

// Badge variant based on status
const getStatusVariant = (status) => {
  switch (status?.toLowerCase()) {
    case 'active': return 'default'
    case 'idle': return 'secondary'
    default: return 'secondary'
  }
}

// Methods
const openAddSheet = () => {
  selectedUser.value = { name: '', email: '', phone: '' }
  isEditing.value = false
  sheetOpen.value = true
}

const openEditSheet = (user) => {
  selectedUser.value = user
  isEditing.value = true
  sheetOpen.value = true
}

const handleSave = () => {
  sheetOpen.value = false
  dashboard.fetchAgents() // Refresh the list
}

const deleteUser = async (user) => {
  await dashboard.deleteAgent(user.id)
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(() => {
  dashboard.fetchAgents()
})
</script>

<template>
  <div class="min-h-[100vh] p-6 bg-background relative overflow-hidden">
    <!-- Blue glow effect -->
    <div class="absolute w-[803px] h-[803px] bg-[#73A8FF] blur-[800px] rounded-full pointer-events-none"
      style="top: 546px; left: 959px;"></div>
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-foreground">{{ organizationName }}</h1>
        <p class="text-muted-foreground">Here's a list of your people!</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-6 mb-6 border-b">
      <button class="pb-2 text-sm font-medium text-foreground border-b-2 border-primary">
        Overview
      </button>
      <button class="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        managers
      </button>
      <button class="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        agents
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <!-- Search -->
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input v-model="searchQuery" placeholder="Filter Employee..." class="pl-10 w-64" />
        </div>
      </div>

      <Button @click="openAddSheet" class="gap-2">
        <Plus class="h-4 w-4" />
        Add Employee
      </Button>
    </div>

    <!-- Table -->
    <div class="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-transparent">
            <TableHead class="w-[200px]">Name</TableHead>
            <TableHead class="w-[150px]">Employee-id</TableHead>
            <TableHead class="w-[100px]">role</TableHead>
            <TableHead class="w-[100px]">Status</TableHead>
            <TableHead class="w-[80px]">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="employee in paginatedEmployees" :key="employee.id" class="hover:bg-muted/50">
            <TableCell class="font-medium">{{ employee.name }}</TableCell>
            <TableCell class="text-muted-foreground">#{{ employee.id || Math.random().toString(36).substr(2,
              6).toUpperCase() }}</TableCell>
            <TableCell class="capitalize">{{ employee.role || 'agent' }}</TableCell>
            <TableCell>
              <Badge :variant="getStatusVariant(employee.status || 'active')" class="capitalize">
                {{ employee.status || 'active' }}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="openEditSheet(employee)">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="deleteUser(employee)" class="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-muted-foreground">
        {{ ((currentPage - 1) * itemsPerPage) + 1 }} of {{ filteredEmployees.length }} row(s) selected.
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Rows per page</span>
        <Select v-model="itemsPerPage">
          <SelectTrigger class="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span class="text-sm text-muted-foreground">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <div class="flex gap-1">
          <Button variant="outline" size="sm" :disabled="currentPage <= 1" @click="changePage(currentPage - 1)"
            class="h-8 w-8 p-0">
            ‹
          </Button>
          <Button variant="outline" size="sm" :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)"
            class="h-8 w-8 p-0">
            ›
          </Button>
          <Button variant="outline" size="sm" :disabled="currentPage >= totalPages" @click="changePage(totalPages)"
            class="h-8 w-8 p-0">
            ››
          </Button>
        </div>
      </div>
    </div>

    <!-- Edit/Add Employee Sheet -->
    <EditAgentSheet :user="selectedUser" :is-editing="isEditing" v-model="sheetOpen" @save="handleSave" />
  </div>
</template>
