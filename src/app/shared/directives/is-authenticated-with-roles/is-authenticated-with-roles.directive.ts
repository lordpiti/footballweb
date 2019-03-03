import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIsAuthenticatedWithRoles]'
})
export class IsAuthenticatedWithRolesDirective {

  @Input() appIsAuthenticatedWithRoles: string[];

  constructor(private el: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    const userRole = localStorage.role;
    if (!this.appIsAuthenticatedWithRoles.some(x=>x === userRole))
    {
      this.viewContainer.clear();
    }
    else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
