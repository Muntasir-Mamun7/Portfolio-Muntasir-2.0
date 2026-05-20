// ===== CERTIFICATE GALLERY MODAL =====
const certificateItems = document.querySelectorAll('.certificate-gallery-item');
certificateItems.forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Certificate image');
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'certificate-modal-content';
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close certificate');
    closeBtn.style.cssText = 'position: absolute; top: 20px; right: 40px; color: #fff; font-size: 50px; font-weight: bold; cursor: pointer; z-index: 10001; background: none; border: none; line-height: 1;';
    
    modalContent.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Trap focus inside the modal
    const focusableElements = [closeBtn];
    closeBtn.focus();

    const trapFocus = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        closeBtn.focus();
      }
    };
    modal.addEventListener('keydown', trapFocus);
    
    const closeModal = (e) => {
      if (e) e.stopPropagation();
      modal.removeEventListener('keydown', trapFocus);
      modal.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(modal)) document.body.removeChild(modal);
      }, 300);
    };

    // Close modal on backdrop click (but not on image click)
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal(e);
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on Escape key
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  });
});
