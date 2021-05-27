// 处理url的封装
//获取查询字符串
export const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    // decodeURIComponent 进行解码
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 *  删除地址地址中的指定参数组
 * @param paramKey
 * @returns {string}
 */
export const delParams = (paramKey = []) =>{
    var url = window.location.href;    //页面url
    var urlParam = window.location.search.substr(1);   //页面参数
    var beforeUrl = url.substr(0, url.indexOf("?"));   //页面主地址（参数之前地址）
    var nextUrl = "";

    var arr = new Array();
    if (urlParam != "") {
        var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
        for (var i = 0; i < urlParamArr.length; i++) {
            var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
            //如果键雨要删除的不一致，则加入到参数中

            if (!paramKey.includes(paramArr[0])) {
                arr.push(urlParamArr[i]);
            }
        }
    }
    if (arr.length > 0) {
        nextUrl = "?" + arr.join("&");
    }
    url = beforeUrl + nextUrl;
    return url;
}
