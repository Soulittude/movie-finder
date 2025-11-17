import { SearchResults } from './pages/search-results/search-results';
import { Home } from './pages/home/home';
import { MovieDetails } from './pages/movie-details/movie-details';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search/:query', component: SearchResults },
  { path: 'movie/:id', component: MovieDetails },
  { path: '**', redirectTo: '' },
];
