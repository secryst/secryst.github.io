<script setup lang="ts">
import { computed, ref } from "vue";

export interface ZooEntry {
  id: string
  task: "diacritization" | "g2p" | "translit"
  tier: "teacher" | "student"
  reveals: string
  quality: string
}

const props = defineProps<{ entries: ZooEntry[] }>();

const query = ref("");
const task = ref<"all" | ZooEntry["task"]>("all");

const tasks = [
  { key: "all", label: "All" },
  { key: "diacritization", label: "Diacritization" },
  { key: "g2p", label: "G2P" },
  { key: "translit", label: "Translit" },
] as const;

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return props.entries.filter((e) => {
    if (task.value !== "all" && e.task !== task.value) return false;
    if (!q) return true;
    return (
      e.id.toLowerCase().includes(q) ||
      e.reveals.toLowerCase().includes(q) ||
      e.quality.toLowerCase().includes(q)
    );
  });
});
</script>

<template>
  <div class="browser">
    <div class="controls">
      <input
        v-model="query"
        class="search"
        type="search"
        placeholder="Filter ids, scripts, metrics…"
        aria-label="Filter models"
      />
      <div class="chips" role="group" aria-label="Filter by task">
        <button
          v-for="t in tasks"
          :key="t.key"
          type="button"
          class="chip"
          :class="{ 'is-active': task === t.key }"
          :aria-pressed="task === t.key"
          @click="task = t.key"
        >{{ t.label }}</button>
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>id / family</th><th>reveals</th><th>measured quality</th></tr>
        </thead>
        <tbody>
          <tr v-for="e in filtered" :key="e.id">
            <td>
              <code>{{ e.id }}</code>
              <span class="badge" :class="e.tier === 'teacher' ? 'badge-v1' : ''">{{ e.tier }}</span>
            </td>
            <td>{{ e.reveals }}</td>
            <td>{{ e.quality }}</td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="3" class="empty">No model matches — but every id that exists resolves through the index.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="count">{{ filtered.length }} of {{ entries.length }} entries</p>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}
.search {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  background: var(--color-panel);
  color: var(--color-ink);
  min-width: 16rem;
  flex: 1;
}
.search:focus-visible {
  outline: 2px solid var(--color-violet);
  outline-offset: 1px;
}
.chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.chip {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--color-line);
  background: var(--color-panel);
  color: var(--color-slate);
  cursor: pointer;
}
.chip.is-active {
  color: var(--color-violet);
  border-color: var(--color-violet);
}
.chip:focus-visible {
  outline: 2px solid var(--color-violet);
  outline-offset: 2px;
}
.table-wrap { overflow-x: auto; }
.table-wrap table { margin: 0; }
.badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  border: 1px solid var(--color-line);
  color: var(--color-slate);
  background: var(--color-panel);
  margin-left: 0.45rem;
  vertical-align: middle;
}
.badge-v1 {
  background: var(--spectral);
  color: #fff;
  border: 0;
}
.empty { color: var(--color-faint); font-style: italic; }
.count {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-faint);
  margin: 0.6rem 0 0;
}
</style>
