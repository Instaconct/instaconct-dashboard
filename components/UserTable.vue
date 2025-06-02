<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import EditAgentSheet from './EditAgentSheet.vue'
import { useDashboardStore } from '~/store/dashboard'
import { MoreHorizontal, Plus } from 'lucide-vue-next'

const dashboard = useDashboardStore()
onMounted(() => {
    dashboard.fetchAgents()
})

const showDropdown = ref(null)
const selectedUser = ref(null)
const sheetOpen = ref(false)
const isEditing = ref(false)

const toggleDropdown = (userId) => {
    showDropdown.value = showDropdown.value === userId ? null : userId
}

const openEditSheet = (user) => {
    selectedUser.value = user
    isEditing.value = true
    sheetOpen.value = true
    showDropdown.value = null
}

const openAddSheet = () => {
    selectedUser.value = { name: '', username: '' }
    isEditing.value = false
    sheetOpen.value = true
}

const closeEditSheet = () => {
    sheetOpen.value = false
    selectedUser.value = null
}

const handleSave = (updatedUser) => {
    console.log('Saved user:', updatedUser)
    closeEditSheet()
}

const deleteUser = async (user) => {
    await dashboard.deleteAgent(user.id);
    console.log('Delete user:', user)
}

const handleClickOutside = (event) => {
    if (showDropdown.value !== null) {
        const dropdownClicked = event.target.closest('.dropdown-menu')
        const triggerClicked = event.target.closest('.dropdown-trigger')
        if (!dropdownClicked && !triggerClicked) {
            showDropdown.value = null
        }
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="overflow-x-auto rounded-2xl shadow">
        <EditAgentSheet :user="selectedUser" :is-editing="isEditing" v-model="sheetOpen" @save="handleSave" />

        <div class="flex justify-start  min-w-[100%] sticky top-0 z-30 bg-gray-100">
            <Button @click="openAddSheet" class="m-2 cursor-pointer min-w-[12rem]">
                <Plus class="w-4 h-4" />
                Add Employee
            </Button>
        </div>

        <table class="min-w-full min-h-full bg-white text-sm">
            <thead class="bg-gray-100 text-black text-left min-w-[100%] sticky top-13 z-30">
                <tr>
                    <th class="p-4">Agent name </th>
                    <th class="p-4">Role</th>
                    <th class="p-4">email</th>
                    <th class="p-4">Phone</th>
                    <th class="p-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in dashboard.agents" :key="user.id" class="border-t hover:bg-gray-50">
                    <td class="p-4">{{ user.name }}</td>
                    <td class="p-4">{{ user.role }}</td>
                    <td class="p-4">{{ user.email }}</td>
                    <td class="p-4">{{ user.phone }}</td>
                    <td class="p-4">
                        <div class="relative inline-block text-left">
                            <button class="p-2 cursor-pointer rounded-full hover:bg-gray-200"
                                @click.stop="toggleDropdown(user.id)">
                                <MoreHorizontal class="w-5 h-5" />
                            </button>
                            <div v-if="showDropdown === user.id"
                                class="dropdown-menu absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-48 z-10">
                                <ul class="text-sm text-gray-700">
                                    <li @click.stop="openEditSheet(user)" class="cursor-pointer p-2 hover:bg-gray-100">
                                        Update</li>
                                    <li @click.stop="() => { deleteUser(user); showDropdown = null }"
                                        class="cursor-pointer p-2 hover:bg-gray-100">Delete</li>
                                </ul>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
