import { TreeComponent } from './tree/tree.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'million-agents-test-task';
}
