import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, delay, pipe } from 'rxjs';
import { Iletter } from './letter.interfare';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LetterService } from './service/letter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalLetter } from './form/createForm';
import { animationLetter } from './letter.animation';
import { modalOption } from '../common type/modalState.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  animations: animationLetter
})
export class LetterComponent implements OnInit, OnDestroy {

  private sub: Subscription | null = null
  letters: Array<Iletter> | null = null
  id: number | undefined
  isLoading = false
  findEl: string = ''

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
  
  
  constructor(private letter: LetterService, private router: ActivatedRoute, private modalService: NgbModal) {
    this.sub = this.letter.letters$.subscribe((el: Array<Iletter> | null) => {
      this.letters = el
      this.isLoading = false
    })
  }

  ngOnInit() {
    this.isLoading = true
    this.router.paramMap.pipe(
        switchMap(params => {
          this.isLoading = true
          return params.getAll('id')
        })
    )
    .pipe(delay(200))
    .subscribe(data=> {
      
      this.id = +data
      this.letter.setLetter(this.id)
      
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
    this.sub = null
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalLetter)
    modalRef.componentInstance.option = modalOption.CREATE
    modalRef.result
  }

  del(id: number){
    this.letter.deleteLetter(id)
  }

  edit(id: number, word: string, translate: string, anotation: string){
    const modalRef = this.modalService.open(NgbdModalLetter)
    modalRef.componentInstance.option = modalOption.UPDATE
    modalRef.componentInstance.letterInput = {word, translate, anotation}
    modalRef.componentInstance.id = id
  }

  create(){

  }

}
