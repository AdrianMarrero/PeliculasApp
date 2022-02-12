import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from './time-format.pipe';
import { PosterPipe } from './poster.pipe';



@NgModule({
  declarations: [
    TimeFormatPipe,
    PosterPipe
  ],
  exports: [
    TimeFormatPipe,
    PosterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
