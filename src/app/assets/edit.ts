import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Feat } from '../release/feat';
import "rxjs/add/operator/map";

@Component({
  selector: 'edit-assets-component',
  templateUrl: 'edit.html'
})
export class EditAssetsComponent implements OnInit {

  id: string = '';
  asset: any = {};
  rtnd: any = '';
  assetEditForm: FormGroup;
  modeOne = 'date';
  mode = 'year';
  tracks = [];
  release: any = {};

  public assetsUrl = 'http://127.0.0.1:8100/asset/edit/';
  public releaseUrl = 'http://127.0.0.1:8100/release/';

  constructor(private fb: FormBuilder,
              private http: Http,
              private route: ActivatedRoute){}

            ngOnInit()
            {
              this.route.params.subscribe(params => {
                   this.id = params['id']; // (+) converts string 'id' to a number

              });
              console.log(this.id);
             this.getAsset(this.id)
             .then((msg: any) =>
             {
               this.rtnd = msg;
               this.createForm(this.rtnd);
               this.getTracks(this.rtnd);
             })

            }

            getTracks(rtnd: any)
            {
                console.log('Iam the id',this.asset.owner);

                const relUrl =  `${this.releaseUrl}${rtnd.owner}`;

               this.http.get(relUrl)
                          .toPromise()
                          .then(res => {
                            this.release = res.json();
                            console.log(this.release);
                          })
                          .catch(this.handleError);
            }

            getAsset(id: string): Promise<any>
            {
              const URL = `${this.assetsUrl}${id}`;
              console.log('Iam the id',this.id);
               return this.http.get(URL)
                          .toPromise()
                          .then(res => {
                            this.asset = res.json();
                            return this.asset;
                          })
                          .catch(this.handleError);
            }
            createForm(rtnd: any)
            {
                console.log('iam rtnd',rtnd);

                this.assetEditForm = this.fb.group(
                {
                    title: [rtnd.title, Validators.required],
                    subtitle: [rtnd.subtitle, Validators.required],
                    pry_artist: [rtnd.pry_artist, Validators.required],
                    genre: [rtnd.genre, Validators.required],
                    subgenre: [rtnd.subgenre, Validators.required],
                    label: [rtnd.label, Validators.required],
                    author: [rtnd.author, Validators.required],
                    remixer: [rtnd.remixer, Validators.required],
                    isrc: [rtnd.isrc, Validators.required],
                    composer: [rtnd.composer, Validators.required],
                    format: [rtnd.format, Validators.required],
                    release_date: [rtnd.release_date, Validators.required],
                    c_line: [rtnd.c_line, Validators.required],
                    p_line: [rtnd.p_line, Validators.required],
                    upc: [rtnd.upc, Validators.required],
                    p_tier: [rtnd.p_tier, Validators.required],
                    p_advisory: [rtnd.p_advisory, Validators.required],
                    track: [rtnd.track, Validators.required],
                    track_lang: [rtnd.track_lang, Validators.required],
                    lyrics_lang: [rtnd.lyrics_lang, Validators.required],
                    track_lyrics: [rtnd.track_lyrics, Validators.required],
                    catalogue_no: [rtnd.catalogue_no, Validators.required],
                    production_yr: [rtnd.production_yr, Validators.required],

                })
            }


            onSubmit(): Promise<any>
            {
              this.assetEditForm.value.owner = this.asset.owner;
              this.assetEditForm.value.featuring = this.asset.featuring;
              const editUrl = 'http://127.0.0.1:8100/asset/';
              const URL = `${editUrl}${this.id}`;
              return this.http.put(URL,this.assetEditForm.value)
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
