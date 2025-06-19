<script setup>
import { Plus } from 'lucide-vue-next'
import { useDashboardStore } from '~/store/dashboard';
const dashboard = useDashboardStore()

// // meta connect 
async function handleMetaConnect() {
    await dashboard.metaConnect();

    if (dashboard.redirectUrl) {
        window.location.href = dashboard.redirectUrl;
    } else {
        console.log("Meta Connect Data:", dashboard.metaConnectData);
    }
}
</script>

<template>
    <div class="min-h-[100vh] relative">
        <div class="min-w-[100%] bg-muted/50 p-6 rounded-lg flex flex-col gap-2 mb-3">
            <h1 class="text-[#020617] font-bold text-2xl">channels</h1>
            <h6 class="text-[#64748B]">You can communicate with your social media</h6>
        </div>
        <div class="min-w-[100%] bg-muted/10 p-6 rounded-lg flex gap-2 mb-3">
            <Button @click="handleMetaConnect" class="cursor-pointer w-[12rem] bg-[#0F172A] hover:bg-[#284372]">
                <Plus class="w-4 h-4" />
                Facebook
            </Button>

            <Button class="cursor-pointer w-[12rem] bg-[#0F172A]  hover:bg-[#284372]">
                <Plus class="w-4 h-4" />
                WhatsApp
            </Button>

            <Button class="cursor-pointer w-[12rem] bg-[#0F172A]  hover:bg-[#284372]">
                <Plus class="w-4 h-4" />
                sdk
            </Button>

            <Button class="cursor-pointer w-[12rem] bg-[#F1F5F9] text-[#0F172A] hover:bg-gray-200 ">
                <Plus class="w-4 h-4" />
                add
            </Button>
        </div>
        <div class="">
            <table
                class="min-w-full table-auto bg-white text-sm text-gray-800 border border-gray-200 rounded-md overflow-hidden">
                <thead class="bg-gray-50 text-left text-gray-700">
                    <tr>
                        <th class="p-4">Name</th>
                        <th class="p-4">Token</th>
                        <th class="p-4">Last used</th>
                        <th class="p-4">Created</th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="border-t hover:bg-gray-50">
                        <td class="p-4">Publishable key</td>
                        <td class="p-4 flex items-center gap-2">
                            <span class="bg-gray-100 text-xs font-medium px-2 py-0.5 rounded">key</span>
                            <span class="truncate max-w-[300px]">p_test_5lPlXs1KRs5JKDwqFztEPsUcnxpvTZcgogEoV...</span>
                        </td>
                        <td class="p-4">May 11, 2025</td>
                        <td class="p-4">May 11, 2024</td>

                    </tr>

                    <tr class="border-t hover:bg-gray-50">
                        <td class="p-4">Secret key</td>
                        <td class="p-4 flex items-center gap-2">
                            <span class="bg-gray-100 text-xs font-medium px-2 py-0.5 rounded">key</span>
                            <span class="truncate max-w-[300px]">p_test_5lPlXs1KRs5JKDwqFztEPsUcnxpvTZcgogEoV...</span>
                        </td>
                        <td class="p-4">May 11, 2025</td>
                        <td class="p-4">May 11, 2024</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>