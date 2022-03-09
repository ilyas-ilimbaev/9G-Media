function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('element-show');
    }
  });
}

let options = {threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let services = document.querySelectorAll('.services-list-item');
let about = document.querySelectorAll('.about-content-item');


for (let elm of services) {
  observer.observe(elm);
}
for (let elm of about) {
  observer.observe(elm);
}