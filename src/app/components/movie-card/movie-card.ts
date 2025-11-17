import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie!: Movie;

  get posterUrl(): string {
    if (this.movie.poster_path) {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    }

    return `https://via.placeholder.com/500x750?text=No+Image`;
  }
}
