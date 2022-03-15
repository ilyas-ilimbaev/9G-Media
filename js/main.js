$(document).ready(function() {
  const toggleMenu = document.querySelector('.toggle-menu');
  const mobileMenu = document.querySelector('.mobile-menu-wrapper');
  const bodyEl = document.body;
  const overlay = document.querySelector('#overlay');
  const projectClick = document.querySelector(".project-click");
  const application = document.querySelector(".application");
  const applicationClosed = document.querySelector(".application-closed");
  
  //прослушиваем событие клик по гамбургеру
  toggleMenu.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      bodyEl.classList.toggle('noscroll');
  });

  //discuss the project click
  projectClick.addEventListener('click', function() {
      application.classList.toggle('active');
  });
  applicationClosed.addEventListener('click', function() {
      application.classList.remove('active');
  });
  //прослушиваем событие клик моб меню
  mobileMenu.addEventListener('click', function() {
      this.classList.remove('active');
      toggleMenu.classList.remove('active');
      overlay.classList.remove('active');
      bodyEl.classList.remove('noscroll');
  });

  //прослушиваем событие клик по overlay
  overlay.addEventListener('click', function(){
      this.classList.remove('active');
      toggleMenu.classList.remove('active');
      mobileMenu.classList.toggle('active');
      bodyEl.classList.toggle('noscroll');

  });

  let options = {threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let services = document.querySelectorAll('.services-list-item');
  let about = document.querySelectorAll('.about-content-item');

  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
      change.target.classList.add('element-show');
      }
    });
  }

  for (let elm of services) {
    observer.observe(elm);
  }
  for (let elm of about) {
    observer.observe(elm);
  }
});

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