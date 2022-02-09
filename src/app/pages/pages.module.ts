import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './movies/list/list.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';


import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';

import { ComponentsModule } from '../components/components.module';
import { RatingModule } from 'ng-starrating';



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
    FormsModule,
    ComponentsModule,
    CardModule,
    ProgressSpinnerModule,
    TagModule,
    InputTextModule,
    RatingModule
  ]
})
export class PagesModule { }
