import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Movie } from '../../interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {
  movies: Movie[] = [];
  query: string = '';
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.movies = [];
          this.currentPage = 1;
          this.query = params.get('query') || '';
          return this.movieService.searchMovies(this.query, this.currentPage);
        })
      )
      .subscribe((response) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
      });
  }

  loadMore(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.movieService.searchMovies(this.query, this.currentPage).subscribe((response) => {
        this.movies = [...this.movies, ...response.results];
        this.totalPages = response.total_pages;
      });
    }
  }
}
