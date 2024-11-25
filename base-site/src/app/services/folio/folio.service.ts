import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FolioBody } from "../../models/folio.model";
import { Observable, of } from "rxjs";
import { priceValidator } from "../../validators/price-validator";

@Injectable({
  providedIn: 'root'
})
export class FolioService {

  mockData: FolioBody = {
    "name": "temp",
    "folioData": [
      {
        "folioNumber": 0,
        "name": 'name one',
        "itemDetails": [
          {
            "itemName": "dfggs",
            "itemFee": 456
          },
          {
            "itemName": "dfgs dgrre",
            "itemFee": 6262
          },
          {
            "itemName": "w4treg fgtu ht6whsr",
            "itemFee": 2377
          }
        ]
      },
      {
        "folioNumber": 1,
        "name": 'name two',
        "itemDetails": [
          {
            "itemName": "dhbxtg",
            "itemFee": 345
          },
          {
            "itemName": "ghfh",
            "itemFee": 1
          }
        ]
      },
      {
        "folioNumber": 2,
        "name": 'name three',
        "itemDetails": [
          {
            "itemName": " argaeg",
            "itemFee": 63634
          },
          {
            "itemName": "a eg",
            "itemFee": 345
          },
          {
            "itemName": "er gaerg",
            "itemFee": 3653
          },
          {
            "itemName": "rga er",
            "itemFee": 452
          },
          {
            "itemName": "aergae",
            "itemFee": 346
          },
          {
            "itemName": "r aer",
            "itemFee": 8456
          },
          {
            "itemName": "gaerger ge",
            "itemFee": 1234
          }
        ]
      }
    ]
  };

  constructor(private fb: FormBuilder) { }

  submitFolioData(folioForm: FormGroup): void {
    if (folioForm.valid) {
      const bodyData: FolioBody = {
        name: 'temp',
        folioData: []
      }

      for(let i = 0; i < folioForm.value.folioForm.length; i++) {
        bodyData.folioData.push({
          folioNumber: i,
          name: folioForm.value.folioForm[i].name,
          itemDetails: folioForm.value.folioForm[i].itemDetails,
        })
      }

      // TODO - remove
      console.log(bodyData);
    }
  }

  getFolioData(): FormGroup {
    const folioData = this.fb.group({
      folioForm: this.fb.array([])
    });

    this.fetchFolioData().subscribe({
      next: (data) => {
        for(let i = 0; i < data.folioData.length; i++) {
          this.toFormArray(folioData.get("folioForm")).push(this.fb.group({
            name: [data.folioData[i].name, Validators.required],
            itemDetails: this.fb.array(data.folioData[i].itemDetails.map(item => {
              return this.fb.group({
                itemName: [item.itemName, Validators.required],
                itemFee: [item.itemFee, [Validators.required, priceValidator]]
              })
            }))
          }));
        }
      }, error: (error) => {

      },
      complete: () => {
        // TODO look into
        // "Complete" is new to me so not sure what I should do here yet
      }
    });

    console.log(folioData);
    return folioData;
  }

  private toFormArray(form: any): FormArray {
    return form as FormArray;
  }

  private fetchFolioData(): Observable<FolioBody> {
    return of(this.mockData);
  }
}
