import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/movies/list/list.component';
import { AddMovieComponent } from './pages/movies/add-movie/add-movie.component';
import { EditMovieComponent } from './pages/movies/edit-movie/edit-movie.component';

const routes: Routes = [
  {
    path: 'home',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddMovieComponent
  },
  {
    path: 'edit/:id',
    component: EditMovieComponent
  },
  {
    path: '**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
