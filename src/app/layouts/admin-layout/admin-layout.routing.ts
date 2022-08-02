import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { PerfiladministradorGuard } from 'app/guards/perfiladministrador.guard';
import { EnfermeriaGuard } from 'app/guards/enfermeria/enfermeria.guard';
import { SistemasGuard } from 'app/guards/sistemas/sistemas.guard';
import { ComunicacionesGuard } from 'app/guards/comunicaciones/comunicaciones.guard';
import { ConsultasGuard } from 'app/guards/consultas/consultas.guard';
import { SupervisorGuard } from 'app/guards/supervisorentrada/supervisor.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    {
        path: 'administrador',
        canActivate: [PerfiladministradorGuard],
        loadChildren: () => import('../../modulos/administrador/administrador.module').then(m => m.AdministradorModule)
    },
    {
        path: 'enfermeria',
        canActivate: [EnfermeriaGuard],
        loadChildren: () => import('../../modulos/enfermeria/enfermeria.module').then(m => m.EnfermeriaModule)
    },
    {
        path: 'sistemas',
        canActivate: [SistemasGuard],
        loadChildren: () => import('../../modulos/sistemas/sistemas.module').then(m => m.SistemasModule)
    },
    {
        path: 'comunicaciones',
        canActivate: [ComunicacionesGuard],
        loadChildren: () => import('../../modulos/comunicaciones/comunicaciones.module').then(m => m.ComunicacionesModule)
    },
    {
        path: 'consultas',
        canActivate: [ConsultasGuard],
        loadChildren: () => import('../../modulos/consultas/consultas.module').then(m => m.ConsultasModule)
    },
    {
        path: 'entrada',
        canActivate: [SupervisorGuard],
        loadChildren: () => import('../../modulos/supervisorentrada/supervisorentrada.module').then(m => m.SupervisorentradaModule)
    }
];
