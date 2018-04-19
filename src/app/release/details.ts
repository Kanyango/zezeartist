import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';
import "rxjs/add/operator/do";

import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'details-component',
  templateUrl: 'details.html'
})
export class DetailsComponent implements OnInit {

  id: string = '';
  release: any = {};
  assets: Array<any> = [];
  closer: false;
  opener: true;
  public artworkUrl = 'https://zezeserver.herokuapp.com/artwork/';
  public assetsUrl =  'https://zezeserver.herokuapp.com/asset/';
  public releastatusUrl = 'https://zezeserver.herokuapp.com/releastatus/';
  public releaseUrl = 'https://zezeserver.herokuapp.com/release/';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private el: ElementRef){}

  ngOnInit()
  {
    this.route.params.subscribe(params => {
       this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.getRelease(this.id);
    this.getAssets(this.id);

  }
  getAssets(id: string)
  {
    const URL = `${this.assetsUrl}${id}`
    return this.http.get(URL)
                    .toPromise()
                    .then(res => { this.assets = res.json(); console.log(this.assets)})
                    .catch(this.handleError);
  }
  ready()
  {
   
    let ready = {status: 'pending'}
    const URL = `${this.releastatusUrl}${this.id}`;
    return this.http.put(URL, ready, {headers: this.headers})
                    .toPromise()
                    .then(res => { this.release = res.json(); console.log(this.release)})
                    .catch(this.handleError);
  }
  getRelease(id: string)
  {
    const URL = `${this.releaseUrl}${id}`
    return this.http.get(URL)
                    .toPromise()
                    .then(res => { this.release = res.json(); console.log(this.release)})
                    .catch(this.handleError);
  }

  upload_assets() {
        const URL = `${this.assetsUrl}${this.id}`;
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#asset');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('asset', inputEl.files.item(0));
            //call the angular http method

            this.http.put(URL, formData)
                .map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                         alert(success._body);
                },
                (error) => alert(error))
          }
       }

  upload() {
        const URL = `${this.artworkUrl}${this.id}`;
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#artwork');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('photo', inputEl.files.item(0));
            //call the angular http method

            this.http.put(URL, formData)
                .map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                         alert(success._body);
                },
                (error) => alert(error))
          }
       }

  private handleError(error: any): Promise<any>
   {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }
}
