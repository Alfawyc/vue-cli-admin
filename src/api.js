import axios from 'axios';
import router from './router';

axios.interceptors.request.use(
    config => {
        let AuthToken = Lockr.get("x-token"); //localstroage 获取jwt令牌
        if(AuthToken){
            config.headers['x-token'] = AuthToken
        }
        return config
    },
    error => {
        return Promise.resolve(error.response);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.resolve(error.response);
    }
);

/**
 * 检查API请求HTTP status
 *
 * @param {object} response
 */
function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response;
    }
    /**
     * Laravel 表单验证失败错误
     *
     * 消息体：
     * {
     *   code : 119,
     *   message : "提交的数据无效，验证不通过",
     *   data : {
     *       username : ["用户名 已经存在。"]
     *   }
     * }
     *
     *
     */
    if (response.status === 422) {
        let msgArr = [];
        for (let row in response.data.data) {
            msgArr.push(response.data.data[row]);
        }
        response.apiMsg = '操作失败，原因：' + msgArr.join(' ');
        return Promise.reject(response);
    }
    return {
        data: {
            code: -404,
            message: '请求失败',
            data: response.data,
            statusText: response.statusText
        }
    };
}
/**
 *
 * 检查API请求返回数据code码
 *
 * @param {object} res
 */
function checkCode(res) {
    // 校验登陆状态
    if (res.data.code === 999) {
        _g.toastMsg('warning', '尚未登录', 1500, () => {
            router.replace('/login');
        });
    }
    return res;
}

export default {
    /**
     * 发送POST请求
     *
     * @param {string} url 请求地址
     * @param {object} data 提交数据
     * @param {bool} gSwitch 是否使用全局拦截器
     */
    post(url, data, gSwitch = true) {
        if (gSwitch) {
            return new Promise((resolve, reject) => {
                axios
                    .post(url, data)
                    .then(checkStatus)
                    .then(checkCode)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(response => {
                        reject(response);
                        // 对api异常消息进行处理
                        _g.noticeMsg(
                            'error',
                            '操作提示',
                            response.hasOwnProperty('apiMsg') ? response.apiMsg : '请求出错或超时',
                            5000
                        );
                    });
            });
        } else {
            return axios.post(url, data).then(checkCode);
        }
    },
    /**
     * 发送GET请求
     *
     * @param {string} url 请求地址
     * @param {object} data 提交数据
     * @param {bool} gSwitch 是否使用全局拦截器
     */
    get(url, params, gSwitch = true) {
        const data = {
            params: params
        };
        if (gSwitch) {
            return new Promise((resolve, reject) => {
                axios
                    .get(url, data)
                    .then(checkStatus)
                    .then(checkCode)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(response => {
                        reject(response);
                        // 对api异常消息进行处理
                        _g.noticeMsg(
                            'error',
                            '操作提示',
                            response.hasOwnProperty('apiMsg') ? response.apiMsg : '请求出错或超时',
                            5000
                        );
                    });
            });
        } else {
            return axios.get(url, data).then(checkCode);
        }
    }
};
