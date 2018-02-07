import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Feat } from '../release/feat';
import "rxjs/add/operator/map";

@Component({
  selector: 'edit-component',
  templateUrl: 'edit.html'
})
export class EditReleaseComponent implements OnInit
{
  releasEditForm: FormGroup;
  id: string;
  release: any = {};
  rtnd: any = '';

  public assetsUrl = 'http://127.0.0.1:8100/asset/';
  public releaseUrl = 'http://127.0.0.1:8100/release/';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private http: Http){}

              ngOnInit()
              {
                this.route.params.subscribe(params => {
                   this.id = params['id']; // (+) converts string 'id' to a number
                });

                this.getRelease(this.id)
                .then(( msg: string) =>
                {
                  this.rtnd = msg
                  console.log(this.rtnd);
                  this.createForm(this.rtnd);
                })

              }
              createForm(rtnd: any)
              {
                 console.log(rtnd);

                  this.releasEditForm = this.fb.group(
                  {
                      title: [rtnd.title, Validators.required],
                      subtitle: [rtnd.subtitle, Validators.required],
                      pry_artist: [rtnd.pry_artist, Validators.required],
                      genre: [rtnd.genre, Validators.required],
                      subgenre: [rtnd.subgenre, Validators.required],
                      label: [rtnd.label, Validators.required],
                      format: [rtnd.format, Validators.required],
                      release_date: [rtnd.release_date, Validators.required],
                      c_line: [rtnd.c_line, Validators.required],
                      p_line: [rtnd.p_line, Validators.required],
                      upc: [rtnd.upc, Validators.required],
                      catalogue_no: [rtnd.catalogue_no, Validators.required],
                      production_yr: [rtnd.production_yr, Validators.required]
                      //featuring: this.fb.array([])
                  })
              }
              getRelease(id: string): Promise<any>
              {
                const URL = `${this.releaseUrl}${id}`;
                 return this.http.get(URL)
                                .toPromise()
                                .then(res => {
                                  this.release = res.json();
                                  console.log(this.release)
                                  return this.release;
                                })

                                .catch(this.handleError);

              }

              private handleError(error: any): Promise<any>
               {
              console.error('An error occurred', error); // for demo purposes only
              return Promise.reject(error.message || error);
              }

              onSubmit(): Promise<any>
              {
                this.releasEditForm.value.artwork = this.release.artwork;
                this.releasEditForm.value.featuring = this.release.featuring;
                this.releasEditForm.value.tracks = this.release.tracks;
                
                const URL = `${this.releaseUrl}${this.release._id}`;
                return this.http.put(URL,this.releasEditForm.value)
                            .toPromise()
                            .then(res => {
                              this.release = res.json();
                              console.log(this.release)})
                            .catch(this.handleError);
              }

}
