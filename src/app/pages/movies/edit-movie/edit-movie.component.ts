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
  selectedActorsIDs: number[] = [];
  companies: Company[] = [];
  selectedCompany!: Company;
  selectedCompanyOld!: Company;
  loading: boolean = true;
  errorService: string = '';
  idMovie!: number;

  title!: string;
  newGenre: string = '';

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
    const companyFake = {
      "id": -1,
      "name": "No company",
      "country": "",
      "createYear": 2022,
      "employees": 0,
      "rating": 0,
      "movies": []
      }
    companies.push(companyFake);
    for (const key in companies) {
      if(companies[key].movies.includes(movieId)){
        this.selectedCompany = companies[key];
        break;
      }else{
        this.selectedCompany = companies[companies.length - 1];
      }
    }
    this.selectedCompanyOld = this.selectedCompany;
  }

  fillForm(movie: Movie){
    this.title = movie.title;
  }

  edit(){

    this.movie.actors = this.selectedActors.map(actor => actor.id);
    if(this.newGenre !== ''){
      this.movie.genre.push(this.newGenre);
    }

    this.updateCompany();


    console.log(this.movie);
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

  updateCompany(){
    console.log(this.selectedCompany);
    this.removeItemFromArr(this.selectedCompanyOld.movies, this.movie.id);
    if(this.selectedCompanyOld.id !== -1){
      this.peliculasService.updateCompaniesById(this.selectedCompanyOld)
        .subscribe( company => {
          console.log(company);

        });
    }
    this.selectedCompany.movies.push(this.movie.id);
    this.peliculasService.updateCompaniesById(this.selectedCompany)
    .subscribe( company => {
      console.log(company);
      this.router.navigate(['/home'])
    })


  }

  removeItemFromArr( arr:any, item:number ){
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
  };
}
