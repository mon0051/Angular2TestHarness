System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2;
    var DisplayThinkingHint;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            DisplayThinkingHint = (function () {
                function DisplayThinkingHint() {
                }
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], DisplayThinkingHint.prototype, "loaderText", void 0);
                DisplayThinkingHint = __decorate([
                    core_1.Component({
                        template: '{{loaderText}}<span class="loader__dot">.</span><span class = "loader__dot" >.</span><span class = "loader__dot" >.</span>',
                        selector: 'loading-hint',
                    }), 
                    __metadata('design:paramtypes', [])
                ], DisplayThinkingHint);
                return DisplayThinkingHint;
            })();
            exports_1("DisplayThinkingHint", DisplayThinkingHint);
        }
    }
});
//# sourceMappingURL=user-display-hints.js.map