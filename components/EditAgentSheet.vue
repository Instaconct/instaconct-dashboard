<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import { useDashboardStore } from '~/store/dashboard'

const props = defineProps({
    user: Object,
    modelValue: Boolean,
    isEditing: Boolean
})

const emits = defineEmits(['update:modelValue', 'save'])

const store = useDashboardStore()

const localUser = ref({
    name: '',
    email: '',
    phone: ''
})

watch(
    () => props.user,
    (newUser) => {
        localUser.value = newUser
            ? { ...newUser }
            : { name: '', email: '', phone: '' }
    },
    { immediate: true }
)

const closeSheet = () => {
    emits('update:modelValue', false)
}

const saveChanges = async () => {
    try {
        if (props.isEditing) {
            await store.updateAgent(localUser.value.id, {
                name: localUser.value.name,
                email: localUser.value.email,
                phone: localUser.value.phone,
            })
            emits('save', localUser.value)
            closeSheet()
        } else {
            await store.addAgent({
                name: localUser.value.name,
                email: localUser.value.email,
                phone: localUser.value.phone,
            })
            emits('save', localUser.value)
            closeSheet()
        }
    } catch (error) {
        console.error('Error adding agent:', error)
    }
}

</script>

<template>
    <Sheet :open="modelValue" @update:open="$emit('update:modelValue', $event)">
        <SheetTrigger as-child>
            <button style="display: none"></button>
        </SheetTrigger>

        <SheetContent class="p-4">
            <SheetHeader>
                <SheetTitle>{{ isEditing ? 'Edit Agent' : 'Add New Agent' }}</SheetTitle>
                <SheetDescription>
                    {{
                        isEditing
                            ? "Edit the agent details below and click save when you're done."
                            : "Enter the new agent's details below and click save to add them."
                    }}
                </SheetDescription>
            </SheetHeader>

            <div class="grid gap-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">Name</Label>
                    <Input id="name" v-model="localUser.name" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="email" class="text-right">Email</Label>
                    <Input id="email" v-model="localUser.email" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="phone" class="text-right">Phone</Label>
                    <Input id="phone" v-model="localUser.phone" class="col-span-3" />
                </div>
            </div>

            <SheetFooter>
                <SheetClose as-child>
                    <Button @click="saveChanges" type="button">
                        {{ isEditing ? 'Save Changes' : 'Add Agent' }}
                    </Button>

                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>
