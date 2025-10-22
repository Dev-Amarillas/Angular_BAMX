import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  //router-outlet

@Component({
  selector: 'app-root',
  standalone: true,      // debe ser standalone
  imports: [RouterModule], // necesario para <router-outlet> y routerLink
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'BAMX';
}
