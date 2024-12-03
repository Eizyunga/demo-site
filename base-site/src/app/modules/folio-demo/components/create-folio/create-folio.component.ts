import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FolioService } from "../../../../services/folio/folio.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-create-folio',
  templateUrl: './create-folio.component.html',
  styleUrls: ['./create-folio.component.scss']
})
export class CreateFolioComponent implements OnInit, OnDestroy {

  @Output() emitViewStateChange: EventEmitter<void> = new EventEmitter<void>();
  folioFormGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb:FormBuilder, private folioService: FolioService, public dialog: MatDialog) {
    this.folioFormGroup = this.fb.group({
      folioForm: this.fb.array([]),
    });

    this.subscriptions.push(this.folioService.folioForm$.subscribe((formData: FormGroup) => {
      this.processFormData(formData);
    }));
  }

  confirmGroupRemoval(i: number): void {
    if (this.canRemoveFolio(i)) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { groupIndex: i }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.removeFolioGroup(i);
        }
      });
    }
  }

  processFormData(formData: FormGroup): void {
    this.folioFormGroup = formData;

    if (this.folioForm.length < 0) {
      this.addFolioGroup();
    }
  }

  ngOnInit() {
    this.folioService.pingFolioFormData();
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
    if (this.canRemoveFolio(i)) {
      this.folioForm.removeAt(i);
    }
  }

  private canRemoveFolio = (i: number): boolean => !!this.folioForm.at(i) && this.folioForm.length > 1;

  onSubmit() {
    if (this.folioFormGroup.valid) {
      this.folioService.submitFolioData(this.folioFormGroup).subscribe({
        next: (res) => {
        }, error: (error) => {
        },
        complete: () => {
          this.emitViewStateChange.next();
        }
      })
    }
  }

  // TODO - make base component for this redundancy
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
