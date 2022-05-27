import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from '@angular/core';
import { Character } from '../../characters/interfaces/characters';

export interface CharactersState {
    characters: Character[];
}

export function createInitialState(): any {
    return { characters: [] }
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'value' })
export class CharactersStore extends Store<CharactersState> {
    constructor() {
        super(createInitialState());
    }

    setCharacters(characters: Character[]) {
        this.update({ characters });
    }
}