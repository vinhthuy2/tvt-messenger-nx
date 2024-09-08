import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { FriendsListComponent } from './friends-list.component';

describe('FriendsListComponent', () => {
  let component: FriendsListComponent;
  let fixture: ComponentFixture<FriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsListComponent, StoreModule.forRoot({}, {})],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
