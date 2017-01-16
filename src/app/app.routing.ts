import { RelatoriosComponent } from './relatorios/relatorios.component';
import { HomeComponent } from './home/home.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CanActivateAuthService } from './services/canActivate';
import { MesasComponent } from './mesas/mesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { SaboresComponent } from './sabores/sabores.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes : Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sabores', component: SaboresComponent, canActivate: [CanActivateAuthService] },
    { path: '', component: HomeComponent, canActivate: [CanActivateAuthService] },
    { path: 'sabores', component: SaboresComponent, canActivate: [CanActivateAuthService] },
    { path: 'perfil', component: PerfilComponent, canActivate: [CanActivateAuthService]},
    { path: 'pedidos', component: PedidosComponent, canActivate: [CanActivateAuthService]},
    { path: 'mesas', component: MesasComponent, canActivate: [CanActivateAuthService] },
    { path: 'relatorios', component: RelatoriosComponent, canActivate: [CanActivateAuthService] }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
