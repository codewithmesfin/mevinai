import Request from "axios";
import { getToken, isAuthenticated } from "./auth";

const API_ROOT = "https://api.mevinai.com"



const getAcceessToken = () => {
    const authenticated = isAuthenticated()
    if (authenticated) {
        const token = getToken()
        return token
    }
    else return undefined
}

const api = {
    async registerUser(user: any, path: any) {
        return await Request.post(`${API_ROOT}${path}`, user,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    },
    async loginUser(user: any, path: any) {
        return await Request.post(`${API_ROOT}${path}`, user,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    },
    create(data: any, path: any) {
        const token = getAcceessToken()
        const header = token ? {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        } : undefined
        return Request.post(`${API_ROOT}${path}`, data, header);
    },
    getItem(path: any) {
        const token = getAcceessToken()
        const header = token ? {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        } : undefined
        return Request.get(`${API_ROOT}${path}`, header);
    },
    getItems(path: any) {
        const token = getAcceessToken()
        const header = token ? {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        } : undefined
        return Request.get(`${API_ROOT}${path}`, header);
    },
    update(data:any,path: any) {
        const token = getAcceessToken()
        const header = token ? {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        } : undefined
        return Request.put(`${API_ROOT}${path}`, data, header);
    },

};
export default api;