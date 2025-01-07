import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { priceValidator } from "../../../../validators/price.validator";

@Component({
  selector: 'app-folio-create-form',
  templateUrl: './folio-create-form.component.html',
  styleUrls: ['./folio-create-form.component.scss']
})
export class FolioCreateFormComponent implements OnInit {

  @Input() formNumber: number = -1;
  @Input() folioForm: FormGroup;
  @Output() emitGroupRemoval: EventEmitter<number> = new EventEmitter<number>()

  constructor(private fb:FormBuilder) {
    this.folioForm = this.fb.group({
      folioNumber: this.formNumber,
      name: ['', Validators.required],
      itemDetails: this.fb.array([]),
    });
  }

  get itemDetails() : FormArray {
    return this.folioForm.get("itemDetails") as FormArray
  }

  newItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      itemFee: [0, [Validators.required, priceValidator]],
    })
  }

  addItem() {
    if (this.getFormLength() < 10) {
      this.itemDetails.push(this.newItem());
    }
  }

  removeItem(i: number) {
    if (!!this.itemDetails.at(i) && this.itemDetails.length > 1) {
      this.itemDetails.removeAt(i);
    } else {
      this.removeThisGroup();
    }
  }

  getFormLength = (): number => this.itemDetails.length;

  private removeThisGroup(): void {
    this.emitGroupRemoval.next(this.formNumber);
  }

  ngOnInit(): void {
    if (this.getFormLength() === 0) {
      this.addItem();
    }
  }
}
