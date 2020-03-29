import { apiService, authStorageService } from 'ts-api-toolkit';

import { User } from 'models/User';

export const login = async (shortLivedJwt: string): Promise<void | string> => {
    authStorageService.saveToken(shortLivedJwt);
    return await apiService
        .get('/auth/token')
        .then((response) => {
            authStorageService.saveToken(response.data.jwt);
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while exchanging tokens';
        });
};

export const destroyOAuthToken = async (): Promise<void | string> => {
    return await apiService
        .delete('/auth/token')
        .then(() => {
            authStorageService.destroyToken();
            return;
        })
        .catch(({ response }) => {
            return response.data?.message || 'Unknown error while deleting token';
        });
};

export const fetchUserInfo = async (): Promise<User> => {
    return await apiService.get('user/info').then(({ data }) => {
        return data;
    });
};