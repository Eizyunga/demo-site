import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Folio } from "../../../../models/folio.model";

@Component({
  selector: 'app-folio',
  templateUrl: './folio.component.html',
  styleUrls: ['./folio.component.scss']
})

export class FolioComponent implements OnInit {

  @Input() number: number = 1;
  @Input() folioName: string = '';
  @Input() partnerLength: number = 0;
  @Input() content: Folio = {
    folioNumber: -1,
    name: '',
    itemDetails: []
  };
  @Output() emitToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  isFocused: boolean = false;
  isExpanded: boolean = false;
  focusEnding: string = '';

  ngOnInit(): void {
    if (!!this.content && this.content.itemDetails.length > 0 && this.content.itemDetails.length < this.partnerLength) {
      this.addBlankRows(this.partnerLength);
    }
  }

  addBlankRows(rows: number) {
    for (let i: number = this.content.itemDetails.length; i < rows; i++) {
      this.content.itemDetails.push({
        itemName: '',
        itemFee: ''
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
