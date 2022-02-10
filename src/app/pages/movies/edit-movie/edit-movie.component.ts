import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Movie } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Actor, Company } from '../../../interfaces/movie-response';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  movie!: Movie;
  actors!: Actor[];
  selectedActors: Actor[] = [];
  companies: Company[] = [];
  selectedCompany!: Company;
  loading: boolean = true;
  errorService: string = '';
  idMovie!: number;

  title!: string;

  constructor(private peliculasService: PeliculasService,
              private route: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService) {

    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));

  }


  ngOnInit(): void {

    combineLatest([
      this.peliculasService.getMoviesById(this.idMovie),
      this.peliculasService.getActors(),
      this.peliculasService.getCompanies()

    ]).subscribe( ([movie, actors, companies]) => {

      this.movie = movie;
      this.actors = actors;
      this.companies = companies;
      this.fillForm(this.movie);
      this.concatActorName();
      this.fillSelectedActor(this.movie.actors);
      this.fillSelectedCompanies(this.movie.id, companies);

      this.loading = false;
      this.errorService = '';

    },
    err => {
      this.errorService = err.message;
      this.loading = false;
    });



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

  fillSelectedCompanies(movieId: number, companies: Company[]){
    for (const key in companies) {
      if(companies[key].movies.includes(movieId)){
        this.selectedCompany = companies[key];
        break;
      }
    }
  }

  fillForm(movie: Movie){
    this.title = movie.title;
  }

  edit(){

  }

  delete(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que quiere eliminar '+ `${this.movie.title}`+ '?',
      accept: () => {
          this.peliculasService.deleteMoviesById(this.movie.id)
            .subscribe( resp => {
              this.router.navigate(['/home']);
          });
      }
  });
  }

}
