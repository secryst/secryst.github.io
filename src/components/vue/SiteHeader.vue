<script setup lang="ts">
defineProps<{ currentPath: string }>();

const links = [
  { href: '/', label: 'Overview' },
  { href: '/primer/', label: 'Primer' },
  { href: '/spec/', label: 'Specification' },
  { href: '/crystals/', label: 'Crystals' },
  { href: '/models/', label: 'Models' },
  { href: '/about/', label: 'About' },
];

const open = defineModel<boolean>('open', { default: false });
</script>

<template>
  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="/" aria-label="secryst home">
        <span class="brand-gem" aria-hidden="true"></span>secryst
      </a>
      <nav class="nav" aria-label="Primary">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          :class="{ 'is-active': currentPath === l.href }"
        >{{ l.label }}</a>
      </nav>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="site-nav"
        @click="open = !open"
      >
        <span class="visually-hidden">Menu</span>
        <span class="menu-bar" :class="{ 'menu-open-a': open }"></span>
        <span class="menu-bar" :class="{ 'menu-open-b': open }"></span>
      </button>
    </div>
    <nav id="site-nav" class="nav-drawer" :class="{ 'is-open': open }" aria-label="Mobile">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        :class="{ 'is-active': currentPath === l.href }"
        @click="open = false"
      >{{ l.label }}</a>
    </nav>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(250, 251, 252, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-line);
}
.topbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 2.25rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}
.brand:hover { text-decoration: none; }
.brand-gem {
  width: 18px;
  height: 18px;
  background: var(--spectral);
  clip-path: polygon(50% 0, 100% 38%, 50% 100%, 0 38%);
}
.nav {
  display: flex;
  gap: 1.4rem;
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: 500;
}
.nav a {
  color: var(--color-slate);
  padding: 0.3rem 0;
  border-bottom: 2px solid transparent;
}
.nav a:hover { color: var(--color-ink); text-decoration: none; }
.nav a.is-active {
  color: var(--color-ink);
  border-bottom-color: var(--color-violet);
}
.menu-toggle {
  display: none;
  margin-left: auto;
  background: transparent;
  border: 1px solid var(--color-line);
  border-radius: 6px;
  width: 38px;
  height: 34px;
  padding: 0;
  cursor: pointer;
  position: relative;
}
.menu-toggle:focus-visible { outline: 2px solid var(--color-violet); outline-offset: 2px; }
.menu-bar {
  position: absolute;
  left: 9px;
  right: 9px;
  height: 1.5px;
  background: var(--color-ink);
  transition: transform 0.2s ease, top 0.2s ease;
}
.menu-bar:nth-child(2) { top: 13px; }
.menu-bar:nth-child(3) { top: 19px; }
.menu-open-a { top: 16px; transform: rotate(45deg); }
.menu-open-b { top: 16px; transform: rotate(-45deg); }
.nav-drawer {
  display: none;
  flex-direction: column;
  padding: 0.25rem 1.5rem 1rem;
  border-top: 1px solid var(--color-line);
  background: var(--color-paper);
}
.nav-drawer a {
  padding: 0.7rem 0.25rem;
  color: var(--color-slate);
  border-bottom: 1px solid var(--color-line);
  font-weight: 500;
}
.nav-drawer a.is-active { color: var(--color-violet); }
.nav-drawer.is-open { display: flex; }
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@media (max-width: 760px) {
  .nav { display: none; }
  .menu-toggle { display: block; }
  .topbar-inner { gap: 1rem; }
}
</style>
