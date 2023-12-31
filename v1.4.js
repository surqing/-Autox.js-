auto.waitFor();
app.launchApp("大麦");
openConsole();
// 修改下列信息，必须提前设置好观演人
var ticketInfo = {
    date: "周五",
    price: 855
}
main(ticketInfo);
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

function main(ticketInfo) {
    // 从界面上获取开抢时间
    var UIStartTime = id("tv_count_down_remind").findOne();
    var strStartTime = UIStartTime.text();
    console.log("获取到的开抢时间: " + strStartTime);

    // 从界面上获取点击坐标
    var btnBuy = id("trade_project_detail_purchase_status_bar_container_fl").findOne();
    var rectBtnBuy = btnBuy.bounds();
    var clickPosX = rectBtnBuy.centerX();
    var clickPosY = rectBtnBuy.centerY();
    console.log("获取到的点击坐标: " + clickPosX + ", " + clickPosY);

    // 设置开抢时间
    var year = new Date().getFullYear();
    var month = strStartTime.slice(strStartTime.indexOf("月") - 2, strStartTime.indexOf("月")) - 1;
    var day = strStartTime.slice(strStartTime.indexOf("日") - 2, strStartTime.indexOf("日"));
    var hour = strStartTime.slice(strStartTime.indexOf(":") - 2, strStartTime.indexOf(":"));
    var minute = strStartTime.slice(strStartTime.indexOf(":") + 1, strStartTime.indexOf(":") + 3);
    var second = 0;
    var msecond = 0;
    var startTimestamp = new Date(year, month, day, hour, minute, second, msecond).getTime();
    startTimestamp = startTimestamp - 40; // 减去 40ms 的网络延迟
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

    print("冲啊！！！");

    click(clickPosX, clickPosY);
    print("点了立即购买");

    // 选择场次
    textContains(ticketInfo.date).findOne().parent().parent().parent().parent().click();
    print("选择场次");

    textContains(ticketInfo.price).findOne().parent().parent().parent().parent().click();
    print("选择票档");

    id("btn_buy").findOne().click();
    print("点确定");

    /*
    for(var i = 0; i < ticketInfo.count; i++)
    {
        id("checkbox").className("android.widget.CheckBox").clickable(true).checkable(true).checked(false).findOne().click();
    }
    print("选择观演人");
    */

    text("提交订单").findOne().click();
    print("提交订单");
    print("over!  ^_^");

    // 提交订单的大麦时间
    var endTime = convertToTime(getDamaiTimestamp());
    console.log("订单提交时间：" + endTime);
}

