<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ text: string; label?: string }>();
const copied = ref(false);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1600);
  } catch {
    // clipboard unavailable (insecure context) — stay silent
  }
}
</script>

<template>
  <button class="copy-btn" type="button" @click="copy">
    {{ copied ? "copied ✓" : (label ?? "copy") }}
  </button>
</template>

<style scoped>
.copy-btn {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-faint);
  background: transparent;
  border: 1px solid var(--color-line);
  border-radius: 4px;
  padding: 0.22rem 0.55rem;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.copy-btn:hover {
  color: var(--color-ink);
  border-color: var(--color-faint);
}
.copy-btn:focus-visible {
  outline: 2px solid var(--color-violet);
  outline-offset: 2px;
}
</style>
