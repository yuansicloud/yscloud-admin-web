import { defHttp } from '@/utils/http/axios';

enum Api {
  TRANSPORTING_RESERVATION_LIST = '/api/service-aggregates/transporting-aggregate/reservation',
}

export const transportingReservationListApi = (params: any) =>
  defHttp.get<any>({
    url: Api.TRANSPORTING_RESERVATION_LIST,
    params,
  });
