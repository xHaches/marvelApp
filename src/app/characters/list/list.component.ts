import { Component, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Character } from '../interfaces/characters';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SelectedComponent } from '../selected/selected.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  columns: string[] = ['id', 'name', 'series', 'thumbnail'];
  charactersList!: MatTableDataSource<Character>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private charactersService: CharactersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.charactersService.getCharacters().subscribe((characters: Character[]) => {
      this.charactersList = new MatTableDataSource(characters);
      this.charactersList.paginator = this.paginator;
    });
  }

  getCharacter(row: Character) {
    this.dialog.open(SelectedComponent, {
      data: row
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.charactersList.filter = filterValue.trim().toLowerCase();

    if (this.charactersList.paginator) {
      this.charactersList.paginator.firstPage();
    }
  }
}
