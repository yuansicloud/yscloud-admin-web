import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
// import { t } from '@/hooks/web/useI18n';

const transporting: AppRouteModule = {
  path: '/transporting',
  name: 'Transporting',
  component: LAYOUT,
  redirect: '/transporting/display-screen',
  meta: {
    orderNo: 11,
    icon: 'ion:grid-outline',
    title: '接运',
  },
  children: [
    {
      path: 'display-screen',
      name: 'DisplayScreen',
      component: () => import('@/views/transporting/display-screen/index.vue'),
      meta: {
        title: '电子大屏',
      },
    },
  ],
};

export default transporting;
