<script lang="ts">
export const description = 'A simple login form with email and password. The submit button says "Sign in".'
export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useAuth } from '@/composables/useAuth'

definePageMeta({ layout: 'auth' })

const router = useRouter()

const { login } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        await login(email.value, password.value)
    } catch (err) {
        alert(err.message || 'Login failed')
    }
}


onMounted(() => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user')
        if (user) {
            router.replace('/')
        }
    }
})


</script>

<template>
    <Card class="w-full max-w-xl">
        <CardHeader>
            <CardTitle class="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" v-model="email" type="email" placeholder="es@example.com" required />
            </div>
            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input id="password" v-model="password" type="password" required />
            </div>
        </CardContent>
        <CardFooter>
            <Button class="w-full" @click="handleLogin">Sign in</Button>
        </CardFooter>
        <div class="text-center text-sm pb-4">
            You don't have an account?
            <NuxtLink to="/register" class="underline">Register now</NuxtLink>
        </div>
    </Card>
</template>
