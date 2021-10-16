import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { OpenLibraryService  } from '../services/open-library.service';

import { Document } from '../model/document';
import { Work } from '../model/work';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ OpenLibraryService ]
})
export class SearchComponent implements OnInit, OnChanges {

  @Input()
  public category:string = "science";

  @Output() itemsFound:EventEmitter<number> = new EventEmitter<number>();

  public subjects:Document[] = [];

  public key:string = "";

  constructor(
    private openLibraryService: OpenLibraryService
  ) { }

  ngOnInit() {
    this.openLibraryService.searchSubjects(this.category);

    this.openLibraryService.getWorks().subscribe(
      data => {
        // console.log("DATA count: " + data.length);
        this.itemsFound.emit(data.length);
      }
    );
  }

  ngOnChanges() {
    this.openLibraryService.searchSubjects(this.category);
  }

  public getSubjects():Document[] {
    this.subjects = this.openLibraryService.retrieveSubjects();
    return this.subjects;
  }

  public getBooks() {
    this.openLibraryService.getBooks(this.key);
  }

  public getWorks():Work[] {
    const works:Work[] = this.openLibraryService.retrieveBooks();
    // this.itemsFound.emit(works.length);
    return works;
  }

  public setKey(event:any) {
    // console.log(event.target.value);

    this.key = event.target.value;
    // this.getBooks();
  }
  
  public isSelected(index:number) {
    return this.subjects[index].key === this.key;
  }

}
