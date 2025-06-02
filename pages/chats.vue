<script setup lang="ts">
import { useDashboardStore } from '~/store/dashboard'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-vue-next'

const dashboard = useDashboardStore()
const { $socket } = useNuxtApp()
const message = ref('')
const isConnected = computed(() => $socket.isSocketConnected.value)

onMounted(() => {
    const token = useCookie('accessToken').value
    if (!token) return console.error('[❌] Token not found')

    $socket.connectSocket(token)
    dashboard.fetchTickets()

    watch(
        [() => dashboard.selectedTicket, () => isConnected],
        ([ticket, connected]) => {
            if (ticket?.id && connected) {
                console.log('[🔄] Joining conversation room for ticket:', ticket.id)
                $socket.joinConversation(ticket.id)

                dashboard.messages = []

                $socket.offMessage()
                $socket.onMessage((msg) => {
                    dashboard.messages.push(msg)
                    scrollToBottom()
                })
            }
        },
        { immediate: true }
    )


    $socket.onMessage((msg) => {
        dashboard.messages.push(msg)
        scrollToBottom()
    })
})

function sendMessage() {
    if (!message.value.trim()) return

    $socket.sendMessage(message.value)

    dashboard.messages.push({
        id: Date.now(),
        content: message.value,
        senderType: 'AGENT',
    })

    message.value = ''
    scrollToBottom()
}

function scrollToBottom() {
    nextTick(() => {
        const container = document.querySelector('.chat-scroll')
        if (container) container.scrollTop = container.scrollHeight
    })
}

function handleTicketClick(ticket: any) {
    dashboard.selectTicket(ticket)
}


// meta connect 
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
    <div class="flex flex-col gap-4">
        <Button @click="handleMetaConnect" class="max-w-[15rem] cursor-pointer"> 
            connect with facebook 
        </Button>

        <div class="grid grid-cols-12 min-h-screen gap-2">
            <!-- Sidebar -->
            <aside class="col-span-3 bg-[#FAFAFA] p-4 rounded-lg overflow-y-scroll h-[100vh]">
                <h1 class="text-lg font-semibold">Tickets</h1>

                <div v-if="dashboard.loading" class="flex justify-center items-center h-full">
                    <svg class="animate-spin h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                </div>

                <div v-else class="space-y-3 mt-4">
                    <div class="mt-2">
                        <select v-model="dashboard.ticketStatusFilter" class="w-full p-2 border rounded text-sm">
                            <option value="ALL">All</option>
                            <option value="OPEN">Open</option>
                            <option value="ASSIGNED">Assigned</option>
                        </select>
                    </div>

                    <div v-for="ticket in dashboard.filteredTickets" :key="ticket.id"
                        class="p-3 rounded-lg cursor-pointer transition-all flex items-center gap-2"
                        :class="ticket.id === dashboard.selectedTicket?.id ? 'bg-gray-200' : 'hover:bg-gray-100'"
                        @click="handleTicketClick(ticket)">
                        <div
                            class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                            {{ ticket.customer.name?.[0]?.toUpperCase() || 'C' }}
                        </div>
                        <div class="text-sm">
                            <p class="font-semibold">{{ ticket.customer.name }}</p>
                            <p class="text-gray-500 text-xs">{{ ticket.customer.email }}</p>
                            <p class="text-gray-400 text-xs">From: {{ ticket.source }}</p>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Chat Area -->
            <main class="col-span-6 bg-[#FAFAFA] p-4 rounded-lg flex flex-col">
                <template v-if="dashboard.selectedTicket">
                    <!-- Chat Header -->
                    <div class="flex items-center gap-3 border-b pb-3 mb-3">
                        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                            {{ dashboard.selectedTicket.customer.name?.[0]?.toUpperCase() }}
                        </div>
                        <div class="text-sm">
                            <p class="font-semibold text-black">{{ dashboard.selectedTicket.customer.name }}</p>
                            <p class="text-gray-400 text-xs">online</p>
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-scroll max-h-[70vh] space-y-3 chat-scroll pr-2">
                        <div v-for="msg in dashboard.messages" :key="msg.id" :class="[
                            'flex',
                            msg.senderType === 'AGENT' ? 'justify-end' : 'justify-start'
                        ]">
                            <div :class="[
                                'max-w-[70%] px-4 py-2 rounded-xl text-white text-sm',
                                msg.senderType === 'AGENT' ? 'bg-gray-900' : 'bg-gray-400'
                            ]">
                                {{ msg.content }}
                            </div>
                        </div>
                    </div>

                    <!-- Input -->
                    <div class="mt-4">
                        <Textarea v-model="message" placeholder="Type your message..."
                            class="w-full border rounded-lg p-2" />
                        <Button class="mt-2 w-full" @click="sendMessage" :disabled="!message.trim()">
                            Send Message
                        </Button>
                    </div>
                </template>

                <template v-else>
                    <!-- Welcome -->
                    <div class="flex flex-col items-center justify-center h-full text-gray-500">
                        <MessageCircle class="w-20 h-20 mb-4 text-black" />
                        <h2 class="text-xl font-semibold">Select a ticket to start chatting</h2>
                        <p class="text-sm mt-2">Choose a conversation from the left panel</p>
                    </div>
                </template>
            </main>

            <!-- Info Panel -->
            <aside class="col-span-3 bg-[#FAFAFA] p-4 rounded-lg">
                <template v-if="dashboard.selectedTicket">
                    <div class="bg-white rounded-lg p-4 space-y-2 text-sm">
                        <h3 class="font-semibold">Contact Info</h3>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-sm">
                                {{ dashboard.selectedTicket.customer.name?.[0]?.toUpperCase() || 'C' }}
                            </div>
                            <div>
                                <p class="font-medium">{{ dashboard.selectedTicket.customer.name }}</p>
                                <p class="text-gray-500 text-xs">Customer</p>
                            </div>
                        </div>
                        <p class="text-gray-600 text-xs">{{ dashboard.selectedTicket.customer.email }}</p>
                        <p class="text-gray-600 text-xs">{{ dashboard.selectedTicket.customer.phone }}</p>
                        <p class="text-gray-400 text-xs">ID: {{ dashboard.selectedTicket.customer.id }}</p>
                        <p class="text-sm">Organization: {{ dashboard.selectedTicket.organization.name }}</p>
                    </div>
                </template>
            </aside>
        </div>
    </div>
</template>
