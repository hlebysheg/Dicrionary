
import { LetterService } from '../service/letter.service';

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { modalOption } from 'src/app/common type/modalState.enum';

interface iLetterInput{
  word: string,
  translate: string,
  anotation: string
}

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './createForm.html',
    styleUrls: ['./createForm.scss']
  })
    export class NgbdModalLetter implements OnDestroy, OnInit{
  
    @Input() public option: modalOption | null = null
    @Input() public letterInput: iLetterInput = {word:'',translate:'',anotation:''}
    @Input() public id: number | null = null

    subName = ''
    letterForm: FormGroup = new FormGroup({
        "word": new FormControl("",[
          Validators.required,
        ]),
        "translate": new FormControl("",[
          Validators.required,
        ]),
        "anotation": new FormControl("",[
          
        ]),
      })
      
      
    constructor(public activeModal: NgbActiveModal, private letter: LetterService) {}
    
    ngOnInit(){

      if(this.option === modalOption.UPDATE){
        this.subName = 'update'
        // this.letterForm.setValue(['word'])= this.letterInput?.word
        this.letterForm.setValue({word: this.letterInput?.word, translate: this.letterInput?.translate, anotation: this.letterInput?.anotation})
      }
      if(this.option === modalOption.CREATE){
        this.subName = 'create'
      }
    }
    
    ngOnDestroy(){
        // alert()
    }

    sub(){
      if(this.option === modalOption.CREATE){
        this.letter.createLetter(this.letterForm.value.word, this.letterForm.value.translate, this.letterForm.value.anotation)
      }
      if(this.option === modalOption.UPDATE && this.id){
        this.letter.updateLetter(this.letterForm.value.word, this.letterForm.value.translate, this.letterForm.value.anotation, this.id)
      }
      this.activeModal.close('Close click')  
    }
  }