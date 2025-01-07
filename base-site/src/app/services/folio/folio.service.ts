import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Folio, FolioBody, FolioItem } from "../../models/folio.model";
import { Observable, Subject, throwError } from "rxjs";
import { priceValidator } from "../../validators/price.validator";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class FolioService extends CommonService {

  folioData$: Subject<Folio[]> = new Subject<Folio[]>();
  folioForm$: Subject<FormGroup> = new Subject<FormGroup>();
  private folioData: Folio[] = [];
  private apiUrl: string = 'http://localhost:3000/api/v1/folio';
  private folioFormData: FormGroup = this.fb.group({
    folioForm: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {
    super();
  }

  submitFolioData(folioForm: FormGroup): Observable<any> {
    if (folioForm.valid) {
      this.setLoading(true);
      const bodyData: FolioBody = {
        name: '',
        folioData: []
      }

      for(let i: number = 0; i < folioForm.value.folioForm.length; i++) {
        bodyData.folioData.push({
          folioNumber: i,
          name: folioForm.value.folioForm[i].name,
          itemDetails: folioForm.value.folioForm[i].itemDetails.map((details: FolioItem) => {
            return {
              itemName: details.itemName,
              itemFee: Number(details.itemFee),
            }
          }),
        })
      }
      let result: Observable<any> = new Observable<any>();
      this.sendFolioData(bodyData).subscribe({
        next: (res: FolioBody) => {
          this.updateFormData(res);
        },
        error: (error) => {
          result = error;
        },
        complete: () => {
        }
      });
      this.setLoading(false);
      return result;
    } else {
      return throwError(() => new Error('Invalid request'));
    }
  }

  pingFolioFormData(): void {
    this.folioForm$.next(this.folioFormData);
  }

  private get folioForm(): FormArray {
    return this.folioFormData.get("folioForm") as FormArray
  }

  private updateFormData(data: FolioBody) {
    if (!!data && !!data.folioData) {
      this.setFolioData(data);

      // Clear and set the form data
      this.folioForm.clear();
      for(let i: number = 0; i < data.folioData.length; i++) {
        this.folioForm.push(this.fb.group({
          name: [data.folioData[i].name, Validators.required],
          itemDetails: this.fb.array(data.folioData[i].itemDetails.map((item: FolioItem) => {
            return this.fb.group({
              itemName: [item.itemName, Validators.required],
              itemFee: [item.itemFee, [Validators.required, priceValidator]]
            });
          }))
        }));
      }
      this.pingFolioFormData();
    }
  }

  getData(): void {
    this.isLoading$.next(true);
    this.fetchFolioData().subscribe({
      next: (data: FolioBody): void => {
        this.updateFormData(data);
      }, error: (error): void => {
        this.redirectToLoginPage();
      },
      complete: (): void => {
        this.setLoading(false);
      }
    });
  }

  private setFolioData(data: FolioBody): void {
    this.folioData = data.folioData;
    this.folioData$.next(data.folioData);
  }

  private fetchFolioData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/folios`);
  }

  private sendFolioData(data: FolioBody): Observable<any> {
    const method = this.folioData.length > 0 ? 'put' : 'post';
    const api = this.folioData.length > 0 ? 'update' : 'create';
    return this.http[method](`${this.apiUrl}/${api}`, data);
  }
}
