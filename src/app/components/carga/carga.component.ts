import { Component } from '@angular/core';

import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [],
})
export class CargaComponent {
  estaSobreElemento = false;

  archivos: FileItem[] = [];

  constructor(public _cargaImagenesSvc: CargaImagenesService) {}
  cargarImagenes() {
    this._cargaImagenesSvc.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
