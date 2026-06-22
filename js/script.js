/*
========================================================================
   POOJA NAKUM - PORTFOLIO INTERACTIVITY SCRIPT
   Description: Theme switcher, typing effects, Intersection Observers, 
                and contact form logic.
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 2. Sticky Header & Scroll Progress Bar
  // ==========================================
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Sticky Header toggle
    if (scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // Scroll Progress bar percentage calculation
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrollPercent = (scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Floating Scroll to Top button visibility
    if (scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });

  // Scroll to Top action
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================
  // 3. Mobile Navigation Hamburger Menu
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ==========================================
  // 4. Typing Text Animation Effect (Hero)
  // ==========================================
  const typingRole = document.getElementById('typingRole');
  const roles = [
    "Web Developer",
    "React Developer",
    "UI/UX Designer",
    "Information Technology Student"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isErasing = false;
  
  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isErasing) {
      // Erase character
      typingRole.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Type character
      typingRole.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Typing / Erasing speed adjustment
    let typingSpeed = isErasing ? 40 : 100;
    
    // Check if word is completed
    if (!isErasing && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at the end of the word
      isErasing = true;
    } else if (isErasing && charIndex === 0) {
      isErasing = false;
      roleIndex = (roleIndex + 1) % roles.length; // Next word
      typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  // Start typing loop
  setTimeout(typeEffect, 1000);

  // ==========================================
  // 5. Scroll Active Navigation Link Highlighting
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // offset for header
      const sectionId = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  });

  // ==========================================
  // 6. Intersection Observers (Fades & Skill Bars)
  // ==========================================
  
  // Fade In Animations on Scroll
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Delay logic for sequential grids
        const delay = entry.target.getAttribute('data-delay');
        if (delay) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
        } else {
          entry.target.classList.add('active');
        }
        elementObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });
  
  scrollElements.forEach(el => elementObserver.observe(el));

  // Animating Skill Bars on Scroll
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPercent = bar.getAttribute('data-progress');
        bar.style.width = targetPercent;
        skillObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.2
  });
  
  progressBars.forEach(bar => skillObserver.observe(bar));

  // ==========================================
  // 7. Contact Form Handling & Validation
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formResult = document.getElementById('formResult');
  const closeResultBtn = document.getElementById('closeResultBtn');
  const submitBtn = document.getElementById('formSubmitBtn');
  const submitBtnText = submitBtn.querySelector('.btn-text');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset validations
    let isFormValid = true;
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));
    
    // Validate fields
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const subjectInput = document.getElementById('formSubject');
    const messageInput = document.getElementById('formMessage');
    
    // Name check
    if (!nameInput.value.trim()) {
      showError(nameInput);
      isFormValid = false;
    }
    
    // Email check
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      showError(emailInput);
      isFormValid = false;
    }
    
    // Subject check
    if (!subjectInput.value.trim()) {
      showError(subjectInput);
      isFormValid = false;
    }
    
    // Message check
    if (!messageInput.value.trim()) {
      showError(messageInput);
      isFormValid = false;
    }
    
    // If validations pass, submit form via FormSubmit AJAX
    if (isFormValid) {
      submitBtn.disabled = true;
      submitBtnText.textContent = "Sending Message...";
      submitBtn.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin btn-icon-right';
      
      // Submit data using FormSubmit API
      fetch("https://formsubmit.co/ajax/nakumpoojan@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          subject: subjectInput.value,
          message: messageInput.value,
          _subject: `New Portfolio Message from ${nameInput.value}`,
          _captcha: "false"
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Form submission failed');
        }
        return response.json();
      })
      .then(data => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = "Send Message";
        submitBtn.querySelector('i').className = 'fa-solid fa-paper-plane btn-icon-right';
        
        // Show success result overlay
        const resultIcon = formResult.querySelector('.fa-solid');
        const resultTitle = formResult.querySelector('.result-title');
        const resultText = formResult.querySelector('.result-text');
        
        if (resultIcon) {
          resultIcon.className = 'fa-solid fa-circle-check result-success-icon';
          resultIcon.style.color = 'var(--secondary-color)';
        }
        resultTitle.textContent = "Message Sent!";
        resultText.textContent = "Thank you for reaching out, Pooja. Your message was processed successfully, and she will reply shortly.";
        
        formResult.classList.add('active');
        
        // Reset form inputs
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = "Send Message";
        submitBtn.querySelector('i').className = 'fa-solid fa-paper-plane btn-icon-right';
        
        // Show error result overlay
        const resultIcon = formResult.querySelector('.fa-solid');
        const resultTitle = formResult.querySelector('.result-title');
        const resultText = formResult.querySelector('.result-text');
        
        if (resultIcon) {
          resultIcon.className = 'fa-solid fa-circle-xmark result-success-icon';
          resultIcon.style.color = '#ef4444'; // Red error color
        }
        resultTitle.textContent = "Submission Failed";
        resultText.textContent = "Oops! Something went wrong while sending your message. Please try again or email directly at nakumpoojan@gmail.com.";
        
        formResult.classList.add('active');
      });
    }
  });
  
  // Close Result message card
  closeResultBtn.addEventListener('click', () => {
    formResult.classList.remove('active');
  });

  function showError(inputElement) {
    const formGroup = inputElement.parentElement;
    formGroup.classList.add('error');
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Monitor form input interactions to clear error alerts dynamically
  const inputs = contactForm.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const formGroup = input.parentElement;
      if (formGroup.classList.contains('error')) {
        formGroup.classList.remove('error');
      }
    });
  });
});
