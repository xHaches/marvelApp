import { Query } from '@datorama/akita';
import { CharactersState, CharactersStore } from '../stores/characters.store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CharactersQuery extends Query<CharactersState> {
    charactersState$ = this.select('characters');

    constructor(protected override store: CharactersStore) {
        super(store);
    }
}