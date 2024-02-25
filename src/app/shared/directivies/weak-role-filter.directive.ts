import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import { RolefilterService } from 'src/app/authservices/rolefilter.service';

@Directive({
    selector: '[weakRoleFilter]'
})
export class WeakRoleFilterDirective {
    @Input("weakRoleFilter") roles: string[];

    constructor(
        private view: ViewContainerRef,
        private template: TemplateRef<any>,
        private roleFilterService: RolefilterService
    ) {
    }

    ngAfterViewInit() {
        if (this.roleFilterService.hasAtleastOneRole(this.roles)) {
            this.view.createEmbeddedView(this.template);
        } else {
            this.view.clear();
        }

    }
}
