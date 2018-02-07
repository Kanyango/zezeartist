import { Component , OnInit} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'release-component',
  templateUrl: 'release.html'
})
export class ReleaseComponent {

  releases: Array<any> = [];

  constructor(private http: Http){}
  public releaseUrl = 'http://127.0.0.1:8100/release/';
  ngOnInit(): Promise<any>
  {
    return this.http.get(this.releaseUrl)
                .toPromise()
                .then(res => { this.releases = res.json(); console.log(this.releases)})
                .catch(this.handleError);
  }


  private handleError(error: any): Promise<any>
   {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }

}
