window.onload = function () {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var context = canvas.getContext("2d");  //2d用引用括起来
    }

    // 检测浏览器是否支持canvas 该方法是否存在 取得上下文对象
    if (canvas.getContext) {
        var context = canvas.getContext('2d'); //2d用单引用括起来
        if (canvas.getContext) {
            // 设置阴影，阴影需要在图形之前设置
            context.shadowOffsetX = 10;
            context.shadowOffsetY = 20;
            context.shadowBlur = 2;
            context.shadowColor = "yellow";

            context.fillStyle = "red"; // 填充颜色为红色
            context.fillRect(10, 10, 150, 150);	//用指定的颜色填充矩形

            context.strokeStyle = "blue"; //描边颜色为蓝色
            context.lineWidth = 4; //指定描边线的宽度
            context.strokeRect(10, 10, 150, 150);	//用指定的颜色描边矩形
        }
    }
}