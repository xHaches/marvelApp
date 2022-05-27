import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pluck, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharactersResponse, Character } from '../interfaces/characters';
import { CharactersStore } from '../../shared/stores/characters.store';
import { CharactersQuery } from '../../shared/queries/characters.query';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private baseUrl = environment.base_url
  private apiKey = environment.api_key

  private characterState$ = this.charactersQuery.charactersState$

  constructor(
    private http: HttpClient,
    private charactersStore: CharactersStore,
    private charactersQuery: CharactersQuery
  ) { }

  getCharacters(limit = 100, offset = 0): Observable<Character[]> {
    return this.http.get<CharactersResponse>(
      `${this.baseUrl}/v1/public/characters?limit=${limit}&offset=${offset}&apikey=${this.apiKey}`)
      .pipe(
        pluck('data', 'results'),
        tap(characters => this.updateCharactersState(characters)),
        switchMap(() => this.characterState$)
      );
  }

  updateCharactersState(characters: Character[]) {
    this.charactersStore.setCharacters(characters);
  }

  get charactersValue() {
    return this.charactersQuery.getValue().characters;
  }

  updateSelectedCharacter(character: Character) {
    const { updatedCharactersList } = this.getUpdatedCharactersList(character);
    this.updateCharactersState(updatedCharactersList);
  }

  deleteSelectedCharacter(character: Character) {
    const { updatedCharactersList, characterIndex } = this.getUpdatedCharactersList(character);
    updatedCharactersList.splice(characterIndex, 1)
    this.updateCharactersState(updatedCharactersList);
  }

  private getUpdatedCharactersList(character: Character) {
    let updatedCharactersList = [...this.charactersValue];

    const characterIndex = this.charactersValue.findIndex(c => c.id === character.id);
    updatedCharactersList[characterIndex] = character;
    return { updatedCharactersList, characterIndex };
  }
}
