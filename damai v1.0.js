/**
 * 注意事项：
 * 1. 修改票档
 * 2. 设置开抢时间，这个时间比实际开抢时间提前一秒，月份是从 0 开始的
 * 3. 检查是否有的步骤进行了注释
 */

var piaodang = "看台780元"; // 票档 
/*
张杰-长沙(VVIP1680元)

*/

// 设置开抢时间,这个时间应该比实际开抢时间提前1.2s
var year    = 2023;
var month   = 6; // 月份从 0 开始计数，所以 6 表示 7 月
var day     = 1;
var hour    = 10;
var minute  = 56 ; // 注意这里要减一分钟
var second  = 59;
var msecond = 0;
var startTimestamp = new Date(year, month, day, hour, minute, second, msecond).getTime();


auto.waitFor();
app.launchApp("大麦");
openConsole();
print("等待开抢...");

var systemTimestamp = 0;

while (true) {
    systemTimestamp = java.lang.System.currentTimeMillis(); // 获取系统时间戳
    if (systemTimestamp >= startTimestamp && id("trade_project_detail_purchase_status_bar_container_fl").exists()) {
        print("开抢啦！！！");
        break;
    } 
}

print("开始了");

// ### 用于计时
var startTime = java.lang.System.currentTimeMillis();

click(925, 2320);
print("点了");

text(piaodang).findOne().parent().parent().parent().parent().click();
print("选择票档");

// ### 用于提交开售提醒测试 ###
// sleep(5);
// id("btn_buy").findOne().click();
// print("提交开售提醒");


id("img_jia").findOne().click();
print("加票");

id("btn_buy").findOne().click();
print("点确定");

id("checkbox").className("android.widget.CheckBox").clickable(true).checkable(true).checked(false).findOne().click();
id("checkbox").className("android.widget.CheckBox").clickable(true).checkable(true).checked(false).findOne().click();
print("选择观演人");

text("提交订单").findOne().click();
print("提交订单");
print("over!  ^_^");

var endTime = java.lang.System.currentTimeMillis();
var executionTime = endTime - startTime;

console.log("程序执行时间：" + executionTime + " 毫秒");
// print("开抢时的系统时间戳：" + systemTimestamp);