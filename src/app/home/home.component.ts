import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categories:string[] = [ "science",
  "history",
  "romance",
  "adventure",
  "biography" ];

  public category:string = "";

  public itemCount:number = 0;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.category = this.categories[0];
  }

  public setCategory(event:any) {
    // console.log(event.target.value);

    this.category = event.target.value;
  }

  public isSelected(index:number):boolean {
    // return this.category ? (index === 0) : (this.categories[index] === this.category);
    // console.log("CATEGORY: " + this.category);
    return this.categories[index] === this.category;
  }

  public setItemsFound(event:number):void {

    this.itemCount = event;

    // this.cdr.detectChanges();

    console.log("ITEM COUNT: " + this.itemCount);
  }
}
