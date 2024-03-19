import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Loading } from './Loading';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit
{
  isLoading = false;

  constructor(private changeDEtectorRef: ChangeDetectorRef)
  {
  }

  ngOnInit()
  {
    Loading.onChange.subscribe(isLoading =>
    {
      this.isLoading = isLoading;
      this.changeDEtectorRef.detectChanges();
    });
  }
}
