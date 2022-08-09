package com.ironhack.gamesservice.services.interfaces;

import com.ironhack.gamesservice.enums.Season;
import com.ironhack.gamesservice.enums.Type;
import com.ironhack.gamesservice.model.Games;

import java.util.List;

public interface GameServiceService {
    List<Games> findGamesByName(String name);
    List<Games> findGamesBySeason(Season season);
    List<Games> findGamesByType(Type type);
}
