// Tunggu hingga semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // Ambil elemen-elemen yang kita butuhkan
    const slider = document.querySelector('.carousel-slider');
    const items = document.querySelectorAll('.spot-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Cek jika tidak ada item
    if (items.length === 0) return;

    // Variabel untuk melacak posisi slider
    let index = 0;
    
    // Hitung lebar satu item (termasuk gap/jarak)
    // Kita ambil lebar item pertama + gap (20px dari CSS)
    const itemWidth = items[0].offsetWidth + 20; 

    // Hitung berapa banyak item yang muat di layar
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const itemsPerView = Math.floor(containerWidth / itemWidth);

    // Hitung batas maksimum geser
    // Total item - item yg terlihat
    const maxIndex = items.length - itemsPerView;

    // Fungsi untuk menggeser slider
    function updateSliderPosition() {
        // Pindahkan 'rel' slider ke kiri sejauh (lebar item * index)
        slider.style.transform = `translateX(-${itemWidth * index}px)`;
    }

    // Event listener untuk tombol NEXT
    nextBtn.addEventListener('click', () => {
        if (index < maxIndex) {
            index++; // Geser ke kanan
        } else {
            // Opsional: Kembali ke awal (looping)
            // index = 0; 
        }
        updateSliderPosition();
    });

    // Event listener untuk tombol PREV
    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--; // Geser ke kiri
        } else {
            // Opsional: Pergi ke akhir (looping)
            // index = maxIndex;
        }
        updateSliderPosition();
    });

});