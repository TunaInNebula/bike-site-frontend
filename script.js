function scrollToSection() {
    // Kaydırılacak hedef elementi seçin (örneğin, bir div'in id'si)
    var targetElement = document.getElementById('scrollsection1');
  
    // Eğer hedef element bulunursa ve varsa
    if (targetElement) {
      // Hedef elementin yüksekliğini alın
      var targetOffsetTop = targetElement.offsetTop;
  
      // Sayfayı hedef elementin üstüne kaydırın
      window.scrollTo({
        top: targetOffsetTop,
        behavior: 'smooth' // Animasyonlu bir kaydırma yapmak için 'smooth' kullanın
      });
    }
  }