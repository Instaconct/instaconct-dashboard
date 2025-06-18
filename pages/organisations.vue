<script setup>
import UserTable from '~/components/UserTable.vue'
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore();

const organizationName = auth.user.organization.name;

</script>

<template>

    <div class="min-h-[100vh]">
        <div class="min-w-[100%] bg-muted/50 p-6 rounded-lg flex flex-col gap-2 mb-6">
            <h1 class="text-[#020617] font-bold text-2xl">{{ organizationName }} organization</h1>
            <h6 class="text-[#64748B]">Here’s a list of your people!</h6>
        </div>
        <UserTable />
    </div>

</template>
