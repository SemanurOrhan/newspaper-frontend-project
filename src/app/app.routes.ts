import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
