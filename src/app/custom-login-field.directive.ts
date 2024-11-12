import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appCustomLoginField]',
  providers:[
    {
      provide: NG_VALIDATORS,
      useExisting: CustomLoginFieldDirective,
      multi: true
    }
  ],
  standalone: true
})
export class CustomLoginFieldDirective implements Validator, OnChanges{

  @Input('appCustomLoginField') criteria:{minLength: number, requireLowerCase: boolean, requireUpperCase: boolean, requireDigits: boolean, requireSpecialChar: boolean} =  
  {minLength: 8, requireLowerCase: true, requireUpperCase: true, requireDigits: true, requireSpecialChar: false};

  private onChange: ()=> void = ()=>{};

  constructor(private element: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['criteria'])
      this.onChange();
  }



  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(!value)
      return null;

    const hasMinLengthError = value.length < this.criteria.minLength;
    const hasLowerCaseError = this.criteria.requireLowerCase? !/[a-z]/.test(value):false;
    const hasUpperCaseError = this.criteria.requireLowerCase? !/[A-Z]/.test(value):false;
    const hasDigitsError = this.criteria.requireLowerCase? !/[0-9]/.test(value):false;
    const hasSpecialCharError = this.criteria.requireLowerCase? !/[$#%@]/.test(value):false;

    let errors: string[]=[];
    if(hasMinLengthError)
      errors.push("Min of "+ this.criteria.minLength+" length is required");
    if(hasLowerCaseError)
      errors.push("Atleast one Lowercase letter is required");
    if(hasUpperCaseError)
      errors.push("Atleast one Uppercase letter is required");
    if(hasDigitsError)
      errors.push("Atleast one number [0-9] is required");
    if(hasSpecialCharError)
      errors.push("Atleast one of [$#%@] letter is required");
    if(!errors.length)
      return null;
    else
      return {loginFieldError: errors};

  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }

  ngAfterViewInit() {
    this.element.nativeElement.style.borderRadius = '8px';
    this.element.nativeElement.style.border = '0.5px solid grey';
  }

}
