
import { get, post } from '/@/utils/http/axios';
import { UserState } from '/@/store/modules/user/types';

enum URL {
    userCollectList = '/v1/thingCollect/getUserCollectList',
    collect = '/v1/thingCollect/collect',
    unCollect = '/v1/thingCollect/unCollect',
}

const collectApi = async (data: any) => post<any>({ url: URL.collect, params: {}, data: data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const unCollectApi = async (data: any) => post<any>({ url: URL.unCollect, params: {},data:data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const userCollectListApi = async (params: any) => get<any>({ url: URL.userCollectList, params: params });

export { collectApi, unCollectApi, userCollectListApi };
