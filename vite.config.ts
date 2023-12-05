import { defineApplicationConfig } from '@vben/vite-config';

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      // Listening on all local IPs
      host: true,
      port: 8080,
      proxy: {
        '/api': {
          target: 'https://admingateway.yuansicloud.com',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          secure: false,
        },
        '/connect': {
          target: 'https://auth.yuansicloud.com',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/connect`), ''),
        },
      },
    },
  },
});
