<script lang="ts" >
export const description
    = 'A sign up form with first name, last name, email and password inside a card. There\'s an option to sign up with GitHub and a link to login if you already have an account'
export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'
</script>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


definePageMeta({ layout: 'auth' })
</script>
<template>
    <Card class="mx-auto min-w-xl">
        <CardHeader>
            <CardTitle class="text-xl">
                Sign Up
            </CardTitle>
            <CardDescription>
                Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid gap-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                        <Label for="first-name">First name</Label>
                        <Input id="first-name" placeholder="islam" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="last-name">Last name</Label>
                        <Input id="last-name" placeholder="khalil" required />
                    </div>
                </div>
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="es@example.com" required />
                </div>
                <div class="grid gap-2">
                    <Label for="phone">phone number</Label>
                    <Input id="phone" type="tel" placeholder="+201123526875" required />
                </div>
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
                <Button type="submit" class="w-full">
                    Create an account
                </Button>
                <!-- <Button variant="outline" class="w-full">
                    Sign up with GitHub
                </Button> -->
            </div>
            <div class="mt-4 text-center text-sm">
                Already have an account?
                <NuxtLink to="/login" class="underline">
                    Sign in
                </NuxtLink>
            </div>
        </CardContent>
    </Card>
</template>
