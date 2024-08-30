function scrollToSection() {
  var targetElement = document.getElementById('scrollsection1');
  if (targetElement) {
      var targetOffsetTop = targetElement.offsetTop;
      window.scrollTo({
          top: targetOffsetTop,
          behavior: 'smooth'
      });
  }
}

const urunler = Array.from(document.querySelectorAll('.urun'));
const fiyatFiltresi = document.getElementById('fiyat-filtresi');

fiyatFiltresi.addEventListener('change', function() {
  const secilenDeger = this.value;

  if (secilenDeger === 'low-to-high' || secilenDeger === 'high-to-low') {
    localStorage.setItem('sort', secilenDeger);
  } else {
    localStorage.setItem('filter', secilenDeger);
  }

  // Sayfayı yeniden yükleyin
  location.reload();
});

window.addEventListener('load', function() {
  const secilenFilter = localStorage.getItem('filter');
  const secilenSort = localStorage.getItem('sort');

  if (secilenFilter) {
    applyFilter(secilenFilter);
    fiyatFiltresi.value = secilenFilter;
  }

  if (secilenSort) {
    applySort(secilenSort);
    fiyatFiltresi.value = secilenSort;
  }

  // Filtre ve sıralama işlemi tamamlandığında localStorage'ı temizleyin
  localStorage.removeItem('filter');
  localStorage.removeItem('sort');
});

function applyFilter(secilenFiyat) {
  urunler.forEach(function(urun) {
      const urunFiyati = parseInt(urun.querySelector('.urun-fiyati').textContent);
      if (secilenFiyat === '' || urunFiyati <= secilenFiyat) {
          urun.style.display = 'block'; // Ürünleri göster
      } else {
          urun.style.display = 'none'; // Ürünleri gizle
      }
  });
}


function applySort(siralamaTuru) {
  const urunlerArray = urunler.filter(urun => urun.style.display !== 'none'); // Yalnızca görünen ürünler
  urunlerArray.sort(function(a, b) {
      const fiyatA = parseInt(a.querySelector('.urun-fiyati').textContent);
      const fiyatB = parseInt(b.querySelector('.urun-fiyati').textContent);

      if (siralamaTuru === 'low-to-high') {
          return fiyatA - fiyatB;
      } else {
          return fiyatB - fiyatA;
      }
  });

  const parentElement = document.querySelector('.row.urunler');
  parentElement.innerHTML = '';

  urunlerArray.forEach(urun => parentElement.appendChild(urun));
}