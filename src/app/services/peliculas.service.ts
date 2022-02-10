import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, EMPTY } from 'rxjs';
import { MovieRespose, Movie, Actor, Company } from '../interfaces/movie-response';

const url = `http://localhost:4000`;

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

  updateMoviesById(movie: Movie):Observable<Movie>{
    return this.http.put<any>(`${url}/movies/${movie.id}`, movie);
  }

  getActors():Observable<Actor[]>{
    return this.http.get<Actor[]>(`${url}/actors`);
  }

  getCompanies():Observable<Company[]>{
    return this.http.get<Company[]>(`${url}/companies`);
  }

  updateCompaniesById(company: Company):Observable<Movie>{
    if(company.id !== -1){
      return this.http.put<any>(`${url}/companies/${company.id}`, company);
    }
    return EMPTY;
  }

}
