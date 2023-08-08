import { request } from './request';

export function httpGet(path) {
  return request({
    method: 'get',
    url: path,
  });
}

export function httpPost(path, data, headers = {}) {
  return request({
    method: 'post',
    url: path,
    headers,
    data,
  });
}

export function httpPut(path, data, headers = {}) {
  return request({
    method: 'put',
    url: path,
    headers,
    data,
  });
}

export function httpPatch(path, data, headers = {}) {
  return request({
    method: 'patch',
    url: path,
    headers,
    data,
  });
}

export function httpDelete(path, data, headers = {}) {
  return request({
    method: 'delete',
    url: path,
    headers,
    data,
  });
}
