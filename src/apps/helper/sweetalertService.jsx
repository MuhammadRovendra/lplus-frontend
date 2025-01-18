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
