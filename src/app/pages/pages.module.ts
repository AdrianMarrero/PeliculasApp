import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './movies/list/list.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';



@NgModule({
  declarations: [
    ListComponent,
    EditMovieComponent,
    AddMovieComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
