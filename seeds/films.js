require('dotenv').config();
const mongoose = require('mongoose');
const Film = require('../models/filmModel');

mongoose.connect(process.env.DB_NAME)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Database is not connected', err.message);
  });

async function seedFilms() {
  const films = [
    {
      name_film: "Dilan 1990",
      duration: "120 Minutes",
      genre: "Romantic",
      synopsis: "Milea (Vanesha Prescilla) bertemu dengan Dilan (Iqbaal Ramadhan) di sebuah SMA di Bandung. Itu adalah tahun 1990, saat Milea pindah dari Jakarta ke Bandung. Perkenalan yang tidak biasa kemudian membawa Milea mulai mengenal keunikan Dilan lebih jauh. Dilan yang pintar, baik hati dan romantis... semua dengan caranya sendiri. Cara Dilan mendekati Milea tidak sama dengan teman-teman lelakinya yang lain, bahkan Beni, pacar Milea di Jakarta. Bahkan cara berbicara Dilan yang terdengar kaku, lambat laun justru membuat Milea kerap merindukannya jika sehari saja ia tak mendengar suara itu. Perjalanan hubungan mereka tak selalu mulus. Beni, gank motor, tawuran, Anhar, Kang Adi, semua mewarnai perjalanan itu. Dan Dilan... dengan caranya sendiri...selalu bisa membuat Milea percaya ia bisa tiba di tujuan dengan selamat. Tujuan dari perjalanan ini. Perjalanan mereka berdua. Katanya, dunia SMA adalah dunia paling indah. Dunia Milea dan Dilan satu tingkat lebih indah daripada itu.",
      director: "Pidi Baiq, Fajar Bustomi",
      writer: "Pidi Baiq",
      cast: "Iqbaal Ramadhan, Vanesha Prescilla, Giulio Parengkuan, Yoriko Angeline, Refal Hady, Debo Andryos, Brandon Salim",
      distributor: "Falcon Pictures",
      age: "18+",
      price: 35000
    },
    {
      name_film: "VINA: SEBELUM 7 HARI",
      duration: "100 Minutes",
      genre: "Horror, Drama",
      synopsis: "Jenazah Almarhumah Vina (Nayla Purnama) yang ditemukan di flyover Cirebon dianggap mengalami kecelakaan motor tunggal. Nenek Vina (Lydia Kandou) curiga karena tubuh Vina remuk tak wajar namun tak punya cukup bukti untuk menolak berita acara. Vina merasuki tubuh sahabatnya Linda (Gisellma Firmansyah), Ia hanya punya waktu sebelum 7 hari usai kematiannya untuk mengungkap kebenaran yang menyakitkan. Alfatihah.",
      director: "Anggy Umbara",
      writer: "Bounty Umbara, Dirmawan Hatta",
      cast: "Nayla Purnama, Lydia Kandou, Yusuf Mahardika, Gisellma Firmansyah, Delia Husein, Pritt Timothy, Septian Dwi Cahyo, M Imran Ismail, Fahad Haydra, Aruma Khadijah, Alvin Adam, Ridwan Kainan",
      distributor: "Dee Company",
      age: "17+",
      price: 35000
    },
    {
      name_film: "THE ARCHITECTURE OF LOVE (TAOL)",
      duration: "110 Minutes",
      genre: "Drama",
      synopsis: "Raia (Putri Marino), seorang penulis best seller yang tak lagi mampu menulis, memutuskan terbang ke New York mengejar inspirasi. Kota ini mempertemukannya dengan River (Nicholas Saputra), seorang arsitek yang misterius. Perjumpaan itu menjadi awal pertemanan 'rahasia' di antara keduanya. Mereka bisa saling menyembuhkan tapi bisa juga saling melukai.",
      director: "Teddy Soeriaatmadja",
      writer: "Alim Sudio, Ika Natassa",
      cast: "Putri Marino, Nicholas Saputra, Jerome Kurnia, Jihane Almira, Omar Daniel, Refal Hady, Agla Artalidia, Arifin Putra, Lydia Kandou, Willem Bevers, Jeremie J Tobing, Imelda Therinne",
      distributor: "Starvision, Karuna Pictures, Legacy Pictures",
      age: "17+",
      price: 35000
    },
    {
      name_film: "HARTA TAHTA RAISA",
      duration: "106 Minutes",
      genre: "Dokumenter",
      synopsis: "Waktu masih kecil, Raisa Andriana berkata pada orang tuanya bahwa dia mau jadi penyanyi, dan mau suaranya didengar banyak orang. Mimpinya itu akhirnya bisa terwujud berkat kerja keras dan dukungan orang-orang yang tepat. Berkat support system itu pula, dia bisa jadi solois perempuan pertama yang menaklukan Stadion Utama Gelora Bung Karno, Jakarta. Film dokumenter ini membawamu melihat berbagai sisi Raisa; anak, penyanyi, istri, ibu, pengusaha, dan pengejar mimpi.",
      director: "Soleh Solihun",
      writer: "Soleh Solihun",
      cast: "Raisa Andriana",
      distributor: "Imajinari, Juni Records",
      age: "SU",
      price: 35000
    },
    {
      name_film: "PAKU TANAH JAWA",
      duration: "100 Minutes",
      genre: "Horor",
      synopsis: "Sejak kecil, Ningrum (Gisellma Firmansyah) harus menghadapi pandangan negatif warga sekitar, karena ibunya - Handini (Masayu Anastasia) selalu diisukan memiliki banyak pria untuk syarat pesugihan. Kematian salah seorang teman dekat Handini, membuat keluarganya semakin disudutkan warga. Hidup Ningrum semakin tidak tenang setelah lelaki yang diam-diam ia cintai bernama Jalu (Wafda Saifan), justru terjebak menjadi tumbal baru Handini. Ningrum harus melawan banyak teror ghaib. Ningrum mendapatkan petunjuk dan meminta bantuan pada seorang Kyai yang memberinya tombak sakti yang dapat digunakan untuk memusnahkan ilmu hitam yang ada di muka bumi.",
      director: "Drias, Dato Kk Chua",
      writer: "Vidya Talisa Ariestya",
      cast: "Masayu Anastasia, Gisellma Firmansyah, Wafda Saifan, Wanda Hamidah, Ismi Melinda, Pritt Timothy, Rendra Bagus Pamungkas, Landung Simatupang, Badriyah Afiff, Beddu, Mk K-clique, Hasif Upin",
      distributor: "Armani Entertainment",
      age: "13+",
      price: 35000
    },
  ];

  try {
    await Film.insertMany(films);
    console.log('Data seed tersimpan');
  } catch (err) {
    console.log('Data tidak tersimpan', err.message);
  }
}

seedFilms();
