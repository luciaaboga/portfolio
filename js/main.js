document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
  
  const roles = [
    'Estudiante',
    'Desarrolladora Full Stack',
    'UI/UX'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById('typed-text');
  
  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
      typedTextSpan.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      typedTextSpan.textContent = currentRole.substring(0, charIndex);
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1500;
    }
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
  }
  
  if (typedTextSpan) {
    typeEffect();
  }

  const trailElements = [];
  const TRAIL_LENGTH = 12;
  
  for (let i = 0; i < TRAIL_LENGTH; i++) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);
    trailElements.push(trail);
  }
  
  let trailPositions = [];
  
  document.addEventListener('mousemove', (e) => {
    trailPositions.unshift({ x: e.clientX, y: e.clientY });
    if (trailPositions.length > TRAIL_LENGTH) trailPositions.pop();
    
    trailElements.forEach((trail, index) => {
      const pos = trailPositions[index];
      if (pos) {
        trail.style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px)`;
        const opacity = 0.5 - (index * 0.035);
        const size = 8 - (index * 0.3);
        trail.style.opacity = Math.max(0.1, opacity);
        trail.style.width = `${Math.max(3, size)}px`;
        trail.style.height = `${Math.max(3, size)}px`;
        
        const colors = ['#FFAFCC', '#CDB4DB', '#A2D2FF', '#FFC8DD'];
        trail.style.background = colors[index % colors.length];
      }
    });
  });
  
  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    scrollHint.addEventListener('click', () => {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
  
  const downloadBtn = document.getElementById('downloadCvBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const cvPath = 'docs/testerTp2.pdf'; //CAMBIAR POR MI CV!!!!!!
      
      fetch(cvPath, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            const link = document.createElement('a');
            link.href = cvPath;
            link.download = 'testerTp2.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            showToastMessage('El archivo CV aún no está disponible.', '#FFAFCC');
          }
        })
        .catch(() => {
          showToastMessage('El archivo CV aún no está disponible.', '#FFAFCC');
        });
    });
  }
  
  const contactScrollBtn = document.getElementById('contactScrollBtn');
  if (contactScrollBtn) {
    contactScrollBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contactSection');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        contactSection.style.transition = 'all 0.3s';
        contactSection.style.transform = 'scale(1.01)';
        setTimeout(() => {
          contactSection.style.transform = 'scale(1)';
        }, 500);
      }
    });
  }
  
  const contactForm = document.getElementById('contactForm');
  const toastDiv = document.getElementById('toastMessage');
  
  function showToastMessage(message, color = '#CDB4DB') {
    if (toastDiv) {
      toastDiv.innerHTML = `<i class="fas fa-heart me-1" style="color: ${color}"></i> ${message}`;
      toastDiv.style.color = '#1e2a3e';
      toastDiv.style.background = 'rgba(255,255,240,0.9)';
      toastDiv.style.padding = '8px 16px';
      toastDiv.style.borderRadius = '40px';
      toastDiv.style.display = 'inline-block';
      toastDiv.classList.add('toast-show');
      setTimeout(() => {
        toastDiv.classList.remove('toast-show');
        setTimeout(() => {
          if (toastDiv.innerHTML.includes('demo') || toastDiv.innerHTML.includes('enviado')) {
            setTimeout(() => {
              toastDiv.innerHTML = '';
            }, 500);
          }
        }, 300);
      }, 3000);
    }
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse me-2"></i>Enviando...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch('https://formsubmit.co/ajax/bogadolucia52@gmail.com', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
          showToastMessage('¡Mensaje enviado con éxito! Te contactaré pronto.', '#A2D2FF');
          contactForm.reset();
        } else {
          throw new Error('Error al enviar');
        }
      } catch (error) {
        console.error('Error:', error);
        contactForm.reset();
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    const platform = icon.querySelector('i')?.classList[1]?.replace('fa-', '') || 'social';
  });
});
  
  document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.floating-blob');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, idx) => {
      const moveX = (mouseX - 0.5) * 20 * (idx + 1);
      const moveY = (mouseY - 0.5) * 20 * (idx + 1);
      blob.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`;
    });
  });
  
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const titles = ['Frontend', 'Backend', 'Full Stack', 'UI/UX'];
    });
  });
  
  const revealElements = document.querySelectorAll('.skill-card, .contact-card, .project-card, .studies-card');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealThreshold = 100;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealThreshold) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
  
    const projectDemoBtns = document.querySelectorAll('.btn-demo');
    const projectGithubBtns = document.querySelectorAll('.btn-github');

    projectDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-pulse me-1"></i> Cargando...';
        setTimeout(() => {
        btn.innerHTML = originalText;
        }, 800);
    });
    });

    projectGithubBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fab fa-github fa-pulse me-1"></i> Cargando...';
        setTimeout(() => {
        btn.innerHTML = originalText;
        }, 800);
    });
    });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
