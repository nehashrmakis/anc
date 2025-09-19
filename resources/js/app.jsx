import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import '../css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/responsive.css';
import '../css/aos.css';

import $ from 'jquery';
window.$ = window.jQuery = $;
import './jquery-3.7.1.min.js';
import 'bootstrap';
import './custom.js';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Wrapper component to initialize AOS and Bootstrap tooltips globally
function AppWrapper({ children }) {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
    });

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }, []);

  return <>{children}</>;
}

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
     
        <App {...props} />
     
    );
  },
  progress: {
    color: '#4B5563',
  },
});
