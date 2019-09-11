window.onload = function () {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var context = canvas.getContext("2d");  //2d用引用括起来
    }

    // 检测浏览器是否支持canvas 该方法是否存在 取得上下文对象
    if (canvas.getContext) {
        var context = canvas.getContext('2d'); //2d用单引用括起来
        if (canvas.getContext) {
            context.fillStyle = "red";  // 填充颜色为红色
            context.strokeStyle = "blue";  // 画笔的颜色
            context.lineWidth = 5;  // 指定描边线的宽度

            // 保存当前状态，开始绘图
            context.save();
            context.beginPath();

            // 直线
            context.moveTo(150, 150);  // 移动到某一位置
            context.lineTo(300, 150);  // 画直线从当前点到给定的位置
            context.stroke();

            // 箭头
            // 箭头的思路和直线差不多，先画直线，然后在终点位置画一个填充的三角形即可
            // 注意三角形需要按照直线的方向，所以用到的数学属性如下
            context.moveTo(230, 230);  // 移动到指定坐标
            context.lineTo(500, 230);  // 画直线
            context.stroke();  // 填充直线
            let endRadians = Math.atan((230 - 230) / (500 - 230));  // 计算出当前直线的角度
            endRadians += ((500 >= 230) ? 90 : -90) * Math.PI / 180;  // 角度的正负取值
            context.translate(500, 230);  // 使用translate函数转换坐标系，将该坐标重新定义为原点
            context.rotate(endRadians);  // 把该直线看做水平坐标（目的是让整个canvas没有角度，方便计算）

            // 下面就是根据直线终点绘制三角箭头，并填充三角形
            context.moveTo(0,  -2 * context.lineWidth);
            context.lineTo(2 * context.lineWidth, 3 * context.lineWidth);
            context.lineTo(-2 * context.lineWidth, 3 * context.lineWidth);
            context.fillStyle = context.strokeStyle;
            context.fill();

            // 矩形
            // 使用fillRect函数，(起点x，起点y，终点x，终点y)， 颜色为fillStyle给定的颜色
            context.fillRect(50, 50, 150, 150);

            // 空心矩形
            // 使用strokeRect函数，坐标参数与矩形一致，颜色为strokeStyle给定的颜色，画笔粗细为lineWidth的值
            context.strokeRect(100, 100, 200, 200);

            // 圆形
            // 使用arc函数，(圆心x，圆心y，半径，起始角度，结束角度，[可选参数：顺时针false/逆时针true])
            let r = 50;  // 半径
            context.arc(200, 200, r, 0, Math.PI * 2);  // 绘制圆
            context.fill();  // 填充
            context.stroke();  // 描边

            // 还原状态，结束当前绘画
            context.restore();
            context.closePath();
        }
    }
}
