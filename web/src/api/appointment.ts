import {get, post} from "/@/utils/http/axios";

enum URL {
    list = '/v1/appointment/list',
    create = '/v1/appointment/add',
    update = '/v1/appointment/update',
    delete = '/v1/appointment/delete',
    detail = '/v1/appointment/detail',
}

const listAppointmentApi = async (params: any) => get<any>({ url: URL.list, params: params, data: {}, headers: {} });
const addAppointmentApi = async (data: any) =>
    post<any>({ url: URL.create, data: data, headers: { 'Content-Type': 'application/json' } });
const updateAppointmentApi = async (data: any) =>
    post<any>({ url: URL.update,data: data, headers: { 'Content-Type': 'application/json' } });
const deleteApi = async (params: any) => get<any>({ url: URL.delete, params: params, headers: {} });
const detailApi = async (params: any) => get<any>({ url: URL.detail, params: params, headers: {} });

export { listAppointmentApi, addAppointmentApi, updateAppointmentApi, deleteApi, detailApi };
