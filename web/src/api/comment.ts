import {get, post} from '/@/utils/http/axios';

enum URL {
    list = '/v1/comment/list',
    create = '/v1/comment/create',
    delete = '/v1/comment/delete',
    listThingComments = '/v1/comment/listThingComments',
    listUserComments = '/v1/comment/listUserComments',
    like = '/v1/comment/like'
}

const listApi = async (params: any) => get<any>({url: URL.list, params: params, data: {}, headers: {}});
const createApi = async (data: any) => post<any>({
    url: URL.create,
    params: {},
    data: data,
    headers: {'Content-Type': 'multipart/form-data;charset=utf-8'}
});
const deleteApi = async (params: any) => post<any>({url: URL.delete, params: params, headers: {}});
const listThingCommentsApi = async (params: any) => get<any>({url: URL.listThingComments, params: params, data: {}, headers: {}});
const listUserCommentsApi = async (params: any) => get<any>({url: URL.listUserComments, params: params, data: {}, headers: {}});
const likeApi = async (params: any) => post<any>({url: URL.like, params: params, headers: {}});

export {listApi, createApi, deleteApi, listThingCommentsApi, listUserCommentsApi, likeApi};
