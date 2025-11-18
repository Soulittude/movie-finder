import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MovieService } from '../../services/movie';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
  movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((response) => {
        // --- THIS IS THE FIX ---
        // The 'response' IS the movie object now. No need for .results[0].
        this.movie = response;
      });
    }
  }

  get posterUrl(): string {
    if (this.movie?.poster_path) {
      return `https://image.tmdb.org/t/p/w500${this.movie?.poster_path}`;
    }
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
}
