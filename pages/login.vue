<script setup lang="ts">
import { navigateTo } from '#app';
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import logo from "@/assets/images/regesterLogo.png"
import effect from "@/assets/images/effectlogin.png"

import { useAuthStore } from '~/store/auth'

definePageMeta({ layout: 'auth' })

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const success = ref(false);
const error = ref<string | null>(null);

const handleLogin = async () => {
    error.value = null;
    try {
        await auth.login(email.value, password.value);

        success.value = true;
        email.value = '';
        password.value = '';

        await navigateTo('/');
    } catch (err: any) {
        error.value = "Login failed. Please try again.";
    }
};
</script>

<template>
    <div class="min-w-[100%] min-h-[100vh] flex items-center justify-center gap-48 relative">


        <Card class="w-full max-w-xl z-10">
            <CardHeader>
                <CardTitle class="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account.</CardDescription>
            </CardHeader>

            <CardContent class="grid gap-4">
                <Alert v-if="success" class="mb-4 border-green-500">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>You have logged in successfully!</AlertDescription>
                </Alert>

                <Alert v-if="error" class="mb-4 border-red-500">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{{ error }}</AlertDescription>
                </Alert>

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

        <div>
            <img :src="logo" class="w-[22rem]" />
        </div>
        
        <img :src="effect" class="w-full absolute bottom-0" />
    </div>
</template>
