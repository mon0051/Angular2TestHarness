import {Component} from 'angular2/core';
declare var SwaggerTools:any;

@Component({

})
export class SwaggerValidator{
    validator:any;

    constructor(){
        this.validator = SwaggerTools.specs.v2;
    }
}