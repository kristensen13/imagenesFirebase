import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileItem } from '../models/file-item';
import firebase from 'firebase/compat/app';
import { getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';
  constructor(private afs: AngularFirestore) {}

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = firebase.storage().ref();
    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
        .put(item.archivo);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,

        (snapshotEqual: firebase.storage.UploadTaskSnapshot) =>
          (item.progreso =
            (snapshotEqual.bytesTransferred / snapshotEqual.totalBytes) * 100),
        (error) => console.error('Error al subir', error),
        () => {
          console.log('Imagen cargada correctamente');

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            item.url = downloadURL;

            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url,
            });
          });

          item.estaSubiendo = false;
        }
      );
    }
  }

  private guardarImagen(imagen: { nombre: string; url: any }) {
    this.afs.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
