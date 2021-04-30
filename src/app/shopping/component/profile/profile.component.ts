import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  orders: any;
  appUser$: any;
  private destroy$ = new Subject();
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.appUser$.pipe(takeUntil(this.destroy$))
    .subscribe(user => { this.appUser$ = user; console.log(user)} );
  }

}
