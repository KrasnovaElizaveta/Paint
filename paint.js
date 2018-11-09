let canvas,
    context,
    previousColorElement,
    previousThicknessElement,
    isDrawing;
let coords = [];

window.onload = function() {
    canvas = document.getElementById("drawingCanvas");
    context = canvas.getContext("2d");
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmouseout = stopDrawing;
    canvas.onmousemove = draw;
}

function changeColor(color, imgElement) {
    context.strokeStyle = color;
    imgElement.className = "Selected";

    // Возвращаем ранее выбранный элемент <img> в нормальное состояние
    if (previousColorElement != null)
        previousColorElement.className = "";

    previousColorElement = imgElement;
}

// Отслеживаем элемент <img> для толщины линии, по которому ранее щелкнули

function changeThickness (thickness, imgElement)
{
    // Изменяем текущую толщину линии
    context.lineWidth = thickness;

    // Меняем стиль элемента <img>, по которому щелкнули
    imgElement.className = "Selected";

    // Возвращаем ранее выбранный элемент <img> в нормальное состояние
    if (previousThicknessElement != null)
        previousThicknessElement.className = "";

    previousThicknessElement = imgElement;
}


function startDrawing(e) {
    // Начинаем рисовать
    isDrawing = true;

    // Создаем новый путь (с текущим цветом и толщиной линии)
    context.beginPath();

    // Нажатием левой кнопки мыши помещаем "кисть" на холст
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function draw(e) {
    if (isDrawing == true)
    {
        // Определяем текущие координаты указателя мыши
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;

        // Рисуем линию до новой координаты
        context.lineTo(x, y);
        context.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    // Находим элемент <img>
    let imageCopy = document.getElementById("savedImageCopy");

    // Отображаем данные холста в элементе <img>
    imageCopy.src = canvas.toDataURL();

    // Показываем элемент <div>, делая изображение видимым
    // делая изображение видимым
    let imageContainer = document.getElementById("savedCopyContainer");
    imageContainer.style.display = "block";

    localStorage.getItem("image", imageCopy);


}