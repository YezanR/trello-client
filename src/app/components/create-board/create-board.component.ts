import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '@app/services/board/board.service';
import { Board } from '@app/entities/board';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  @ViewChild('content') 
  content: TemplateRef<any>;

  board: Board = new Board();

  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private boardService: BoardService,
    ) { 

  }

  ngOnInit(): void {

  }

  open(): Promise<any> {
    this.modalRef = this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
    return this.modalRef.result;
  }

  create() {
    this.boardService.create(this.board)
      .subscribe(board => {
        //Emit signal
        this.modalRef.close(board);
      }, (error) => {
        
      })
  }
}
