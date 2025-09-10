const STORAGE_KEY = 'artistFilter';

export default function artistFilter() {
  const sidebar = document.getElementById('artist-sidebar');
  const toggle = document.getElementById('artist-sidebar-toggle');
  const overlay = document.getElementById('artist-overlay');
  const clear = document.getElementById('artist-clear');
  const chipContainer = document.getElementById('active-artist');
  const chipLabel = chipContainer?.dataset.label || 'Artist';
  const buttons = sidebar?.querySelectorAll('[data-artist]');
  if (!sidebar || !toggle || !buttons) return;

  if (window.innerWidth >= 768) {
    sidebar.setAttribute('aria-hidden', 'false');
  }

  let firstFocusable;
  let lastFocusable;
  let previousFocus;

  const focusableSelectors =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function trapFocus(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeSidebar();
      e.stopPropagation();
    }
  }

  function openSidebar() {
    previousFocus = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
    sidebar.classList.remove('-translate-x-full');
    overlay?.classList.remove('hidden');
    const focusables = sidebar.querySelectorAll(focusableSelectors);
    firstFocusable = focusables[0];
    lastFocusable = focusables[focusables.length - 1];
    firstFocusable?.focus();
    document.addEventListener('keydown', trapFocus, true);
  }

  function closeSidebar() {
    toggle.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
    document.removeEventListener('keydown', trapFocus, true);
    if (previousFocus instanceof HTMLElement) {
      previousFocus.focus();
    }
  }

  function updateURL(artist) {
    const url = new URL(window.location.href);
    if (artist) {
      url.searchParams.set('artist', artist);
    } else {
      url.searchParams.delete('artist');
    }
    history.replaceState({}, '', url.toString());
  }

  function renderChip(artist) {
    if (!chipContainer) return;
    chipContainer.innerHTML = '';
    if (!artist) return;
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'tag-pill flex items-center gap-1 text-sm';
    chip.innerHTML = `${chipLabel}: ${artist} <span aria-hidden="true">&times;</span>`;
    chip.addEventListener('click', () => activate(''));
    chipContainer.appendChild(chip);
  }

  function activate(artist) {
    window.activeArtist = artist;
    buttons.forEach((btn) => {
      const isActive = btn.dataset.artist === artist;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('bg-gray-200', isActive);
      btn.classList.toggle('dark:bg-gray-700', isActive);
    });
    if (artist) {
      localStorage.setItem(STORAGE_KEY, artist);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    updateURL(artist);
    renderChip(artist);
    if (window.applySongFilters) {
      window.applySongFilters();
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const artist = btn.dataset.artist || '';
      activate(artist);
    });
  });

  clear?.addEventListener('click', () => {
    activate('');
  });

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay?.addEventListener('click', () => {
    closeSidebar();
  });

  let selected = new URLSearchParams(window.location.search).get('artist');
  if (selected) {
    localStorage.setItem(STORAGE_KEY, selected);
  } else {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      selected = stored;
    }
  }
  activate(selected || '');
}

artistFilter();
