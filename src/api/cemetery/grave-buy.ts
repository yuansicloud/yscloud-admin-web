// import { BasicPageParams } from '../model/baseModel';
import { defHttp } from '@/utils/http/axios';
// import { GetAccountInfoModel } from './model/accountModel';

enum Api {
  GRAVE_BUY_RESERVATION_LIST = '/api/service-aggregates/grave-buy-aggregate/reservation',
}

export const graveBuyReservationListApi = (params: any) =>
  defHttp.get<any>({
    url: Api.GRAVE_BUY_RESERVATION_LIST,
    params,
  });
