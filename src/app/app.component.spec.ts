import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TABLES } from '../app/mock-tables';
import 'jest-extended';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'crowdstreet-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('crowdstreet-app');
  });

  it('should have table width text', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container span').textContent).toEqual('20%');
  });

  it('should have configure button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container button').textContent).toEqual('Configure');
  });

  describe('Table Name', () => {
    const expected = ['Table:', 'RED'];
    it('should have table name', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('div.container.display_inline p').textContent.split(' ')).toEqual(expected);
    });
  });

  test('records have all properties', () => {
    const records = TABLES;
    let numAsserts = 1;
    records.forEach(record => {
      expect(record).toHaveProperty('name');
      expect.assertions(numAsserts++);  // true
      expect(record).toHaveProperty('start');
      expect.assertions(numAsserts++);  // true
      expect(record).toHaveProperty('increment');
      expect.assertions(numAsserts++);  // true
      expect(record).toHaveProperty('width');
      expect.assertions(numAsserts++);  // true
      expect(record).toHaveProperty('selectedDir');
      expect.assertions(numAsserts++);  // true
      expect(record).toHaveProperty('directions');
      expect.assertions(numAsserts++);  // true
      expect(record).toHaveProperty('data');
      expect.assertions(numAsserts++);  // true
    });
  })


  describe('Submit with default values', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    const table = TABLES[0];

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      component.submit(table.start, table.increment, table.max, table.width, table.selectedDir, table.name);
    })

    it('should create table with two rows and five columns with all zeroes', () => {
      expect(component.currTable.data)
        .toEqual([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    });

    it('should have a width of 20%', () => {
      expect(component.currTable.width)
        .toBe(20);
    });
  });

  describe('Submit with updated values', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    const table = TABLES[0];

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      component.submit(3, 2, 18, 40, table.selectedDir, table.name);
    })

    it('should create table with start of 3, incremenent of 2, and max of 18', () => {
      expect(component.currTable.data)
        .toEqual([undefined, [13, 15, 17, undefined, undefined], [3, 5, 7, 9, 11]]);
    });

    it('should have a width of 40%', () => {
      expect(component.currTable.width)
        .toBe(40);
    });
  });

});
