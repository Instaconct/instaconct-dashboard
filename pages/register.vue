<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { useAuthStore } from '~/store/auth'

definePageMeta({ layout: 'auth' })

const router = useRouter();
const auth = useAuthStore();

const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const organization = ref({ name: "" });

const success = ref(false);
const error = ref<string | null>(null);

const submit = async () => {
    error.value = null;
    try {
        await auth.register(name.value, email.value, phone.value, password.value, organization.value);
        success.value = true;

        name.value = "";
        email.value = "";
        phone.value = "";
        password.value = "";
        organization.value = { name: "" };

        setTimeout(() => {
            router.push("/");
        }, 2000);

    } catch (err: any) {
        error.value = err.message || "Registration failed. Please try again.";
    }
};
</script>

<template>
    <Card class="mx-auto min-w-xl">
        <CardHeader>
            <CardTitle class="text-xl">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
            <Alert v-if="success" class="mb-4 border-green-500">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Account created successfully! Redirecting...</AlertDescription>
            </Alert>

            <Alert v-if="error" class="mb-4 border-red-500">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <form @submit.prevent="submit">
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input v-model="name" id="name" type="text" placeholder="islam khalil" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input v-model="email" id="email" type="email" placeholder="es@example.com" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="phone">Phone number</Label>
                        <Input v-model="phone" id="phone" placeholder="+201123526875" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input v-model="password" id="password" type="password" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="organization">Organization</Label>
                        <Input v-model="organization.name" id="organization" placeholder="org name" />
                    </div>
                    <Button type="submit" class="w-full">Create an account</Button>
                </div>
            </form>

            <div class="mt-4 text-center text-sm">
                Already have an account?
                <NuxtLink to="/login" class="underline">Sign in</NuxtLink>
            </div>
        </CardContent>
    </Card>
</template>
