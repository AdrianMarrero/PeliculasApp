import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Actor } from '../../../interfaces/movie-response';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  movie!: Movie;
  actors!: Actor[];
  selectedActors: Actor[] = [];
  loading: boolean = true;
  errorService: string = '';
  idMovie!: number;

  title!: string;

  constructor(private peliculasService: PeliculasService,
              private route: ActivatedRoute) {

    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));

  }


  ngOnInit(): void {

    combineLatest([
      this.peliculasService.getMoviesById(this.idMovie),
      this.peliculasService.getActors()
    ]).subscribe( ([movie, actors]) => {

      this.movie = movie;
      this.actors = actors;
      this.fillForm(this.movie);
      this.concatActorName();
      this.fillSelectedActor(this.movie.actors);
      this.loading = false;
      this.errorService = '';

    });



  }


  getMoviesById(idMovie: number){
    this.peliculasService.getMoviesById(idMovie)
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

  getActors(){
    this.peliculasService.getActors()
      .subscribe(
        actor => {
          console.log(actor);
          this.actors = actor;
          this.concatActorName();
          this.fillSelectedActor(this.movie.actors);
          this.loading = false;
          this.errorService = '';
      },
      err => {
        this.errorService = err.message;
        this.loading = false;
      }
    ) ;

  }

  concatActorName(){
    this.actors.map(option => {
      const newPropsObj = {
        nombre_completo: option.first_name + ' ' + option.last_name
      };
      return Object.assign(option, newPropsObj);
    });
  }

  fillSelectedActor(actors: number[]){
    for (const iterator of this.actors) {
      for (const iterator2 of actors) {
       if(iterator.id === iterator2){
         this.selectedActors.push(iterator);
       }
    }
  }


  }

  fillForm(movie: Movie){
    this.title = movie.title;
  }


}
