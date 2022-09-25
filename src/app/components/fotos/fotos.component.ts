import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Item {
  nombre: string;
  url: string;
}

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: [],
})
export class FotosComponent {
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.items = afs.collection('img').valueChanges();
  }
}
