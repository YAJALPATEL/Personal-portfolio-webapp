const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

toggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  root.setAttribute("data-theme", current === "light" ? "dark" : "light");
  toggle.textContent = current === "light" ? "☀️" : "🌙";
});


const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".card, .project, .reasons li").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_lmpc4gp", "template_p8f36vq", this).then(
      function () {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        alert("Failed to send message. Error: " + JSON.stringify(error));
      }
    );
  });
  const slider = document.querySelector('.project-slider');
  const scrollAmount = 300;

  // Clone cards for infinite scroll effect
  const cards = slider.children;
  const totalCards = cards.length;
  for (let i = 0; i < totalCards; i++) {
    slider.appendChild(cards[i].cloneNode(true));
  }

  // Scroll controls
  const btnLeft = document.querySelector('.nav.left');
  const btnRight = document.querySelector('.nav.right');

  btnLeft.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Auto scroll
  let autoScroll;
  
    function startAutoScroll() {
      if(totalCards>=4){
    autoScroll = setInterval(() => {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // If we reach halfway, reset to start
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }, 3000);
      }

  }
  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  slider.addEventListener('mouseenter', stopAutoScroll);
  slider.addEventListener('mouseleave', startAutoScroll);

  // Keyboard support
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  });

  // Set scroll to 0 and start
  slider.scrollLeft = 0;
  startAutoScroll();