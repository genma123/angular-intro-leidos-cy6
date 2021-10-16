import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Document } from '../model/document';
import { Work } from '../model/work';


@Injectable()
export class OpenLibraryService {

  private readonly OPEN_LIBRARY_URL:string = "https://openlibrary.org";

  private subjects:Document[] = [];

  private books:Work[] = [];

  private works$:BehaviorSubject<Work[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {

  }

  public searchSubjects(category:string):void {
    this.http.get(this.OPEN_LIBRARY_URL + `/search/subjects.json?q=${category}`).subscribe(
      data => {
        const docs:Document[] = data["docs"];
        // console.log(JSON.stringify(docs, null, 4));
        this.subjects = data["docs"];
      }
    );
  }

  public getBooks(key: string) {
    this.http.get(this.OPEN_LIBRARY_URL + `${key}.json?limit=50`).subscribe(
      data => {
        const works:Work[] = data['works']
        // console.log(JSON.stringify(works, null, 4));
        this.works$.next(works);
        this.books = works;
      }
    );
  }

  public getWorks():Observable<Work[]> {
    return this.works$.asObservable();
  }

  public retrieveSubjects():Document[] {
    return this.subjects;
  }

  public retrieveBooks():Work[] {
    return this.books;
  }
}
