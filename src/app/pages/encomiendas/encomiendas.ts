import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Encomienda {
  codigo: string;
  origen: string;
  destino: string;
  remitente: string;
  destinatario: string;
  descripcion: string;
  pesoKg: number;
  receptorNombre: string;
  receptorDocumento: string;
  metodoPago: string;
  estado: string;
}

@Component({
  selector: 'app-encomiendas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encomiendas.html',
  styleUrl: './encomiendas.css',
})
export class EncomiendasComponent {
  // lista simulada (solo frontend)
  encomiendas: Encomienda[] = [
    {
      codigo: 'EN-001',
      origen: 'Lima',
      destino: 'Chimbote',
      remitente: 'Carlos',
      destinatario: 'Miguel',
      descripcion: 'Caja con ropa',
      pesoKg: 3.5,
      receptorNombre: 'Miguel Torres',
      receptorDocumento: '12345678',
      metodoPago: 'Yape',
      estado: 'Pendiente',
    },
  ];

  // modelo del formulario (sin codigo ni estado)
  nueva: Omit<Encomienda, 'codigo' | 'estado'> = {
    origen: '',
    destino: '',
    remitente: '',
    destinatario: '',
    descripcion: '',
    pesoKg: 0,
    receptorNombre: '',
    receptorDocumento: '',
    metodoPago: 'Efectivo',
  };

  // búsqueda
  codigoBuscar = '';
  resultadoBusqueda: Encomienda | null = null;

  // encomienda para mostrar QR
  encomiendaQr: Encomienda | null = null;

  registrarEncomienda() {
    if (
      !this.nueva.origen ||
      !this.nueva.destino ||
      !this.nueva.remitente ||
      !this.nueva.destinatario ||
      !this.nueva.descripcion ||
      !this.nueva.receptorNombre ||
      !this.nueva.receptorDocumento
    ) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const random = Math.floor(Math.random() * 90000) + 10000;
    const codigo = 'EN-' + random;

    const nuevaEncomienda: Encomienda = {
      codigo,
      origen: this.nueva.origen,
      destino: this.nueva.destino,
      remitente: this.nueva.remitente,
      destinatario: this.nueva.destinatario,
      descripcion: this.nueva.descripcion,
      pesoKg: this.nueva.pesoKg,
      receptorNombre: this.nueva.receptorNombre,
      receptorDocumento: this.nueva.receptorDocumento,
      metodoPago: this.nueva.metodoPago,
      estado: 'Pendiente',
    };

    this.encomiendas.push(nuevaEncomienda);

    // limpiar formulario
    this.nueva = {
      origen: '',
      destino: '',
      remitente: '',
      destinatario: '',
      descripcion: '',
      pesoKg: 0,
      receptorNombre: '',
      receptorDocumento: '',
      metodoPago: 'Efectivo',
    };
  }

  buscarEncomienda() {
    const codigo = this.codigoBuscar.trim().toUpperCase();
    if (!codigo) {
      this.resultadoBusqueda = null;
      return;
    }

    this.resultadoBusqueda =
      this.encomiendas.find((e) => e.codigo.toUpperCase() === codigo) ?? null;
  }

  cambiarEstado(item: Encomienda, nuevoEstado: string) {
    item.estado = nuevoEstado;
  }

  eliminar(codigo: string) {
    this.encomiendas = this.encomiendas.filter((e) => e.codigo !== codigo);

    if (this.resultadoBusqueda?.codigo === codigo) {
      this.resultadoBusqueda = null;
    }
    if (this.encomiendaQr?.codigo === codigo) {
      this.encomiendaQr = null;
    }
  }

  verQr(encomienda: Encomienda) {
    this.encomiendaQr = encomienda;
  }

  getDatosQr(e: Encomienda): string {
    return `COD:${e.codigo}|ORIG:${e.origen}|DEST:${e.destino}|DESTINATARIO:${e.destinatario}|PAGO:${e.metodoPago}`;
  }

  getQrUrl(e: Encomienda): string {
    const data = this.getDatosQr(e);
    return (
      'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' +
      encodeURIComponent(data)
    );
  }
}
