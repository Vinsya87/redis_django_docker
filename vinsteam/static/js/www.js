function addIframeToObjects() {
  var objectsArea = document.getElementById("objectsArea");
  var objects = objectsArea.getElementsByTagName("object");

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var iframe = document.createElement("iframe");
    iframe.width = "100%";
    // iframe.height = object.getAttribute("height");
    iframe.frameBorder = 0;

    // Присваиваем ID в зависимости от индекса объекта
    iframe.id = "iframe" + (i + 1);

    // Добавляем стили в зависимости от индекса объекта
    if (i === 0) {
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.height = "100%";
      iframe.style.height = "100%";
    } else if (i === 1) {
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.right = "0";
      iframe.style.height = "100%";
    }

    // Функция-обертка для замыкания переменной iframe
    function loadIframeWithData(iframe) {
      // Получаем строку из Redis через AJAX запрос
      $.get("/get_string_from_redis/", function (data) {
        // Вставляем строку из Redis в iframe
        iframe.contentDocument.body.innerHTML = data;
        iframe.contentDocument.body.style.display = "flex";
        iframe.contentDocument.body.style.justifyContent = "center";
        iframe.contentDocument.body.style.alignItems = "center";
        iframe.contentDocument.body.style.height = "100%";
        iframe.contentDocument.body.style.margin = "0";
      });

      object.parentNode.insertBefore(iframe, object.nextSibling);
    }

    // Вызываем функцию-обертку, передавая iframe
    loadIframeWithData(iframe);
  }
}

document.getElementById("addIframeButton").addEventListener("click", function () {
  addIframeToObjects();
});