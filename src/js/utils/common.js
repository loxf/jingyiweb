class Common {

    /**
     * 将键值对转为URL参数
     */
    _toQueryPair(key, value) {
        ///<summary>将键值对转为URL参数</summary>
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
        //return key + '=' + (value == null ? '' : String(value));
    }

    /**
     * 将对象转为URL参数
     */
    toQueryString(obj) {
        var ret = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                key = encodeURIComponent(key);
                var values = obj[key];
                if (values && values.constructor === Array) { //数组 
                    var queryValues = [];
                    for (var i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(this._toQueryPair(key + '[]', value));
                    }
                    ret = ret.concat(queryValues);
                } else { //字符串 
                    ret.push(this._toQueryPair(key, values));
                }
            }
        }
        return ret.join('&');
    }

    getTypeOfBrowser(){
        let agent=navigator.userAgent;
        if(agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            return 'IOS';
        }
        else if(agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1){
            return 'ANDROID';
        }
        else{
            return 'UNKNOWN';
        }
    }


};

// 实例化后再导出
export default new Common()