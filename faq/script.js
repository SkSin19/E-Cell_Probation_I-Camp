const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const isActive = header.classList.contains('active');
    
    accordionHeaders.forEach(otherHeader => {
      otherHeader.classList.remove('active');
      otherHeader.nextElementSibling.classList.remove('active');
    });

    if (!isActive) {
      header.classList.add('active');
      header.nextElementSibling.classList.add('active');
    }
  });
});
