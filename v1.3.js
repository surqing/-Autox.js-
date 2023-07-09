/**
 * 注意事项：
 * 1. 修改要抢的场次和票档
 * 2. 设置开抢时间，这个时间就是大麦购票页面的开抢时间
 * 3. 检查是否有必要的步骤进行了注释
 * 4. 默认是购买两张票，请注意添加两个观演人身份信息
 * 5. 代码中含有坐标点击的操作，不同设备分辨率可能不一致，需要对应进行修改
 */


// 设置开抢时间
var year = 2023;
var month = 6; // 月份从 0 开始计数，所以 6 表示 7 月
var day = 5;
var hour = 17;
var minute = 17;
var second = 0;
var msecond = 0;
var startTimestamp = new Date(year, month, day, hour, minute, second, msecond).getTime();
startTimestamp = startTimestamp - 40; // 减去 40ms 的网络延迟 

auto.waitFor();
app.launchApp("大麦");
openConsole();


/**
 * 
 * @param {时间戳} timestamp 
 * @returns ISO 8601 格式的北京时间
 */
function convertToTime(timestamp) {
    var date = new Date(Number(timestamp));
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

/**
 * 
 * @returns 大麦服务器时间戳
 */
function getDamaiTimestamp() {
    return JSON.parse(http.get("https://mtop.damai.cn/gw/mtop.common.getTimestamp/", {
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
}

var damaiTimestamp;

var startTime = convertToTime(startTimestamp);
console.log("开始时间：\n", startTime);
print("等待开抢...");

// 循环等待
while (true) {
    damaiTimestamp = getDamaiTimestamp();

    if (damaiTimestamp >= startTimestamp) {
        break;
    }
} 

print("冲啊！！！！！");


click(925, 2320); // 此处使用的坐标点击，如果屏幕分辨率变化，则左边也应随之改变
// print("点了立即购买");

// 选择场次
text("2023-07-14 周五 19:30").findOne().parent().parent().parent().parent().click();
// print("选择场次");

text("看台717元").findOne().parent().parent().parent().parent().click();
// print("选择票档");

id("img_jia").findOne().click();
// print("加一张票");

id("btn_buy").findOne().click();
// print("点确定");

id("checkbox").className("android.widget.CheckBox").clickable(true).checkable(true).checked(false).findOne().click();
id("checkbox").className("android.widget.CheckBox").clickable(true).checkable(true).checked(false).findOne().click();
// print("选择观演人");

text("提交订单").findOne().click();
print("提交订单");
print("over!  ^_^");

// 提交订单的大麦时间
var endTime = convertToTime(getDamaiTimestamp());
console.log("订单提交时间：" + endTime);

