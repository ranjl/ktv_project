// 引入小程序框架
import wepy from 'wepy'

// 不带token
export const getData = function (url,type,cb,parameter) {
	return wepy.request({
		url: 'https://ktv.jcxowtime.com/index.php/' + url,  
        method: type || 'get',
        data:parameter,
        header: {
            'content-type': 'application/json' ,
        },
        success (res) {
            cb && cb(res);
        }
	})
}

// 带token
export const getDataOrder = function (url,type,cb,parameter) {
    return wepy.request({
        url: 'https://ktv.jcxowtime.com/index.php/' + url,  
        method: type || 'get',
        data:parameter,
        header: {
            'content-type': 'application/json' ,
            'token':wepy.$instance.globalData.token
        },
        success (res) {
            cb && cb(res);
        }
    })
}



// test
export const getDataOrderTest = function (url,type,cb,parameter,test) {
    return wepy.request({
        url: 'https://ktv.jcxowtime.com/index.php/' + url,  
        method: type || 'get',
        data:parameter,
        header: {
            'content-type': 'application/json' ,
            'token':test
        },
        success (res) {
            cb && cb(res);
        }
    })
}



