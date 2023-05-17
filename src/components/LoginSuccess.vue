<template>
  <div class="notification is-success" ref="notificationRef">
    <button class="delete" @click="close"></button>
    Login successful!
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'LoginSuccess',
  setup(_, { emit }) {
    const notificationRef = ref<HTMLElement | null>(null);

    const close = () => {
      emit('close');
    };

    onMounted(() => {
      const $delete = notificationRef.value?.querySelector('.delete') as HTMLElement | null;
      if ($delete) {
        $delete.addEventListener('click', () => {
          close();
        });
      }
    });

    return {
      notificationRef,
      close
    };
  },
});
</script>