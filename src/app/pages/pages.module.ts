import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

import { ListComponent } from './movies/list/list.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';


import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    ListComponent,
    EditMovieComponent,
    AddMovieComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    CardModule,
    ProgressSpinnerModule,
    TagModule
  ]
})
export class PagesModule { }
