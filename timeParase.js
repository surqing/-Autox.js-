openConsole();

http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp", {}, function (response) {
    var result = response.body.string();
    var timestamp = JSON.parse(result).data.t; // 解析获取的网络时间
    console.log("淘宝时间戳:", timestamp);
    var taobaoTimestamp = timestamp; // 假设这是你从淘宝获取的时间戳
    var date = new Date(taobaoTimestamp);
    var year = date.getUTCFullYear();
    var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    var day = date.getUTCDate().toString().padStart(2, "0");
    var hours = (date.getUTCHours() + 8).toString().padStart(2, "0");
    var minutes = date.getUTCMinutes().toString().padStart(2, "0");
    var seconds = date.getUTCSeconds().toString().padStart(2, "0");
    var milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    var iso8601 = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    console.log("淘宝时间戳（中国时区）:", iso8601);
});


var date = new Date(2023, 6, 1, 9, 19, 52, 567); // 月份从 0 开始计数，所以 6 表示 7 月
var timestamp = date.getTime();
print("系统时间戳:", timestamp)
var sysTimestamp = timestamp; 
var date = new Date(sysTimestamp);
var year = date.getUTCFullYear();
var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
var day = date.getUTCDate().toString().padStart(2, "0");
var hours = (date.getUTCHours() + 8).toString().padStart(2, "0");
var minutes = date.getUTCMinutes().toString().padStart(2, "0");
var seconds = date.getUTCSeconds().toString().padStart(2, "0");
var milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
var iso8601 = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
console.log("系统时间戳（中国时区）:", iso8601);





