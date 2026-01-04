import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    {
        path: 'users',
        loadComponent: () => import('./users/user-list/user-list.component').then(m => m.UserListComponent)
    },
    {
        path: 'users/:id',
        loadComponent: () => import('./users/user-detail/user-detail.component').then(m => m.UserDetailComponent)
    }
];
