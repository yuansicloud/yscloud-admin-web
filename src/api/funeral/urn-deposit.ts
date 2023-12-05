import { defHttp } from '@/utils/http/axios';

enum Api {
  URN_DEPOSIT_RESERVATION_LIST = '​/api​/service-aggregates​/urn-deposit-aggregate​/reservation',
}

export const urnDepositReservationListApi = (params: any) =>
  defHttp.get<any>({
    url: Api.URN_DEPOSIT_RESERVATION_LIST,
    params,
  });
