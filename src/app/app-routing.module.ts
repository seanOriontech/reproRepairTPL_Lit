import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TechListComponent } from './components/techList/techList.component';
import { TechPageComponent } from './pages/techPage/techPage.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'mainPage',
    loadChildren: () =>
      import('./pages/mainMenu/mainMenu.module').then((m) => m.MainMenuModule),
  },
  {
    path: 'itemPage',
    loadChildren: () =>
      import('./pages/items/items.module').then((m) => m.ItemsModule),
  },
  {
    path: 'jobsPage',
    loadChildren: () =>
      import('./pages/jobs/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'mainPage',
    redirectTo: 'mainPage',
    pathMatch: 'full',
  },
  {
    path: 'itemPage',
    redirectTo: 'itemPage',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'jobsPage',
    redirectTo: 'jobsPage',
    pathMatch: 'full',
  },

  {
    path: 'technician',

    pathMatch: 'full',
    component: TechPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
