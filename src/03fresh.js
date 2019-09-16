window.onload = function () {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var context = canvas.getContext("2d");  //2d用引用括起来
    }

    canvas.drawing = function (x1, y1, x2, y2, e) {
        let self = this;
        if (!context) {
            return;
        } else {
            // 设置画笔的颜色和大小
            context.fillStyle = "red";  // 填充颜色为红色
            context.strokeStyle = "blue";  // 画笔的颜色
            context.lineWidth = 5;  // 指定描边线的宽度

            context.save();
            context.beginPath();

            self.initCanvas();  // 每次需要调用初始化函数，以清空canvas
            // 绘制空心矩形
            context.strokeRect(x1, y1, x2 - x1, y2 - y1);

            // 添加对应的flag，以适应不同形状的绘制

            // if (self.rectFlag) {
            //     // console.log('画矩形');
            //     self.initCanvas();
            //     if (e.shiftKey === true) {
            //         // 正方形
            //         let d = ((x2 - x1) < (y2 -y1)) ? (x2 - x1) : (y2 - y1);
            //         context.fillRect(x1, y1, d, d);
            //     } else {
            //         // 普通方形
            //         context.fillRect(x1, y1, x2 - x1, y2 - y1);
            //     }
            // } else if (self.strokeRectFlag) {
            //     // console.log('画空心矩形')
            //     self.initCanvas();
            //     if (e.shiftKey === true) {
            //         // 正方形
            //         let d = ((x2 - x1) < (y2 -y1)) ? (x2 - x1) : (y2 - y1);
            //         context.strokeRect(x1, y1, d, d);
            //     } else {
            //         // 普通方形
            //         context.strokeRect(x1, y1, x2 - x1, y2 - y1);
            //     }
            // } else if (self.circleFlag) {
            //     // console.log('画圆形')
            //     self.initCanvas();
            //     let k = ((x2 - x1) / 0.55);
            //     let w = (x2 - x1) / 2;
            //     let h = (y2 - y1) / 2;

            //     if (e.shiftKey === true) {
            //         // circle
            //         let r = Math.sqrt(w * w + h * h);
            //         context.arc(w + x1, h + y1, r, 0, Math.PI * 2);
            //     } else {
            //         // ellipse
            //         // bezier double ellipse algorithm
            //         context.moveTo(x1, y1 + h);
            //         context.bezierCurveTo(x1, y1 + h * 3, x1 + w * 11 / 5, y1 + h * 3, x1 + w * 11 / 5, y1 + h);
            //         context.bezierCurveTo(x1 + w * 11 / 5, y1 - h, x1, y1 - h, x1, y1 + h);
            //     }
            //     context.fill();
            // } else if (self.strokeCircelFlag) {
            //     // console.log('画空心圆形')
            //     self.initCanvas();
            //     let k = ((x2 - x1) / 0.55);
            //     let w = (x2 - x1) / 2;
            //     let h = (y2 - y1) / 2;

            //     if (e.shiftKey === true) {
            //         // circle
            //         let r = Math.sqrt(w * w + h * h);
            //         context.arc(w + x1, h + y1, r, 0, Math.PI * 2);
            //     } else {
            //         // ellipse
            //         // bezier double ellipse algorithm
            //         context.moveTo(x1, y1 + h);
            //         context.bezierCurveTo(x1, y1 + h * 3, x1 + w * 11 / 5, y1 + h * 3, x1 + w * 11 / 5, y1 + h);
            //         context.bezierCurveTo(x1 + w * 11 / 5, y1 - h, x1, y1 - h, x1, y1 + h);
            //     }
            //     context.stroke();
            // } else if (self.lineFlag) {
            //     // console.log('画直线')
            //     self.initCanvas();
            //     context.moveTo(x1, y1);
            //     context.lineTo(x2, y2);
            //     context.stroke();
            // } else if (self.arrowFlag) {
            //     // console.log('画箭头')
            //     self.initCanvas();
            //     context.moveTo(x1, y1);
            //     context.lineTo(x2, y2);
            //     context.stroke();
            //     let endRadians = Math.atan((y2 - y1) / (x2 - x1));
            //     endRadians += ((x2 >= x1) ? 90 : -90) * Math.PI / 180;
            //     context.translate(x2, y2);
            //     context.rotate(endRadians);
            //     context.moveTo(0,  -2 * context.lineWidth);
            //     context.lineTo(2 * context.lineWidth, 3 * context.lineWidth);
            //     context.lineTo(-2 * context.lineWidth, 3 * context.lineWidth);
            //     context.fillStyle = context.strokeStyle;
            //     context.fill();

            // } else if (self.textFlag) {
            //     // console.log('画文字')
            // } else {
            //     // 画笔需要保留之前的移动轨迹，所以不需要初始化清除。
            //     context.moveTo(x1, y1);
            //     context.lineTo(x2, y2);
            //     context.stroke();

            //     // 画笔功能，需要动态实时将当前位置赋给初始位置，以实现连续笔记，否则就是直线。
            //     self.X1 = self.X2;
            //     self.Y1 = self.Y2;
            // }

            context.restore();
            context.closePath();
        }
    };

    canvas.onmousedown = function mouseDownAction(e) {
        let self = this;
        self.X1 = e.offsetX;  // 鼠标按下时保存当前位置，为起始位置
        self.Y1 = e.offsetY;
        self.isMouseDown = true;  // 将按下的flag表示为true，拖动鼠标时使用
        self.loadImage();
    };

    canvas.onmousemove = function mouseMoveAction(e) {
        let self = this;
        if (self.isMouseDown) {
            self.X2 = e.offsetX;
            self.Y2 = e.offsetY;
            self.drawing(self.X1, self.Y1, self.X2, self.Y2, e);
        }
    };

    canvas.onmouseup = function mouseUpAction(e) {
        let self = this;
        self.lastImage = canvas.toDataURL('image/png');
        self.isMouseDown = false;
    };

    canvas.loadImage = function () {
        let self = this;
        let img = new Image();
        img.src = self.lastImage;  // 将最后保存的图片赋值给img
        context.drawImage(img, 0, 0, canvas.width, canvas.height);  // 将img展示在canvas中
    }

    canvas.initCanvas = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);  // 清空canvas
        canvas.loadImage();  // 将最近的图片展示到canvas中
    }
}
