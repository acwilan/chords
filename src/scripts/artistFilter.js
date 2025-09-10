const STORAGE_KEY = 'artistFilter';

export default function artistFilter() {
  const sidebar = document.getElementById('artist-sidebar');
  const toggle = document.getElementById('artist-sidebar-toggle');
  const buttons = sidebar?.querySelectorAll('[data-artist]');
  if (!sidebar || !toggle || !buttons) return;

  function updateURL(artist) {
    const url = new URL(window.location.href);
    if (artist) {
      url.searchParams.set('artist', artist);
    } else {
      url.searchParams.delete('artist');
    }
    history.replaceState({}, '', url.toString());
  }

  function activate(artist) {
    window.activeArtist = artist;
    buttons.forEach((btn) => {
      const isActive = btn.dataset.artist === artist;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('font-bold', isActive);
    });
    if (artist) {
      localStorage.setItem(STORAGE_KEY, artist);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    updateURL(artist);
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

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    sidebar.classList.toggle('hidden', expanded);
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
