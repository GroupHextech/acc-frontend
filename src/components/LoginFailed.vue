<template>
  <div class="notification is-danger">
    <button class="delete"></button>
    Username or password is invalid!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginFailed',
  mounted() {
    (this.$el.querySelectorAll('.notification .delete') || []).forEach(($delete: any) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
      });
    });
  },
});
</script>
