import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, EMPTY, of } from 'rxjs';
import { catchError, delay, map, timeout } from 'rxjs/operators';
import { MovieRespose, Movie, Actor, Company } from '../interfaces/movie-response';

const url = `http://localhost:4000`;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  genres = [
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

  getGeners(){
    return this.genres;
  }

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${url}/movies`);
  }

  getMoviesById(id: number):Observable<Movie>{
    return this.http.get<Movie>(`${url}/movies/${id}`);
  }

  getMovieLast():Observable<any>{
    return this.http.get<any>(`${url}/movies`)
    .pipe(
      map(resp => resp.map( (movie: { id: any; }) => movie.id ),
      catchError(err => of(false))
    ));
  }

  postMovie(movie: Movie):Observable<Movie>{
    return this.http.post<Movie>(`${url}/movies/`, movie);
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

  putActor(actor: Actor):Observable<Actor>{
    return this.http.put<Actor>(`${url}/actors/${actor.id}`, actor);
  }

  getCompanies():Observable<Company[]>{
    return this.http.get<Company[]>(`${url}/companies`);
  }

  postCompanies(companiesAll: Company[]):Observable<Company[]>{

    const httpOptions = {
      headers: new HttpHeaders({'Content-type': 'application-json'})
    };
    const companies: never[] = [];

    return this.http.post<Company[]>(`${url}/companies/`, companies, httpOptions);

  }

  updateCompaniesById(company: Company):Observable<Company>{
    if(company.id !== -1){
      return this.http.put<Company>(`${url}/companies/${company.id}`, company);
    }
    return EMPTY;
  }

}


