import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { APP_ROUTES } from './app.routes';
import { CargaImagenesService } from './services/carga-imagenes.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    NgDropFilesDirective,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [CargaImagenesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
