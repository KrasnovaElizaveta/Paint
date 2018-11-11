let canvas,
    context,
    previousColorElement,
    previousThicknessElement,
    isDrawing;

window.onload = function () {
  canvas = document.querySelector('.drawingCanvas');
  context = canvas.getContext('2d');

  canvas.onmousedown = startDrawing;
  canvas.onmouseup = stopDrawing;
  canvas.onmouseout = stopDrawing;
  canvas.onmousemove = draw;
};

function changeColor(color, imgElement) {
  context.strokeStyle = color;

  imgElement.classList.add('Selected');

  if (previousColorElement != null) previousColorElement.classList.remove('Selected');

  previousColorElement = imgElement;
}

function changeThickness(thickness, imgElement) {
  context.lineWidth = thickness;

  imgElement.classList.add('Selected');

  if (previousThicknessElement != null) previousThicknessElement.classList.remove('Selected');

  previousThicknessElement = imgElement;
}


function startDrawing(e) {
  isDrawing = true;

  context.beginPath();
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function draw(e) {
  if (isDrawing == true) {
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;

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
  const imageCopy = document.querySelector('.savedImageCopy');
  localStorage.getItem('image', imageCopy);

  imageCopy.src = canvas.toDataURL();

  const imageContainer = document.querySelector('.savedCopyContainer');
  imageContainer.style.display = 'block';

}
