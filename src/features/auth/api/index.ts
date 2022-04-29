
import axios, { AxiosResponse } from 'axios';
import mockAdapter from 'axios-mock-adapter';
import * as dataTypes from '../types';

const mock = new mockAdapter(axios);
mock.onPost('/login').reply(200, {
    name: 'Jeeva',
    isLoggedIn: true,
});

export function login() {
    const userdetail: dataTypes.LoginDetails = {
        username: 'jeeva',
        password: 'pwd',
    };
    return axios.post('/login', {
        username: userdetail.username,
        password: userdetail.password,
    });
}
