function setEqualWidthAndHeight() {
  var objects = document.querySelectorAll("object");
  for (var i = 0; i < objects.length; i++) {
    var width = objects[i].offsetWidth;
    objects[i].style.height = width + 'px';
  }
  var iframes = document.querySelectorAll("iframe");
  for (var j = 0; j < iframes.length; j++) {
    var iframeWidth = iframes[j].previousSibling.offsetWidth;
    iframes[j].style.width = iframeWidth + 'px';
  }

}


window.addEventListener('load', setEqualWidthAndHeight);


window.addEventListener('resize', setEqualWidthAndHeight);


function addIframeToObjects() {
  var objects = document.querySelectorAll("object");

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var iframe = document.createElement("iframe");
    iframe.id = "iframe" + (i + 1);
    iframe.width = object.offsetWidth + 'px';

    if (i === 0) {
      iframe.style.left = "0";
    } else if (i === 1) {
      iframe.style.right = "0";
    }

    function loadIframeWithData(iframe) {
      $.get("/get_string_from_redis/", function (data) {
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