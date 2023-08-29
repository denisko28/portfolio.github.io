"use strict";

$(document).ready(function () {
  $(".carousel").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
});

// element toggle function
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const projectItem = document.querySelectorAll(".project-item");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalCarousel = document.querySelector(".carousel");
var slidesNum = 0;
var firstShow = true;
const modalTitle = document.querySelector("[data-modal-title]");
const modalTime = document.querySelector("[data-modal-time]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < projectItem.length; i++) {
  projectItem[i].addEventListener("click", function () {
    while (slidesNum >= 0) {
      slidesNum--;
      $(".carousel").slick("slickRemove", slidesNum);
    }
    const imagesNum = Number(this.getAttribute("imagesNum"));
    const imagesFolder = this.getAttribute("imagesFolder");
    slidesNum = imagesNum;

    for (var j = 1; j <= imagesNum; j++) {
      var imgSrc = "./assets/images/" + imagesFolder + "/" + j + ".png";
      $(".carousel").slick(
        "slickAdd",
        '<div style="height: 360px"><img loading="eager" src="' + imgSrc + '"/></div>'
      );
      // let carouselItem = document.createElement("div");
      // let img = document.createElement("img");
      // img.className = "d-block w-100";
      // img.src = "./assets/images/Barbershop/" + j + ".png";
      // carouselItem.appendChild(img);
      // modalCarousel.appendChild(carouselItem);
    }

    // $('.carousel').slick("next");
    // $('.carousel').slick("prev");
    // $('.carousel').slick("prev");

    modalTitle.innerHTML = this.querySelector(".project-title").innerHTML;
    const projectDescription = this.querySelector(".project-description");
    var children = projectDescription.cloneNode(true).children;
    modalText.replaceChildren(...children);

    if (!firstShow) {
      const wrapper = document.querySelector(".readall-wrapper");
      const firstChild = wrapper.firstElementChild;
      wrapper.parentNode.replaceChild(firstChild, wrapper);
    } else {
      $('.carousel').slick("next");
      firstShow = false;
    }

    $("[data-modal-text]").readall({
      showheight: null,
      showrows: 3,
    });

    modalTime.innerHTML = projectDescription.getAttribute("time");

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
