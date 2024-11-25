import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolioCreateFormComponent } from './folio-create-form.component';

describe('FolioCreateFormComponent', () => {
  let component: FolioCreateFormComponent;
  let fixture: ComponentFixture<FolioCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolioCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolioCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
