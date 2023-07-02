auto.waitFor();
app.launchApp("京东");
openConsole();

var i = 100;

print("快自己进入到抢购的界面");
sleep(4000);

while (!text("立即抢购").exists()) {
    // sleep(10);
    print("等待中...");
}

// sleep(10);
print("开抢了!!!");

text("立即抢购").click();

text("提交订单").waitFor();
text("提交订单").click();
print("点击提交订单")

print("over ^_^");