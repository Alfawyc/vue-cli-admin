/**
 * 全局函数
 */
const commonFn = {
    toastMsg(type, msg, time, callback) {
        bus.$message({
            message: msg,
            type: type,
            duration: time ? time : 3000,
            showClose: true,
            onClose: function() {
                if (typeof callback == 'function') {
                    callback();
                }
            }
        });
    },
    noticeMsg(type, title, msg, time, callback) {
        bus.$notify({
            type: type,
            title: title,
            message: msg,
            duration: time ? time : 3000,
            onClose: function() {
                if (typeof callback == 'function') {
                    callback();
                }
            }
        });
    },
    confirmMsg(type, title, msg, success, cancel) {
        bus
            .$confirm(msg, title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type
            })
            .then(() => {
                if (typeof success == 'function') {
                    success();
                }
            })
            .catch(() => {
                if (typeof cancel == 'function') {
                    cancel();
                }
            });
    },
    /**
     * 生成 URL-encode 之后的请求字符串
     *
     * @param {object} obj
     * @returns {string}
     */
    buildQuery(obj) {
        let params = [];
        _.forEach(obj, function(value, key) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        });
        return params.join('&').replace(/%20/g, '+');
    },
    /**
     * 从cookie中读取Laravel设置的XSRF-TOKEN值
     * @returns {string}
     */
    getXsrfToken() {
        let name = 'XSRF-TOKEN',
            match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return match ? decodeURIComponent(match[3]) : null;
    },
    /**
     * 生成 URL-encode 之后的请求字符串
     *
     * @param {object} obj
     * @returns {string}
     */
    stringifyQuery(obj) {
        const encodeReserveRE = /[!'()*]/g;
        const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16);
        const commaRE = /%2C/g;

        const encode = str =>
            encodeURIComponent(str)
                .replace(encodeReserveRE, encodeReserveReplacer)
                .replace(commaRE, ',');
        const res = obj
            ? Object.keys(obj)
                  .map(key => {
                      const val = obj[key];

                      if (val === undefined) {
                          return '';
                      }

                      if (val === null) {
                          return encode(key);
                      }

                      if (Array.isArray(val)) {
                          const result = [];
                          val.forEach(val2 => {
                              if (val2 === undefined) {
                                  return;
                              }
                              if (val2 === null) {
                                  result.push(encode(key));
                              } else {
                                  result.push(encode(key) + '=' + encode(val2));
                              }
                          });
                          return result.join('&');
                      }

                      return encode(key) + '=' + encode(val);
                  })
                  .filter(x => x.length > 0)
                  .join('&')
            : null;
        return res ? `?${res}` : '';
    },
    /**
     * 替换路由
     * 
     * @param {string} path 
     * @param {*} query 
     */
    replaceRoute(path , query = {} ){
        router.replace({ path : path , query : query });
    },

    /**
     * 初始化页面参数
     * 
     * @param {object} params 
     * @param {object} data 
     */
    getInitParams(){
        return router.currentRoute.query;
    }
};

export default commonFn;
