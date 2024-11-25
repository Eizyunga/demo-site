import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolioPageComponent } from './folio-page.component';

describe('FolioPageComponent', () => {
  let component: FolioPageComponent;
  let fixture: ComponentFixture<FolioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolioPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
