import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Character } from '../interfaces/characters';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent {

  public isShowingRenameForm = false;

  @ViewChild('input') input!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public character: Character,
    private dialog: MatDialog,
    private characterService: CharactersService
  ) { }

  toggleRenamingForm() {
    this.isShowingRenameForm = !this.isShowingRenameForm
  }

  save(character: Character) {
    character.name = this.input.nativeElement.value || character.name;
    this.characterService.updateSelectedCharacter(character)
    this.toggleRenamingForm();
  }

  delete(character: Character) {
    this.characterService.deleteSelectedCharacter(character);
    this.dialog.closeAll();
  }

}
