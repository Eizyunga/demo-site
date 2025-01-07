import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Folio, FolioState } from "../../../../models/folio.model";
import { FolioService } from "../../../../services/folio/folio.service";
import { Subscription } from "rxjs";
import { AuthService } from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-folio-page',
  templateUrl: './folio-page.component.html',
  styleUrls: ['./folio-page.component.scss']
})
export class FolioPageComponent implements OnInit, OnDestroy, AfterViewInit {

  fData: Folio[] = [];
  isLoading: boolean = true;
  viewState: string = '';
  private subscriptions: Subscription[] = [];

  constructor(private folioService: FolioService,
              private cdr: ChangeDetectorRef,
              private authService: AuthService) {
    this.subscriptions.push(this.folioService.isLoading$.subscribe((value: boolean) => {
      this.isLoading = value;
    }));
    this.subscriptions.push(this.folioService.folioData$.subscribe((data: Folio[]): void => {
      this.processFolioData(data);
    }));
  }

  ngOnInit() {
    this.folioService.getData();
  }

  // To avoid error with values changing after they were checked.
  ngAfterViewInit(): void {
  //  this.cdr.detectChanges();
  }

  processFolioData(data: Folio[]): void {
    if (!!data && data.length > 0) {
      this.fData = data;
      this.viewState = FolioState.VIEW;
    } else {
      this.viewState = FolioState.CREATE;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected readonly FolioState = FolioState;

  logout(): void {
    this.authService.logout();
  }

  switchToViewMode(): void {
    this.viewState = FolioState.VIEW;
  }
}
