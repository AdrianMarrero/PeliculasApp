import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { ListComponent } from './movies/list/list.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListComponent,
    EditMovieComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    CardModule,
    TagModule
  ]
})
export class PagesModule { }
