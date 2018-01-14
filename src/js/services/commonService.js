import apiHelper from './apiHelper';

class CommonService {
    get(data,url) {
        let requestParam = {
            url: `${apiHelper.baseApiUrl}${url}`,
            data: {
                method: 'get',
                body: data
            }
        };
        return apiHelper.fetch(requestParam);
    }

    post(data,url){
        let requestParam = {
            url: `${apiHelper.baseApiUrl}${url}`,
            data: {
                method: 'post',
                body: data
            }
        };
        return apiHelper.fetch(requestParam);
    }
}

export default new CommonService();