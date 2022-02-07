export interface MovieRespose {
  movies:    Movie[];
  actors:    Actor[];
  companies: Company[];
}

export interface Actor {
  id:         number;
  first_name: string;
  last_name:  string;
  gender:     Gender;
  bornCity:   string;
  birthdate:  string;
  img:        null | string;
  rating:     number;
  movies:     number[];
}

export enum Gender {
  Female = "Female",
  Male = "Male",
}

export interface Company {
  id:         number;
  name:       string;
  country:    string;
  createYear: number;
  employees:  number;
  rating:     number;
  movies:     number[];
}

export interface Movie {
  id:         number;
  title:      string;
  poster:     null | string;
  genre:      string[];
  year:       number;
  duration:   number;
  imdbRating: number;
  actors:     number[];
}
