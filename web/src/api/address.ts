import {get, post} from '/@/utils/http/axios';

enum URL {
    userList = '/v1/address/list',
    create = '/v1/address/create',
    update = '/v1/address/update',
    delete = '/v1/address/delete',
}

const listApi = async (params: any) =>
    get<any>({url: URL.userList, params: params, data: {}, headers: {}});
const createApi = async (data: any) =>
    post<any>({
        url: URL.create,
        params: {},
        data: data,
        headers: {'Content-Type': 'application/json'}
    });
const updateApi = async (data: any) =>
    post<any>({
        url: URL.update,
        data: data,
        headers: {'Content-Type': 'application/json'}
    });
const deleteApi = async (data: any) =>
    post<any>({url: URL.delete, data: data, headers: {'Content-Type': 'application/json'}});

export {listApi, createApi, updateApi, deleteApi};
