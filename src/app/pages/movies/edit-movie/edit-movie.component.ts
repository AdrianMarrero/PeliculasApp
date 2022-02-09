import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  movie!: Movie;
  loading: boolean = true;
  errorService: string = '';
  idMovie!: number;

  title!: string;

  constructor(private peliculasService: PeliculasService,
              private route: ActivatedRoute) {

    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));

  }


  ngOnInit(): void {

    this.peliculasService.getMoviesById(this.idMovie)
    .subscribe(
      movie => {
        console.log(movie);
        this.movie = movie;
        this.fillForm(this.movie);
        this.loading = false;
        this.errorService = '';
      },
      err => {
        this.errorService = err.message;
        this.loading = false;
      }
    );

  }

  fillForm(movie: Movie){
    this.title = movie.title;
  }


}
