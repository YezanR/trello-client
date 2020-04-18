import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  @ViewChild('content') 
  content: TemplateRef<any>;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {
        console.log(result);
      }, (reason) => {

      });
  }
}
