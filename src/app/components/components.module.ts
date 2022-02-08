import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { LoadingComponent } from './loading/loading.component';

import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    NavbarComponent,
    CardMovieComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TagModule,
    ProgressSpinnerModule
  ],
  exports:[
    NavbarComponent,
    CardMovieComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
