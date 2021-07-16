import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatResponseComponent } from './chat-response.component';

describe('ChatResponseComponent', () => {
  let component: ChatResponseComponent;
  let fixture: ComponentFixture<ChatResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
