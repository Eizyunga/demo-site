import { Component, OnDestroy, OnInit } from '@angular/core';
import { Folio, FolioState } from "../../../../models/folio.model";
import { FolioService } from "../../../../services/folio/folio.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-folio-page',
  templateUrl: './folio-page.component.html',
  styleUrls: ['./folio-page.component.scss']
})
export class FolioPageComponent implements OnInit, OnDestroy  {

  fData: Folio[] = [];
  isLoading: boolean = false;
  viewState: string = '';
  private subscription: Subscription;

  constructor(private folioService: FolioService) {
    this.subscription = this.folioService.isLoading.subscribe(value => {
      this.isLoading = value;
      if (!this.isLoading) {
        this.fData = this.folioService.getFolioData();
        this.processFolioData();
      }
    })
  }

  ngOnInit() {
    this.folioService.getFolioFormData();
  }

  processFolioData(): void {
    if (!!this.fData && this.fData.length > 0) {
      this.viewState = FolioState.CREATE;
    } else {
      this.viewState = FolioState.VIEW;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected readonly FolioState = FolioState;
}
