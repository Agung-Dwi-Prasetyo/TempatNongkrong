document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.carousel-slider');
    const items = document.querySelectorAll('.spot-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slider || !prevBtn || !nextBtn || items.length === 0) return;

    let index = 0; 
    const totalItems = items.length;
    // Jarak antar folder (radius imajiner)
    const xDistance = 300; 

    function updateCarousel() {
        items.forEach((item, i) => {
            
            // Hitung jarak index item dari index aktif
            // Logika ini menangani looping (agar 8 ke 1 dianggap dekat)
            let distance = i - index;
            
            // Koreksi jarak untuk looping terdekat
            if (distance > totalItems / 2) distance -= totalItems;
            if (distance < -totalItems / 2) distance += totalItems;

            // --- ATURAN TAMPILAN ---
            
            // 1. Item AKTIF (Tengah)
            if (distance === 0) {
                item.style.transform = `translateX(-50%) translateY(-50%) scale(1.2)`;
                item.style.zIndex = 10;
                item.style.opacity = 1;
                item.style.pointerEvents = 'auto'; // Bisa diklik
            } 
            // 2. Item KANAN (Jarak +1)
            else if (distance === 1) {
                item.style.transform = `translateX(calc(-50% + ${xDistance}px)) translateY(-50%) scale(0.8)`;
                item.style.zIndex = 5;
                item.style.opacity = 0.7;
                item.style.pointerEvents = 'none'; // Tidak bisa diklik biar fokus yg tengah
            } 
            // 3. Item KIRI (Jarak -1)
            else if (distance === -1) {
                item.style.transform = `translateX(calc(-50% - ${xDistance}px)) translateY(-50%) scale(0.8)`;
                item.style.zIndex = 5;
                item.style.opacity = 0.7;
                item.style.pointerEvents = 'none';
            } 
            // 4. Sisanya SEMBUNYIKAN
            else {
                // Lempar jauh atau sembunyikan di tengah
                item.style.transform = `translateX(-50%) translateY(-50%) scale(0.5)`;
                item.style.opacity = 0; 
                item.style.zIndex = 0;
                item.style.pointerEvents = 'none';
            }
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

    // Inisialisasi awal
    updateCarousel();
});