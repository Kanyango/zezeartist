import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Feat } from './feat';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'new-release-component',
  templateUrl: 'new_release.html'
})
export class NewReleaseComponent {

  releaseForm: FormGroup;
  modeOne = 'date';
  this_today = 'today';
  this_firstDayOfWeek = 'firstDayOfWeek';
  mode = 'year';
  release: any = {};
  public releaseUrl = 'https://zezeserver.herokuapp.com/release/';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private fb: FormBuilder,private http: Http, private router: Router)
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
            featuring: this.fb.array([this.initVariations()])
        })
    }
    
     initVariations()
      {
          return this.fb.group({ feat : ['', Validators.required] })
      }
    
    get featuring(): FormArray {
          return this.releaseForm.get('featuring') as FormArray;
        };

      addFeat() 
      {
          const control = <FormArray>this.releaseForm.controls['featuring'];
          control.push(this.initVariations());
      }
      remove(i)
      {
         const control = <FormArray>this.releaseForm.controls['featuring'];
         control.removeAt(i);
      }
    // onSubmit()
    // {
    //   console.log(this.releaseForm.value);
    //
    // }
    onSubmit()
    {
        //event.preventDefault();
      
        console.log(this.releaseForm.value);
      
        this.http.post(this.releaseUrl, this.releaseForm.value, {headers: this.headers})
                  .toPromise()
                  .then(res => {  
                            this.release = res.json();
                            this.router.navigate(['/release']);
                            console.log(this.release);
                    })
                  .catch(this.handleError);
    }
    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }


}
