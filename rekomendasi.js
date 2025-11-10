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
    
    // Kita perbesar radiusnya agar tidak tumpang tindih
    const radius = 450; 

    function updateCarousel() {
        // 1. Putar seluruh slider
        const rotateY = -index * angle;
        slider.style.transform = `rotateY(${rotateY}deg)`;

        // 2. Atur setiap item
        items.forEach((item, i) => {
            const itemAngle = i * angle;
            
            // Atur posisi awal item di lingkaran 3D
            let transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
            transform += ` rotateY(${itemAngle * -1}deg)`;
            transform += ` rotateY(${rotateY * -1}deg)`;

            // --- INI LOGIKA UNTUK MENAMPILKAN HANYA 3 ITEM ---
            
            // Hitung jarak dari index aktif (0)
            let distance = Math.abs(i - index);
            
            // Cek jarak terdekat (untuk looping dari 8 ke 1)
            if (distance > totalItems / 2) {
                distance = totalItems - distance; 
            }

            // Terapkan style berdasarkan jarak
            if (distance === 0) {
                // Item Aktif (Tengah)
                item.style.opacity = '1';
                item.style.zIndex = '10';
            } else if (distance === 1) {
                // Item Samping (Kiri/Kanan)
                item.style.opacity = '0.8'; // Agak transparan
                item.style.zIndex = '5';
            } else {
                // SEMUA ITEM LAIN (jarak > 1)
                item.style.opacity = '0'; // HILANG
                item.style.zIndex = '0';
            }
            
            // Terapkan semua transform
            item.style.transform = `translateX(-50%) translateY(-50%) ${transform}`;
        });
    }

    // Tombol NEXT (looping 100% mulus)
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % totalItems;
        updateCarousel();
    });

    // Tombol PREV (looping 100% mulus)
    prevBtn.addEventListener('click', () => {
        index = (index - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Panggil fungsi saat pertama kali dimuat
    updateCarousel();
    
    // Panggil fungsi jika ukuran window berubah
    window.addEventListener('resize', updateCarousel);
});