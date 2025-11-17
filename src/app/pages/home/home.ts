import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MovieService } from '../../services/movie';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  trendingMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getTrendingMovies().subscribe((response) => {
      this.trendingMovies = response.results;
    });
  }
}
