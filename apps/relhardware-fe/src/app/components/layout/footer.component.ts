import { Component } from '@angular/core';
import {LayoutService} from '../../service/layout.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
    constructor(public layoutService: LayoutService) { }
}
