/**
 * 注意事项：
 * 1. 修改要抢的场次和票档
 * 2. 设置开抢时间，这个时间就是大麦购票页面的开抢时间
 * 3. 检查是否有的步骤进行了注释
 * 4. 默认是购买两张票，请注意添加两个观演人身份信息
 */

// var piaodang = "777元"; // 票档 


// 设置开抢时间
var year = 2023;
var month = 6; // 月份从 0 开始计数，所以 6 表示 7 月
var day = 2;
var hour = 13;
var minute = 42; 
var second = 0;
var msecond = 0;
var startTimestamp = new Date(year, month, day, hour, minute, second, msecond).getTime();
startTimestamp = startTimestamp - 40; // 减去 40ms 的网络延迟

auto.waitFor();
app.launchApp("大麦");
openConsole();


var damaiTimestamp = 0;
function convertToTime(timestamp) {
    var date = new Date(timestamp);
    var year = date.getUTCFullYear();
    var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    var day = date.getUTCDate().toString().padStart(2, "0");
    var hours = (date.getUTCHours() + 8).toString().padStart(2, "0");
    var minutes = date.getUTCMinutes().toString().padStart(2, "0");
    var seconds = date.getUTCSeconds().toString().padStart(2, "0");
    var milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    var iso8601 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return iso8601;
}
var startTime = convertToTime(startTimestamp);
console.log("开始时间：\n", startTime);
print("等待开抢...");

while (true) {
    // 通过HTTP请求获取大麦网服务器的时间戳
    damaiTimestamp = JSON.parse(http.get("https://mtop.damai.cn/gw/mtop.common.getTimestamp/", {
        headers: {
            'Host': 'mtop.damai.cn',
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': '*/*',
            'User-Agent': 'floattime/1.1.1 (iPhone; iOS 15.6; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1, en-CN;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }
    }).body.string()).data.t;

    // 将开抢时间与大麦网的时间进行比较
    if (damaiTimestamp >= startTimestamp) {
        print("开抢啦！！！");
        break;
    }
}

print("冲啊！！！！！");

// ### 用于计时
var startTime = java.lang.System.currentTimeMillis();


// print("点击购票的时间："+JSON.parse(http.get("https://mtop.damai.cn/gw/mtop.common.getTimestamp/", {
//     headers: {
//         'Host': 'mtop.damai.cn',
//         'Content-Type': 'application/json;charset=utf-8',
//         'Accept': '*/*',
//         'User-Agent': 'floattime/1.1.1 (iPhone; iOS 15.6; Scale/3.00)',
//         'Accept-Language': 'zh-Hans-CN;q=1, en-CN;q=0.9',
//         'Accept-Encoding': 'gzip, deflate, br',
//         'Connection': 'keep-alive'
//     }
// }).body.string()).data.t);


click(925, 2320); // 此处使用的坐标点击，如果屏幕分辨率变化，则左边也应随之改变
// id("trade_project_detail_purchase_status_bar_container_fl").click()
// print("点了立即购买");

// 选择场次
text("2023-07-22 周六 12:00").findOne().parent().parent().parent().parent().click();
// print("选择场次");

text("预售单日票：480元").findOne().parent().parent().parent().parent().click();
// print("选择票档");

// ### 用于提交开售提醒测试 ###
// sleep(5);
// id("btn_buy").findOne().click();
// print("提交开售提醒");


id("img_jia").findOne().click();
// print("加票");

id("btn_buy").findOne().click();
// print("点确定");

id("checkbox").className("android.widget.CheckBox").clickable(true).checkable(true).checked(false).findOne().click();
id("checkbox").className("android.widget.CheckBox").clickable(true).checkable(true).checked(false).findOne().click();
// print("选择观演人");

text("提交订单").findOne().click();
print("提交订单");
print("over!  ^_^");

var endTime = java.lang.System.currentTimeMillis();
var executionTime = endTime - startTime;
console.log("订单提交时间：" + endTime);
console.log("抢票只用了：" + executionTime + " 毫秒");
// print("开抢时的系统时间戳：" + systemTimestamp);