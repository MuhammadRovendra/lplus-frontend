import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SweetAlertService = {
  confirmDeletion: async () => {
    return MySwal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat memulihkan semua data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus !',
      cancelButtonText: "Batalkan !",
    });
  },

  confirmLike: async () => {
    return MySwal.fire({
      title: 'Apa kamu suka materi ini?',
      text: 'Berikan like jika kamu suka dengan materi ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Like',
      cancelButtonText: "Nanti saja",
    });
  },

  askRating: async () => {
    return MySwal.fire({
      title: 'Berikan Rating Anda Untuk Bandle ini',
      html: `
        <style>
          .star-rating {
            display: flex;
            justify-content: center;
            flex-direction: row-reverse;
            font-size: 2rem;
            gap: 0.5rem;
          }
          .star-rating input {
            display: none;
          }
          .star-rating label {
            cursor: pointer;
            color: #ddd;
          }
          .star-rating input:checked ~ label,
          .star-rating label:hover,
          .star-rating label:hover ~ label {
            color: #ffc107;
          }
        </style>
        <div class="star-rating">
          <input type="radio" id="star5" name="rating" value="5"/><label for="star5">★</label>
          <input type="radio" id="star4" name="rating" value="4"/><label for="star4">★</label>
          <input type="radio" id="star3" name="rating" value="3"/><label for="star3">★</label>
          <input type="radio" id="star2" name="rating" value="2"/><label for="star2">★</label>
          <input type="radio" id="star1" name="rating" value="1"/><label for="star1">★</label>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const selected = document.querySelector('input[name="rating"]:checked');
        if (!selected) {
          Swal.showValidationMessage('Silakan pilih rating');
        }
        return parseFloat(selected.value);
      },
      confirmButtonText: 'Kirim',
      showCancelButton: true,
      cancelButtonText: 'Batal'
    });
  },

  ChooseMenu: async () => {
    return MySwal.fire({
      title: 'Selamat sudah menyelesaikan Materi,',
      text: 'Mau lanjutkan Materi atau kembali ke halaman Utama ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Kembali',
      cancelButtonText: "Lanjutkan",
    });
  },

  confirmUpdateStatus: async () => {
    return MySwal.fire({
      title: 'Apa kamu yakin?',
      text: 'Menaktifkan Alat',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Aktifkan !',
      cancelButtonText: "Batalkan !",
    });
  },

  showSuccess: (title, text) => {
    return MySwal.fire({
      title: title || 'Success!',
      text: text || 'Operation successful.',
      icon: 'success',
    });
  },

  showError: (title, text) => {
    return MySwal.fire({
      title: title || 'Error!',
      text: text || 'Something went wrong.',
      icon: 'error',
    });
  },
};

export default SweetAlertService;
