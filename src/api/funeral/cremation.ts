import { defHttp } from '@/utils/http/axios';

enum Api {
  CREMATION_RESERVATION_LIST = '/api/service-aggregates/cremation-aggregate/reservation',
}

export const cremationReservationListApi = (params: any) =>
  defHttp.get<any>({
    url: Api.CREMATION_RESERVATION_LIST,
    params,
  });
