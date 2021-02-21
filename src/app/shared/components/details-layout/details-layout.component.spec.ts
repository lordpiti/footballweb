import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsLayoutComponent } from './details-layout.component';
import {
  DetailsMenuData,
  DetailsMenuItem,
} from './../../interfaces/details-menu-data.interface';

describe('DetailsLayoutComponent', () => {
  let component: DetailsLayoutComponent;
  let fixture: ComponentFixture<DetailsLayoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            // [5]
            { path: '', pathMatch: 'full', component: DetailsLayoutComponent },
          ]),
        ],
        declarations: [DetailsLayoutComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: Observable.from([{ id: 1 }]),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLayoutComponent);
    component = fixture.componentInstance;

    component.detailsMenuData = {
      itemsList: [{ link: '', title: '' } as DetailsMenuItem],
      imageUrl: '',
      title: '',
      dataLoaded: true,
      entityName: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
