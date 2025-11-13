import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { EncomiendasComponent } from './pages/encomiendas/encomiendas';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'encomiendas', component: EncomiendasComponent },
];
