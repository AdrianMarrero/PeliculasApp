import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { Actor, Company, IGender } from 'src/app/interfaces/movie-response';
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

  myForm!: FormGroup;

  constructor(private peliculasService: PeliculasService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService) {


    this.genres = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];

  }

  ngOnInit(): void {

    combineLatest([
      this.peliculasService.getActors(),
      this.peliculasService.getCompanies()
    ]).subscribe(([actors, companies]) => {
      this.actors = actors;
      this.companies = companies;
      this.concatActorName();
      this.loading = false;
      this.errorService = '';
    },
    err => {
        this.errorService = err.message;
        this.loading = false;
    });

    this.myForm = this.fb.group({
      title: new FormControl(''),
      poster: new FormControl(''),
      selectedGenres: new FormControl(''),
      selectedActors: new FormControl(''),
      selectedCompany: new FormControl(''),
      selectedYear: new FormControl(''),
      duration: new FormControl(''),
      rate: new FormControl('')
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
}
