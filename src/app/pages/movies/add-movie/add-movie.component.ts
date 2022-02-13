
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { Actor, Company, IGender, Movie } from 'src/app/interfaces/movie-response';
import { ArrHelpers } from '../../../helpers/arr-helpers';

import { PeliculasService } from 'src/app/services/peliculas.service';
import { MessageService } from 'primeng/api';
import { SleepHelper } from '../../../helpers/sleep-helper';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  loading: boolean = false;
  errorService: string = '';

  genres: IGender[] = [];
  selectedGenres: IGender[] = [];
  actors!: Actor[];
  selectedActors: Actor[] = [];
  companies: Company[] = [];
  selectedCompany!: Company;
  newMovie: Movie = {
    id: 0 ,
    title: '',
    poster: null,
    genre: [],
    year: 0,
    duration: 0,
    imdbRating: 0,
    actors: []
  }

  maxDateValue: any;

  myForm!: FormGroup;


  constructor(private peliculasService: PeliculasService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {


  }

  ngOnInit(): void {

    combineLatest([
      this.peliculasService.getActors(),
      this.peliculasService.getCompanies(),
      this.peliculasService.getMovieLast()

    ]).subscribe(([actors, companies, movieIds]) => {
      this.actors = actors;
      this.companies = companies;
      this.genres = this.peliculasService.getGeners();
      this.newMovie.id = Math.max.apply(Math, movieIds) + 1;
      ArrHelpers.concatActorName(this.actors);
      this.loading = false;
      this.errorService = '';
    },
    err => {
        this.errorService = err.message;
        this.loading = false;
    });

    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)] ],
      poster: ['', []],
      selectedGenres: ['', [Validators.required, Validators.min(1)]],
      selectedActors: ['', [Validators.required, Validators.min(1)]],
      selectedCompany: ['', [Validators.required, Validators.min(1)]],
      selectedYear: ['', [Validators.required, Validators.min(1895),  Validators.max(2022)]],
      duration: [, [Validators.required, Validators.min(1)] ],
      rate: [0, [Validators.required, Validators.min(0), Validators.max(10)] ],
    })

  }

  validForm(field: string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  save(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    let form = {...this.myForm.value};

    this.newMovie.title = form.title;
    this.newMovie.poster = form.poster;
    this.newMovie.genre = form.selectedGenres.map( (genre: { name: any; }) => genre.name )
    this.newMovie.year = form.selectedYear.getFullYear();
    this.newMovie.duration = form.duration;
    this.newMovie.imdbRating = form.rate;
    this.newMovie.actors = form.selectedActors.map( (actor: { id: any; }) => actor.id );



    this.peliculasService.postMovie(this.newMovie)
      .subscribe( resp => {
        this.updateActors(form.selectedActors);
        this.updateCompany(form.selectedCompany);
        this.loading = false;
        this.router.navigate(['/home']);
      },
      err => {
          this.errorService = err.message;
          this.loading = false;
          this.myForm.reset();
          this.messageService.add({severity:'error', summary: 'Error', detail: `${this.errorService}`, sticky: true});
      })

  }

  updateActors(selectedActors: Actor[]){

    for (let index = 0; index < selectedActors.length; index++) {
      const element = selectedActors[index];
      this.peliculasService.putActor(element).subscribe(resp => {

      },
      err => {
        this.errorService = err.message;
        this.loading = false;
        return false;
      })
      SleepHelper.sleep(1000);
    }
    return true;
  }

  updateCompany(selectedCompany: Company){
    selectedCompany.movies.push(this.newMovie.id);
    this.peliculasService.updateCompaniesById(selectedCompany)
      .subscribe(resp => {
        return true;
      },
      err => {
        this.errorService = err.message;
        this.loading = false;
        return false;
      })

  }

}
