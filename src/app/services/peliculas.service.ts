import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieRespose, Movie } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>('http://localhost:3000/movies');
  }

  getActor():Observable<MovieRespose>{
    return this.http.get<MovieRespose>('http://localhost:3000/actors');
  }

  getCompanies():Observable<MovieRespose>{
    return this.http.get<MovieRespose>('http://localhost:3000/companies');
  }
}
