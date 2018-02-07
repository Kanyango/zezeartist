import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Feat } from '../release/feat';
import "rxjs/add/operator/map";

@Component({
  selector: 'assets-component',
  templateUrl: 'assets.html'
})
export class AssetsComponent implements OnInit {
  id: string = '';
  assetForm: FormGroup;
  modeOne = 'date';
  today = 'today';
  firstDayOfWeek = 'firstDayOfWeek';
  mode = 'year';
  tracks = [];
  release: any = {};
  public assetsUrl = 'http://127.0.0.1:8100/asset/';
  public releaseUrl = 'http://127.0.0.1:8100/release/';
  constructor(private fb: FormBuilder,
              private http: Http,
              private route: ActivatedRoute){}

            ngOnInit()
            {
              this.route.params.subscribe(params => {
                 this.id = params['id']; // (+) converts string 'id' to a number
              });
              this.getTracks()
              this.createForm();
            }

            getTracks()
            {
              console.log('Iam the id',this.id);

              const relUrl =  `${this.releaseUrl}${this.id}`;

               this.http.get(relUrl)
                          .toPromise()
                          .then(res => {
                            this.release = res.json();
                          })
                          .catch(this.handleError);
            }
            createForm()
            {
                this.assetForm = this.fb.group(
                {
                    title: ['', Validators.required],
                    subtitle: ['', Validators.required],
                    pry_artist: ['', Validators.required],
                    genre: ['', Validators.required],
                    subgenre: ['', Validators.required],
                    label: ['', Validators.required],
                    author: ['', Validators.required],
                    remixer: ['', Validators.required],
                    isrc: ['', Validators.required],
                    composer: ['', Validators.required],
                    format: ['', Validators.required],
                    release_date: ['', Validators.required],
                    c_line: ['', Validators.required],
                    p_line: ['', Validators.required],
                    upc: ['', Validators.required],
                    p_tier: ['', Validators.required],
                    p_advisory: ['', Validators.required],
                    track: ['', Validators.required],
                    track_lang: ['', Validators.required],
                    lyrics_lang: ['', Validators.required],
                    track_lyrics: ['', Validators.required],
                    catalogue_no: ['', Validators.required],
                    production_yr: ['', Validators.required],
                    featuring: this.fb.array([])
                })
            }
            get featuring(): FormArray {
              return this.assetForm.get('featuring') as FormArray;
            };

            addFeat() {
              this.featuring.push(this.fb.group(new Feat()));
            }
            remove(i)
            {
              let featuring = <FormArray>this.assetForm.get('featuring');
              featuring.removeAt(i);
            }

            onSubmit(): Promise<any>
            {
              this.assetForm.value.owner = this.id;
              return this.http.post(this.assetsUrl,this.assetForm.value)
                          .toPromise()
                          .then(res => { this.release = res.json(); console.log(this.release)})
                          .catch(this.handleError);
            }
            private handleError(error: any): Promise<any>
             {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
            }
}
