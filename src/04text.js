window.onload = function () {
    var canvas = document.getElementById("canvas");
    var textBox = document.getElementById("textBox");
    var textFlag = false;
    var textContent = "";

    if (canvas.getContext) {
        var context = canvas.getContext("2d");  //2d用引用括起来
    }

    canvas.drawing = function (x1, y1, x2, y2, e) {
        if (!context) {
            return;
        } else {
            // 设置画笔的颜色和大小
            context.fillStyle = "red";  // 填充颜色为红色
            context.strokeStyle = "blue";  // 画笔的颜色
            context.lineWidth = 5;  // 指定描边线的宽度

            context.save();
            context.beginPath();

            // 写字
            context.font = "28px orbitron";
            context.fillText(textContent, parseInt(textBox.style.left), parseInt(textBox.style.top));

            context.restore();
            context.closePath();
        }
    };

    canvas.onmousedown = function mouseDownAction(e) {
        this.X1 = e.offsetX;  // 鼠标按下时保存当前位置，为起始位置
        this.Y1 = e.offsetY;
        if (textFlag) {
            textContent = textBox.value;
            textFlag = false;
            textBox.style['z-index'] = 1;
            textBox.value = "";
            this.drawing(this.X1, this.Y1);
        } else if (!textFlag) {
            textFlag = true
            textBox.style.left = this.X1 + 'px';
            textBox.style.top = this.Y1 + 'px';
            textBox.style['z-index'] = 6;
        } else {
            this.loadImage();
        }
    };

    // canvas.onmousemove = function mouseMoveAction(e) {
    //     let self = this;
    //     if (self.isMouseDown) {
    //         self.X2 = e.offsetX;
    //         self.Y2 = e.offsetY;
    //         self.drawing(self.X1, self.Y1, self.X2, self.Y2, e);
    //     }
    // };

    // canvas.onmouseup = function mouseUpAction(e) {
    //     let self = this;
    //     self.lastImage = canvas.toDataURL('image/png');
    //     self.isMouseDown = false;
    // };

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
