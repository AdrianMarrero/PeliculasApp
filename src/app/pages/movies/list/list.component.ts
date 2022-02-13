import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../services/peliculas.service';
import { Movie, MovieRespose } from '../../../interfaces/movie-response';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies: Movie[] = [];
  loading: boolean = true;
  errorService: string = '';


  constructor(private peliculasService: PeliculasService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.peliculasService.getMovies()
      .subscribe(
        movies => {
          this.movies = movies;
          this.loading = false;
          this.errorService = '';
        },
        err => {
          this.errorService = err.message;
          this.messageService.add({severity:'error', summary: 'Error', detail: `${this.errorService}`, sticky: true});
          this.loading = false;
      });


  }

  goAddNewMovie(){
    this.router.navigate(['/add']);
  }
}
