import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Feat } from './feat';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'new-release-component',
  templateUrl: 'new_release.html'
})
export class NewReleaseComponent {

  releaseForm: FormGroup;
  modeOne = 'date';
  //today = 'today';
  //firstDayOfWeek = 'firstDayOfWeek';
  mode = 'year';
  release: any = {};
  public releaseUrl = 'http://127.0.0.1:8100/release/';

  constructor(private fb: FormBuilder,private http: Http)
            {
                this.createForm();
            }

    createForm()
    {
        this.releaseForm = this.fb.group(
        {
            title: ['', Validators.required],
            subtitle: ['', Validators.required],
            pry_artist: ['', Validators.required],
            genre: ['', Validators.required],
            subgenre: ['', Validators.required],
            label: ['', Validators.required],
            format: ['', Validators.required],
            release_date: ['', Validators.required],
            c_line: ['', Validators.required],
            p_line: ['', Validators.required],
            upc: ['', Validators.required],
            catalogue_no: ['', Validators.required],
            production_yr: ['', Validators.required],
            featuring: this.fb.array([])
        })
    }

    get featuring(): FormArray {
      return this.releaseForm.get('featuring') as FormArray;
    };

    addFeat() {
      this.featuring.push(this.fb.group(new Feat()));
    }
    remove(i)
    {
      let featuring = <FormArray>this.releaseForm.get('featuring');
      featuring.removeAt(i);
    }
    // onSubmit()
    // {
    //   console.log(this.releaseForm.value);
    //
    // }
    onSubmit(): Promise<any>
    {
      return this.http.post(this.releaseUrl,this.releaseForm.value)
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
