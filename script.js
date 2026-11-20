
// HIỆU ỨNG XUẤT HIỆN KHI CUỘN TRANG

const revealElements = document.querySelectorAll(
  ".intro-section, .section-heading, .chapter-heading, .wide-image, .article-content p, .article-image, blockquote, .person-card, .pull-quote, .generation-section, .ending-section"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// THANH TIẾN ĐỘ ĐỌC BÀI

const progressBar = document.querySelector(".reading-progress");

function updateReadingProgress() {
  const scrollTop = window.scrollY;
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateReadingProgress);
updateReadingProgress();


// NAVBAR ĐỔI NỀN KHI CUỘN

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ĐÁNH DẤU CHƯƠNG ĐANG ĐỌC

const chapters = document.querySelectorAll(
  "#video, #chapter-1, #chapter-2, #chapter-3"
);

const navLinks = document.querySelectorAll(".nav-links a");

const chapterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const currentId = entry.target.id;

        const activeLink = document.querySelector(
          `.nav-links a[href="#${currentId}"]`
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.35
  }
);

chapters.forEach((chapter) => {
  chapterObserver.observe(chapter);
});
