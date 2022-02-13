import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { SleepHelper } from 'src/app/helpers/sleep-helper';
import { Movie } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ArrHelpers } from '../../../helpers/arr-helpers';
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
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

    this.idMovie = Number(this.route.snapshot.paramMap.get('id'));

  }


  ngOnInit(): void {

    combineLatest([
      this.peliculasService.getMoviesById(this.idMovie),
      this.peliculasService.getActors(),
      this.peliculasService.getCompanies()

    ]).subscribe(([movie, actors, companies]) => {

      this.movie = movie;
      this.actors = actors;
      this.companies = companies;
      this.title = movie.title;
      this.concatActorName();
      this.fillSelectedActor(this.movie.actors);
      this.fillSelectedCompanies(this.movie.id, companies);

      this.loading = false;
      this.errorService = '';

    },
    err => {
        this.errorService = err.message;
        this.messageService.add({severity:'error', summary: 'Error', detail: `${this.errorService}`, sticky: true});
        this.loading = false;
    });

  }

  /**
   *
   * Display name actor firstname + lastname
   * new field in object
   *
   */
  concatActorName() {
    this.actors.map(option => {
      const newPropsObj = {
        nombre_completo: option.first_name + ' ' + option.last_name
      };
      return Object.assign(option, newPropsObj);
    });
  }

  /**
   *
   * Set selected actors
   *
   */
  fillSelectedActor(actors: number[]) {
    for (const iterator of this.actors) {
      for (const iterator2 of actors) {
        if (iterator.id === iterator2) {
          this.selectedActors.push(iterator);

        }
      }
    }
  }

  /**
   *
   * Set company dropdown
   * and inlcude "No company" case
   *
   */
  fillSelectedCompanies(movieId: number, companies: Company[]) {
    const companyFake = {
      "id": -1,
      "name": "No company",
      "country": "",
      "createYear": 2022,
      "employees": 0,
      "rating": 0,
      "movies": [],
      "disabled": true
    }
    companies.push(companyFake);
    for (const key in companies) {
      if (companies[key].movies.includes(movieId)) {
        this.selectedCompany = companies[key];
        break;
      } else {
        this.selectedCompany = companies[companies.length - 1];
      }
    }
    this.selectedCompanyOld = this.selectedCompany;
  }


  /**
   *
   *
   * Edit movie
   * 1) Update genre
   * 2) Update company (service company)
   * 3) Update movie
   * 4) Redirect home
   *
   */
  edit() {
    this.loading = true;
    this.movie.actors = this.selectedActors.map(actor => actor.id);
    if (this.newGenre !== '') {
      this.movie.genre.push(this.newGenre);
    }
    this.updateCompany();

    this.peliculasService.updateMoviesById(this.movie)
      .subscribe(movie => {
        this.loading = false;
        this.router.navigate(["/home"]);
      },
      err => {
          this.errorService = err.message;
          this.messageService.add({severity:'error', summary: 'Error', detail: `${this.errorService}`, sticky: true});
          this.loading = false;
      });

  }

  /**
   *
   * Delete movie
   * 1) Confirm
   * 2) Delete service
   * 3) Navigate home
   *
   */
  delete() {
    this.confirmationService.confirm({
      message: '¿Estás seguro que quiere eliminar ' + `${this.movie.title}` + '?',
      accept: () => {
        this.peliculasService.deleteMoviesById(this.movie.id)
          .subscribe(() => {
            this.router.navigate(['/home']);
          },
          err => {
              this.errorService = err.message;
              this.messageService.add({severity:'error', summary: 'Error', detail: `${this.errorService}`, sticky: true});
              this.loading = false;
          });
      }
    });
  }

  /**
  *
  * Update cpmany
  * 1) Delete company old
  * 2) Insert new company
  *
  */
  updateCompany() {

    ArrHelpers.removeItemFromArr(this.selectedCompanyOld.movies, this.movie.id);
    this.selectedCompany.movies.push(this.movie.id)

    this.peliculasService.updateCompaniesById(this.selectedCompanyOld)
      .subscribe(resp => {
        SleepHelper.sleep(1000);
        this.peliculasService.updateCompaniesById(this.selectedCompany)
          .subscribe(resp => {
            console.log('update');
          },
          err => {
              this.errorService = err.message;
              this.messageService.add({severity:'error', summary: 'Error', detail: `${this.errorService}`, sticky: true});
              this.loading = false;
          });
      },
      err => {
          this.errorService = err.message;
          this.messageService.add({severity:'error', summary: 'Error', detail: `${this.errorService}`, sticky: true});
          this.loading = false;
      });

  }


}
