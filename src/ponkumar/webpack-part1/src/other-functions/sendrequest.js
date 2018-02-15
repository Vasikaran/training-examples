export default  function sendRequest(method,url,data,callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      callback(this);
    }
  };
  xhttp.open(method, url, true);
  if (method.toUpperCase() == "POST") {
    xhttp.send(data);
  } else {
    xhttp.send();
  }

};
