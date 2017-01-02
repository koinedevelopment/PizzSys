import { SaboresCadastroComponent } from './sabores-cadastro/sabores-cadastro.component';
import { CanActivateAuthService } from './services/canActivate';
import { MesasComponent } from './mesas/mesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { SaboresComponent } from './sabores/sabores.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes : Routes = [
    { path: '', component: LoginComponent },
    { path: 'sabores', component: SaboresComponent, canActivate: [CanActivateAuthService] },
    { path: 'sabores-cadastro', component: SaboresCadastroComponent, canActivate: [CanActivateAuthService] },
    { path: 'ingredientes', component: IngredientesComponent, canActivate: [CanActivateAuthService] },
    { path: 'perfil', component: PerfilComponent, canActivate: [CanActivateAuthService]},
    { path: 'mesas', component: MesasComponent, canActivate: [CanActivateAuthService] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
