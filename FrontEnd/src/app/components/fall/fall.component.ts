import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Games } from 'src/app/models/games.model';
import { GamesApiService } from 'src/app/services/games-api.service';

@Component({
  selector: 'app-fall',
  templateUrl: './fall.component.html',
  styleUrls: ['./fall.component.css']
})
export class FallComponent implements OnInit {
  @Input()
  games :Games;

  @Input()
  index: number;


  highlighted : Games | null;

  season: string;
  fallGames: Games[];
  

  constructor(private gamesApi: GamesApiService, private route: ActivatedRoute, private router: Router) {
    this.season='';
    this.fallGames=[];
    this.highlighted = null;
    this.index = 0;

    this.games = new Games(1, 'hola', 'nohejbvehvbrhvbrhvbeurvhbeurhbveurvbeurvbeuhrvbehvdijdevhbuehrbievbiehvbeirvbeirhjvbeijrvbeijveirvbeorijneornvoekrnveornveorineorvneovneoirnveornvieorinveresrberberbegrtb', 'data:image/jpeg;base64,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', 'Winter', 'Entertainment');
  }

  ngOnInit(): void {
    this.getFall();
  }

  getFall():void {
    this.season=this.route.snapshot.params['season'] as string;
    this.gamesApi.getFall(this.season).subscribe(
      (response:Games[])=>{
        this.fallGames=response;
        console.log(response);
      }
    );
  }

  highlight(games: Games | null) : void {
    this.highlighted = games;
  }

}
