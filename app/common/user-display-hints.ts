import {Component} from 'angular2/core';
import {Input} from 'angular2/core';

@Component({
	template:'{{loaderText}}<span class="loader__dot">.</span><span class = "loader__dot" >.</span><span class = "loader__dot" >.</span>',
	selector:'loading-hint',

})
export class DisplayThinkingHint{
	@Input() loaderText:string;
}
