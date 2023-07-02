let intervel = 1000;

auto.waitFor();

app.launchApp("大麦");

openConsole();
print("start...");
id("hotrecommend_subtitle").findOne().parent().click()
print("点了");
className("android.widget.TextView").text("去抢票").findOne().parent().parent().click();
print("点了去抢票");

// while (true) {
//     let bt = id("homepage_item_bottom_left").className("android.widget.TextView").text("4.5万人想看").findOne();
//     if (bt) {
//         bt.parent().parent().click();
//         break;
//     }
//     print("等待%d", intervel);
//     sleep(intervel);
// }

print("exit!");
