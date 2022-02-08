import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../services/peliculas.service';
import { Movie, MovieRespose } from '../../../interfaces/movie-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.peliculasService.getMovies()
      .subscribe( movies => {
        console.log(movies);
        this.movies = movies;
      })

  }

}
