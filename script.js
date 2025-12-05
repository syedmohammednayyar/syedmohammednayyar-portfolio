

 const texts = ["Software Developer", "Web Developer"];
    let i = 0, j = 0, currentText = "", isDeleting = false;
    const typedText = document.querySelector(".typed-text");

    function type() {
      if (i < texts.length) {
        if (!isDeleting && j <= texts[i].length) {
          currentText = texts[i].substring(0, j++);
        } else if (isDeleting && j >= 0) {
          currentText = texts[i].substring(0, j--);
        }

        typedText.textContent = currentText;

        if (!isDeleting && j === texts[i].length) {
          isDeleting = true;
          setTimeout(type, 1000);
          return;
        } else if (isDeleting && j === 0) {
          isDeleting = false;
          i = (i + 1) % texts.length;
        }

        setTimeout(type, isDeleting ? 50 : 150);
      }
    }

    document.addEventListener("DOMContentLoaded", type);

// Add this to a script tag in your HTML or a separate JS file
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navlist = document.querySelector('.navlist');
    
    if (hamburger && navlist) {
        hamburger.addEventListener('click', function() {
            navlist.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navlist a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navlist.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navlist.contains(e.target)) {
                navlist.classList.remove('active');
            }
        });
    }
});


document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function() {
        window.open("https://github.com/syedmohammednayyar?tab=repositories", "_blank"); // Opens link in a new tab
    });
});

 var form = document.getElementById('contactform');
 form.addEventListener('submit', e => {
 e.preventDefault();
 fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
  .then(response => response.text())
  .then(text => {
    console.log(text);
    alert('Submitted !! Thank you ' + document.getElementById("username").value + ' I will get back to you soon.');
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error sending your message. Please try again later.');
  });
});
