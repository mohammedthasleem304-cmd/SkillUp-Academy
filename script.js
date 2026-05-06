// ========== RESPONSIVE NAVBAR TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  });
});

// ========== ACTIVE NAV LINK HIGHLIGHT (based on current page) ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// ========== GOOGLE DRIVE VIDEO BUTTON HANDLER (Courses Page) ==========
const watchBtns = document.querySelectorAll('.watch-btn');
watchBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const driveUrl = btn.getAttribute('data-url');
    if (driveUrl && driveUrl !== '#') {
      window.open(driveUrl, '_blank');
    } else {
      alert("📹 Sample Google Drive link: Course videos will be available upon enrollment. Contact us for access.");
    }
  });
});



// ========== CONTACT FORM VALIDATION & SUBMISSION ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successDiv = document.getElementById('formSuccessMsg');
    
    let isValid = true;
    
    // Reset errors
    if (nameError) nameError.innerText = '';
    if (emailError) emailError.innerText = '';
    if (messageError) messageError.innerText = '';
    if (successDiv) successDiv.style.display = 'none';
    
    // Name validation
    if (!name.value.trim()) {
      if (nameError) nameError.innerText = '❌ Name is required';
      isValid = false;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!email.value.trim()) {
      if (emailError) emailError.innerText = '❌ Email is required';
      isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      if (emailError) emailError.innerText = '❌ Enter a valid email';
      isValid = false;
    }
    
    // Message validation
    if (!message.value.trim()) {
      if (messageError) messageError.innerText = '❌ Message cannot be empty';
      isValid = false;
    }
    
    if (isValid) {
      // Show success message
      if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.innerHTML = '✅ Message sent successfully! We\'ll get back to you soon.';
      }
      
      // Save to Firebase if available
      if (db) {
        try {
          const contactsRef = collection(db, "contacts");
          await addDoc(contactsRef, {
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim(),
            timestamp: new Date().toISOString(),
            page: window.location.pathname
          });
          console.log("📝 Form data saved to Firebase");
        } catch (error) {
          console.warn("Firebase save failed (demo mode):", error);
        }
      } else {
        console.log("📝 Form submitted (Firebase not configured):", {
          name: name.value,
          email: email.value,
          message: message.value
        });
      }
      
      // Reset form
      contactForm.reset();
      
      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        if (successDiv) successDiv.style.display = 'none';
      }, 4000);
    }
  });
}

// ========== SMOOTH SCROLLING FOR HOMEPAGE BUTTONS ==========
const joinBtn = document.querySelector('.join-now-btn');
if (joinBtn) {
  joinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'courses.html';
    }
  });
}