import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }
  backToHome() {
    this.router.navigate(['/']);
  }
}
