import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../interfaces/movie.interface';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<ApiResult<Movie>> {
    return this.http.get<ApiResult<Movie>>(
      `${this.apiUrl}/trending/movie/week?api_key=${this.apiKey}`
    );
  }

  searchMovies(query: string, page: number = 1): Observable<ApiResult<Movie>> {
    return this.http.get<ApiResult<Movie>>(
      `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`
    );
  }

  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }
}
