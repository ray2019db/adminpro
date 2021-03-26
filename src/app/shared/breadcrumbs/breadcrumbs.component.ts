import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  pagina: string = '';

  constructor(private router: Router, public title: Title, public meta: Meta) {

          this.getDataRoute().subscribe(data => {
              this.pagina = data.titulo;
              this.title.setTitle(this.pagina);
              let metaTag: MetaDefinition = {name: 'Description', content: this.pagina};
              this.meta.updateTag(metaTag);
          })
          
  }

  ngOnInit(): void {
  }

  getDataRoute(){
    return this.router.events
    .pipe(filter(evento => evento instanceof ActivationEnd))
    .pipe(filter((evento: ActivationEnd) => evento.snapshot.firstChild === null))
    .pipe(map((evento: ActivationEnd) => evento.snapshot.data));

  }

}
