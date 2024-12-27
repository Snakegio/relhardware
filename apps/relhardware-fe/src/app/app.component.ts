import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'relhardware-fe';
  private primeng = inject(PrimeNG);

  ngOnInit(): void {
    console.log(this.primeng.theme());
  }
}
