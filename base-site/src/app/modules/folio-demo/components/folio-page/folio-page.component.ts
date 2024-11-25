import { Component } from '@angular/core';
import { FolioArray } from "../../models/folio-data.model";

@Component({
  selector: 'app-folio-page',
  templateUrl: './folio-page.component.html',
  styleUrls: ['./folio-page.component.scss']
})
export class FolioPageComponent {

  fData: FolioArray[] = [
    {
      name: 'Name One',
      data: [
        {
          field1: 'chocolate',
          field2: '12.60'
        },
        {
          field1: 'cookies',
          field2: '34444.00'
        },
        {
          field1: 'milk',
          field2: '353.00'
        }
      ]
    }
  ]
}
