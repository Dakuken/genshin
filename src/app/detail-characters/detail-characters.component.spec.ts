import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCharactersComponent } from './detail-characters.component';

describe('DetailCharactersComponent', () => {
  let component: DetailCharactersComponent;
  let fixture: ComponentFixture<DetailCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCharactersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
