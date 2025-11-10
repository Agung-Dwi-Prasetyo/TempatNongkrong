document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.carousel-slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slider || !prevBtn || !nextBtn) {
        console.error("Elemen carousel (slider atau tombol) tidak ditemukan!");
        return; 
    }

    let items = document.querySelectorAll('.spot-item');
    if (items.length === 0) return;

    let index = 0; 
    const totalItems = items.length;
    const angle = 360 / totalItems; 
    const radius = 450; 

    function updateCarousel() {
        const rotateY = -index * angle;
        slider.style.transform = `rotateY(${rotateY}deg)`;
        items.forEach((item, i) => {
            const itemAngle = i * angle;
            
            // Atur posisi awal item di lingkaran 3D
            let transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
            transform += ` rotateY(${itemAngle * -1}deg)`;
            transform += ` rotateY(${rotateY * -1}deg)`;
            
            // Hitung jarak dari index aktif (0)
            let distance = Math.abs(i - index);
            
            // Cek jarak terdekat (untuk looping dari 8 ke 1)
            if (distance > totalItems / 2) {
                distance = totalItems - distance; 
            }
            if (distance === 0) {
                item.style.opacity = '1';
                item.style.zIndex = '10';
            } else if (distance === 1) {
                item.style.opacity = '0.8'; 
                item.style.zIndex = '5';
            } else {
                item.style.opacity = '0'; 
                item.style.zIndex = '0';
            }
            
            // Terapkan semua transform
            item.style.transform = `translateX(-50%) translateY(-50%) ${transform}`;
        });
    }

    // Tombol NEXT
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % totalItems;
        updateCarousel();
    });

    // Tombol PREV
    prevBtn.addEventListener('click', () => {
        index = (index - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Panggil fungsi saat pertama kali dimuat
    updateCarousel();
    
    // Panggil fungsi jika ukuran window berubah
    window.addEventListener('resize', updateCarousel);
});