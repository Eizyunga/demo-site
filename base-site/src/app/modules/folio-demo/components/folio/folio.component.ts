import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FolioData } from "../../models/folio-data.model";

@Component({
  selector: 'app-folio',
  templateUrl: './folio.component.html',
  styleUrls: ['./folio.component.scss']
})

export class FolioComponent implements OnInit {

  @Input() content: FolioData[] = [];
  @Input() number: number = 1;
  @Input() folioName: string = '';
  @Input() partnerLength: number = 0;
  @Output() emitToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  isFocused: boolean = false;
  isExpanded: boolean = false;
  focusEnding: string = '';

  ngOnInit(): void {
    if (!!this.content && this.content.length > 0 && this.content.length < this.partnerLength) {
      this.addBlankRows(this.partnerLength);
    }
  }

  addBlankRows(rows: number) {
    for (let i: number = this.content.length; i < rows; i++) {
      this.content.push({
        field1: '',
        field2: ''
      })
    }
  }

  toggleExpander(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleFocus(): void {
    this.isFocused = !this.isFocused;
    this.focusEnding = this.isFocused ? '-fill' : '';
  }
}
