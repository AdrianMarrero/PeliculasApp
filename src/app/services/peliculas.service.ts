import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { MovieRespose, Movie, Actor, Company } from '../interfaces/movie-response';

const url = `http://localhost:3000`;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${url}/movies`);
  }

  getMoviesById(id: number):Observable<Movie>{
    return this.http.get<Movie>(`${url}/movies/${id}`);
  }

  deleteMoviesById(id: number):Observable<any>{
    return this.http.delete<any>(`${url}/movies/${id}`);
  }

  getActors():Observable<Actor[]>{
    return this.http.get<Actor[]>(`${url}/actors`);
  }

  getCompanies():Observable<Company[]>{
    return this.http.get<Company[]>(`${url}/companies`);
  }

}
