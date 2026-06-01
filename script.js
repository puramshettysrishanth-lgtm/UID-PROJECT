window.onload = function() {
  initSlider();
  initNavbar();
  initContactForm();
  initScrollEffect();
};

var currentSlide = 0;
var totalSlides = 3;
var sliderInterval;

function initSlider() {
  var wrapper = document.getElementById("slidesWrapper");
  var dots = document.getElementsByClassName("dot");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");

  
  sliderInterval = setInterval(function() {
    goToSlide(currentSlide + 1);
  }, 4000);

  
  nextBtn.onclick = function() {
    clearInterval(sliderInterval);
    goToSlide(currentSlide + 1);
    sliderInterval = setInterval(function() {
      goToSlide(currentSlide + 1);
    }, 4000);
  };

  
  prevBtn.onclick = function() {
    clearInterval(sliderInterval);
    goToSlide(currentSlide - 1);
    sliderInterval = setInterval(function() {
      goToSlide(currentSlide + 1);
    }, 4000);
  };

  
  for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function() {
      var idx = parseInt(this.getAttribute("data-index"));
      clearInterval(sliderInterval);
      goToSlide(idx);
      sliderInterval = setInterval(function() {
        goToSlide(currentSlide + 1);
      }, 4000);
    });
  }
}

function goToSlide(index) {
  var wrapper = document.getElementById("slidesWrapper");
  var dots = document.getElementsByClassName("dot");

  
  if (index >= totalSlides) {
    index = 0;
  }
  if (index < 0) {
    index = totalSlides - 1;
  }

  currentSlide = index;

  
  wrapper.style.transform = "translateX(-" + (currentSlide * 100) + "%)";

  
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[currentSlide].classList.add("active");
}

function initNavbar() {
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  hamburger.onclick = function() {
    
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
    } else {
      navLinks.classList.add("open");
    }
  };

  
  var links = navLinks.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
      navLinks.classList.remove("open");
    });
  }
}

function initScrollEffect() {
  var navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function() {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)";
    } else {
      navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    }
  });
}

function initContactForm() {
  var submitBtn = document.getElementById("submitBtn");
  var formMsg = document.getElementById("formMsg");

  submitBtn.onclick = function() {
    var name  = document.getElementById("nameInput").value.trim();
    var email = document.getElementById("emailInput").value.trim();
    var msg   = document.getElementById("msgInput").value.trim();

    
    if (name === "" || email === "" || msg === "") {
      formMsg.style.color = "red";
      formMsg.innerHTML = "Please fill in all fields before submitting.";
      return;
    }

    
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      formMsg.style.color = "red";
      formMsg.innerHTML = "Please enter a valid email address.";
      return;
    }

    
    formMsg.style.color = "green";
    formMsg.innerHTML = "Thank you, " + name + "! Your message has been sent successfully.";

    
    document.getElementById("nameInput").value  = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("msgInput").value   = "";
  };
}
