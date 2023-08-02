function addIframeToObjects() {
  var objectsArea = document.getElementById("objectsArea");
  var objects = objectsArea.getElementsByTagName("object");

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];

    // Проверяем, содержит ли object уже iframe
    if (!object.getElementsByTagName("iframe").length) {
      var iframe = document.createElement("iframe");
      iframe.width = object.getAttribute("width");
      iframe.height = object.getAttribute("height");

      // Функция-обертка для замыкания переменной iframe
      function loadIframeWithData(iframe, object) {
        // Получаем строку из Redis через AJAX запрос
        $.get("/get_string_from_redis/", function (data) {
          // Вставляем строку из Redis в iframe
          iframe.contentDocument.body.innerHTML = data;
          iframe.contentDocument.body.style.display = "flex";
          iframe.contentDocument.body.style.justifyContent = "center";
          iframe.contentDocument.body.style.alignItems = "center";
          iframe.contentDocument.body.style.height = "100vh";
          iframe.contentDocument.body.style.margin = "0";
        });

        object.appendChild(iframe);
      }
      loadIframeWithData(iframe, object);
    }
  }
}

document
  .getElementById("addIframeButton")
  .addEventListener("click", function () {
    addIframeToObjects();
  });
$(document).ready(function () {
  addIframeToObjects();
});
