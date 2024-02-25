import {
  AfterViewInit,
  Directive,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { RolefilterService } from "src/app/authservices/rolefilter.service";


@Directive({
  selector: "[roleFilter]",
})
export class RoleFilterDirective implements AfterViewInit {
  @Input("roleFilter") roles: string[];

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private roleFilterService: RolefilterService
  ) {
  }

  ngAfterViewInit() {
      if (this.roleFilterService.hasAllRoles(this.roles)) {
        this.view.createEmbeddedView(this.template);
      } else {
        this.view.clear();
      }

  }
}
