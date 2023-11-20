'use client';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export default function sweetAlert(label,mode,dura){
  Swal.fire({
    position: "top-end",
    icon: mode === 1 ? "success" : "error",
    title: label ?? "default",
    showConfirmButton: false,
    customClass:"swal-wide",
    timer: dura ?? 1500,
  });  
}