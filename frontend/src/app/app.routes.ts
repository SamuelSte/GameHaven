import { Route } from '@angular/router';
import { AppLayoutComponent } from './framework/layouts/app-layout/app-layout.component';
import { OnlyHeaderLayoutComponent } from './framework/layouts/only-header-layout/only-header-layout.component';

export const routes: Route[] = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: '', loadComponent: () => import('./framework/display/content/content.component').then((m) => m.ContentComponent) },
            { path: ':category', loadComponent: () => import('./framework/display/gametable/gametable.component').then((m) => m.GametableComponent) },
            { path: 'strategie/tictactoe', loadComponent: () => import('./games/strategie/tictactoe/tictactoe.component').then((m) => m.TictactoeComponent) },
            { path: 'denken/kyudoku', loadComponent: () => import('./games/denken/kyudoku/kyudoku.component').then((m) => m.KyudokuComponent) },
            { path: 'denken/binarypuzzle', loadComponent: () => import('./games/denken/binarypuzzle/binarypuzzle.component').then((m) => m.BinarypuzzleComponent) }
        ]
    },
    {
        path: 'auth',
        component: OnlyHeaderLayoutComponent,
        children: [
            { path: 'login', loadComponent: () => import('./user/login/login.component').then((m) => m.LoginComponent) },
            { path: 'signup', loadComponent: () => import('./user/signup/signup.component').then((m) => m.SignupComponent) }
        ]
    }
];
