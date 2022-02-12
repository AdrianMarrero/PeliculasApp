
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { Actor, Company, IGender, Movie } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  loading: boolean = false;
  errorService: string = '';

  genres: IGender[];
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
    private confirmationService: ConfirmationService) {

    this.genres = [
      {name: 'Comedy', code: 'Comedy'},
      {name: 'Musical', code: 'Musical'},
      {name: 'Romance', code: 'Romance'},
      {name: 'Horror', code: 'Horror'},
      {name: 'Thriller', code: 'Thriller'},
      {name: 'Drama', code: 'Drama'},
      {name: 'War', code: 'War'},
      {name: 'Adventure', code: 'Adventure'},
      {name: 'Crime', code: 'Crime'},
      {name: 'Action', code: 'Action'},
      {name: 'Animation', code: 'Animation'},
      {name: 'Sci-Fi', code: 'Sci-Fi'},
      {name: 'Otros', code: 'Otros'}
    ];

  }

  ngOnInit(): void {

    combineLatest([
      this.peliculasService.getActors(),
      this.peliculasService.getCompanies(),
      this.peliculasService.getMovieLast()

    ]).subscribe(([actors, companies, movie]) => {
      this.actors = actors;
      this.companies = companies;
      this.newMovie.id = movie + 1;
      this.concatActorName();
      this.loading = false;
      this.errorService = '';
    },
    err => {
        this.errorService = err.message;
        this.loading = false;
    });

    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)] ],
      poster: ['', [Validators.required, Validators.minLength(3)]],
      selectedGenres: ['', [Validators.required, Validators.min(1)]],
      selectedActors: ['', [Validators.required, Validators.min(1)]],
      selectedCompany: ['', [Validators.required, Validators.min(1)]],
      selectedYear: ['', [Validators.required, Validators.min(1895)]],
      duration: [, [Validators.required, Validators.min(1)] ],
      rate: [0, [Validators.required, Validators.min(0), Validators.max(10)] ],
    })

  }

  concatActorName() {
    this.actors.map(option => {
      const newPropsObj = {
        nombre_completo: option.first_name + ' ' + option.last_name
      };
      return Object.assign(option, newPropsObj);
    });
  }

  validForm(field: string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  save(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    let form = {...this.myForm.value};

    this.newMovie.title = form.title;
    this.newMovie.poster = form.poster;
    this.newMovie.genre = form.selectedGenres.map( (genre: { name: any; }) => genre.name )
    this.newMovie.year = form.selectedYear.getFullYear();
    this.newMovie.duration = form.duration;
    this.newMovie.imdbRating = form.rate;
    this.newMovie.actors = form.selectedActors.map( (actor: { id: any; }) => actor.id );



    console.log(this.newMovie);

    this.peliculasService.postMovie(this.newMovie)
      .subscribe( resp => {
        console.log('insert')
      });

    this.myForm.reset();
  }

}
