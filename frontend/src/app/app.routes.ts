import { Route } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./framework/display/content/content.component').then((m) => m.ContentComponent)
        }
    },
    {
        path: ':category',
        loadComponent: () => {
            return import('./framework/display/gametable/gametable.component').then((m) => m.GametableComponent)
        }
    },
    {
        path: 'strategie/tictactoe',
        loadComponent:() => {
            return import('./games/strategie/tictactoe/tictactoe.component').then((m) => m.TictactoeComponent)
        },
    },
    {
        path: 'denken/kyudoku',
        loadComponent:() => {
            return import('./games/denken/kyudoku/kyudoku.component').then((m) => m.KyudokuComponent)
        },
    }
];
