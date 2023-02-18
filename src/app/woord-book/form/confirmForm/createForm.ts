
import { Component, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventEmitter } from '@angular/core';
import { woordBookService } from "../../service/woordBook.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './createForm.html',
    styleUrls: ['./createForm.scss']
  })
  export class NgbdModalSucces implements OnDestroy{
    
    @Output() isSucces: EventEmitter<boolean> = new EventEmitter()

    constructor(public activeModal: NgbActiveModal, private woordbook: woordBookService) {}
    
    ngOnDestroy(){
        // alert()
    }

    sub(isDel: boolean){
      if(isDel == false){
        this.activeModal.close()
      }
      this.isSucces.emit(isDel)
      this.activeModal.close()
    }
  }