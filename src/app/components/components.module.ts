import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { LoadingComponent } from './loading/loading.component';
import { PipesModule } from '../pipes/pipes.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    ProgressSpinnerModule,
    PipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  exports:[
    NavbarComponent,
    CardMovieComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
