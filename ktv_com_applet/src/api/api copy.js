// 引入小程序框架
import wepy from 'wepy'

// 不带token
export const getData = function (url,type,cb,parameter) {
	return wepy.request({
		url: 'https://ktv.demo.abontest.com/index.php/' + url,  
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
    console.log('封装的方法的token',wepy.$instance.globalData.token)
    // 读取token
    wx.getStorage({
        key: 'token',
        success (res) {
            wepy.$instance.globalData.token = res.data
            console.log('apiToken',wepy.$instance.globalData.token)
        }
    })

	return wepy.request({
		url: 'https://ktv.demo.abontest.com/index.php/' + url,  
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



