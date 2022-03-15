const doc = document

doc.querySelector(".application-button").addEventListener("click", function (e) {
  e.preventDefault()
  const name = doc.querySelector("input[name=application-form-name]").value
  const nickname = doc.querySelector("input[name=application-form-nickname]").value
  const list = doc.querySelector("select[name=application-form-list]").value
  const budget = doc.querySelector("input[name=application-form-budget]").value
  const time = doc.querySelector("select[name=application-form-time]").value
  const more = doc.querySelector("input[name=application-form-more]").value
  const email = doc.querySelector("input[name=application-form-email]").value
  const tel = doc.querySelector("input[name=application-form-tel]").value
  ajaxPost("/send.php", `bigform=true&name=${name}&nickname=${nickname}&list=${list}&budget=${budget}&time=${time}&more=${more}&email=${email}&tel=${tel}`, function (answer) {
    answer = JSON.parse(answer)
    if (!answer.error) {
      alert("Письмо успешно отправленно")
    } else {
      alert(answer.textError)
    }
  })
})

doc.querySelector(".contacts-submit-tel").addEventListener("click", function (e) {
  e.preventDefault()
  const tel = doc.querySelector("input[name=number]").value
  ajaxPost("/send.php", `telform=true&tel=${tel}`, function (answer) {
    answer = JSON.parse(answer)
    if (!answer.error) {
      alert("Письмо успешно отправленно")
    } else {
      alert(answer.textError)
    }
  })
})

doc.querySelector(".contacts-submit-mini").addEventListener("click", function (e) {
  e.preventDefault()
  const name = doc.querySelector("input[name=name]").value
  const email = doc.querySelector("input[name=email]").value
  const message = doc.querySelector("textarea[name=message]").value
  ajaxPost("/send.php", `miniform=true&name=${name}&email=${email}&message=${message}`, function (answer) {
    answer = JSON.parse(answer)
    if (!answer.error) {
      alert("Письмо успешно отправленно")
    } else {
      alert(answer.textError)
    }
  })
})



function ajaxPost(url, parameters, callback) {
  // parameters = encodeURIComponent(parameters)
  if (parameters === false || parameters === null || parameters === undefined) {
    parameters = "";
  }
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.addEventListener('readystatechange', function () {
    if ((request.readyState == 4) && (request.status == 200)) {
      callback(request.responseText)
    } else {
      if (request.readyState == 0) {
        // Request not initialized
      }
      if (request.status == 403) {
        // Forbidden
      }
      if (request.status == 404) {
        // Not Found
      }

    }
  });
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.send(parameters);
}