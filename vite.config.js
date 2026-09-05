import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration - just wires up the React plugin (JSX/Fast Refresh support).
export default defineConfig({
  plugins: [react()],
});
