/**
* 正则列表
* https://www.cnblogs.com/zxin/archive/2013/01/26/2877765.html
*/
export const Regular = {
    /** 手机号 */
    mobilePhone: /0?(13|14|15|17|18|19)[0-9]{9}/,
    /** 电话 */
    telephone: /[0-9-()（）]{7,18}/,
    /** 邮箱 */
    email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
    /** 身份证 */
    cardID: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    /** 网址 url */
    url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
    /** 数字 */
    number: {
        /** 数字  */
        ordinary: /^[0-9]*$/,
        /** 正数 */
        just: /[1-9]\d*/,
        /** 负数 */
        negative: /-[1-9]\d*/
    }
}
// 日期格式化
export function DateFormat(date, fmt) {
    try {
        if (!date) {
            return date;
        }
        if (typeof date == "number") {
            date = new Date(date);
        }
        // console.log(date);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    } catch (error) {
        return date;
    }
}