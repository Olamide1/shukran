import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrlDialogComponent } from '../url-dialog/url-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) { }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void { }

  seeURL(): void {
    const dialogRef = this.dialog.open(UrlDialogComponent, {
      width: '250px',
      data: { url: 'https://shukran.africa/hi' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The url dialog was closed', result);
    });
  }
}
