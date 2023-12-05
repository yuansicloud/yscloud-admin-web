import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
// import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/cremation',
  name: 'Cremation',
  component: LAYOUT,
  redirect: '/cremation/display-screen',
  meta: {
    orderNo: 11,
    icon: 'ion:grid-outline',
    title: '火化',
  },
  children: [
    {
      path: 'display-screen',
      name: 'DisplayScreen',
      component: () => import('/@/views/cremation/display-screen/index.vue'),
      meta: {
        title: '电子大屏',
      },
    },
  ],
};

export default dashboard;
