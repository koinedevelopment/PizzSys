import { LoginComponent } from './login/login.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { SaboresComponent } from './sabores/sabores.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes : Routes = [
    { path: '', component: LoginComponent },
    { path: 'sabores', component: SaboresComponent },
    { path: 'ingredientes', component: IngredientesComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
