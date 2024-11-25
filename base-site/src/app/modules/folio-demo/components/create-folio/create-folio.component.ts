import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FolioService } from "../../../../services/folio/folio.service";

@Component({
  selector: 'app-create-folio',
  templateUrl: './create-folio.component.html',
  styleUrls: ['./create-folio.component.scss']
})
export class CreateFolioComponent implements OnInit{
  folioFormGroup: FormGroup;

  constructor(private fb:FormBuilder, private folioService: FolioService) {
    this.folioFormGroup = this.fb.group({
      folioForm: this.fb.array([]),
    });
  }

  ngOnInit() {
    // this.addFolioGroup();

    this.folioFormGroup = this.folioService.getFolioData();
  }

  get folioForm(): FormArray {
    return this.folioFormGroup.get("folioForm") as FormArray
  }

  addFolioGroup(): void {
    if (this.folioForm.length < 9) {
      this.folioForm.push(this.createFolioGroup());
    }
  }

  createFolioGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      itemDetails: this.fb.array([]),
    })
  }

  removeFolioGroup(i: number): void {
    if (!!this.folioForm.at(i) && this.folioForm.length > 1) {
      this.folioForm.removeAt(i);
    }
  }

  onSubmit() {
    if (this.folioFormGroup.valid) {
      this.folioService.submitFolioData(this.folioFormGroup);
    }
  }
}
