import { IWoordBook } from './../../woord-book.interface';

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { woordBookService } from "../../service/woordBook.service";
import { modalOption } from 'src/app/common type/modalState.enum';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './createForm.html',
    styleUrls: ['./createForm.scss']
  })
  export class NgbdModalContent implements OnDestroy, OnInit{
  
    subName: string | undefined
    @Input() public option: modalOption | null = null
    @Input() public wordInput: IWoordBook = {
      title: '', 
      language: '', 
      id: 0,
      author: ""
    }
    
    woordBookForm: FormGroup = new FormGroup({
        "title": new FormControl("",[
          Validators.required,
        ]),
        "language": new FormControl("",[
          Validators.required,
        ]),
      })
      
    constructor(public activeModal: NgbActiveModal, private woordbook: woordBookService) {}

  ngOnInit(): void {
    if(this.option === modalOption.UPDATE){
      this.subName = 'update'
      // this.letterForm.setValue(['word'])= this.letterInput?.word
      this.woordBookForm.setValue({title: this.wordInput.title, language: this.wordInput.language})
    }
    if(this.option === modalOption.CREATE){
      this.subName = 'create'
    }
  }
    
    ngOnDestroy(){
        // alert()
    }

    sub(){
      if (this.option === modalOption.CREATE){
        this.woordbook.saveWoordBook(this.woordBookForm.value.title, this.woordBookForm.value.language)
      }

      if(this.option === modalOption.UPDATE && this.wordInput != null){

        let req: IWoordBook = {
          title: this.woordBookForm.value.title,
          language: this.woordBookForm.value.language,
          author: this.wordInput.author,
          id: this.wordInput.id
        }

        this.woordbook.putWoordBook(req)
      }
      this.activeModal.close('Close click')  
      
    }
  }