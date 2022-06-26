import { UserService } from './../user/User.service';
import { IWoordBook } from './woord-book.interface';
import { Subscription, switchMap } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { woordBookService } from './service/woordBook.service';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { animationLetter } from '../letter/letter.animation';
import { NgbdModalContent } from './form/createPutForm/createForm';
import { NgbdModalSucces } from './form/confirmForm/createForm';
import { modalOption } from '../common type/modalState.enum';

@Component({
  selector: 'app-woord-book',
  templateUrl: './woord-book.component.html',
  styleUrls: ['./woord-book.component.scss'],
  animations: [animationLetter]
})
export class WoordBookComponent implements OnInit, OnDestroy{

  private subDict: Subscription | null = null
  private subDelete: Subscription | null = null
  private activeSub: Subscription | null = null
  private isLoginSub: Subscription | null = null
  woordBooks: Array<IWoordBook> | null = null
  isLoading = false
  msg = ''
  activeId: number | null = null
  findText=''


  constructor(private woordbook: woordBookService, 
              private modalService: NgbModal, 
              private router: Router, 
              private route: ActivatedRoute, 
              private user: UserService) {

    this.isLoginSub = this.user.isLogin$.subscribe(el=>{
      if(el === false){
        this.router.navigateByUrl('/login')
      }
    })
    
    this.subDict = woordbook.woordBook$
    .subscribe({
      next: (el: Array<IWoordBook> | null) => el?this.woordBookSet(el): null
    })

  }

  ngOnInit(): void {
    
    this.woordbookGet()
    
    this.activeSub = this.route.children[0]?.paramMap.pipe(
      switchMap(params => {
        return params.getAll('id')
      })
    )
    .subscribe(data=> {
      this.activeId = +data
    })
  }

  ngOnDestroy(): void {
    this.subDict?.unsubscribe()
    this.subDict = null
    this.activeSub?.unsubscribe()
    this.activeSub = null
    this.isLoginSub?.unsubscribe()
    this.isLoginSub = null
    this.subDelete?.unsubscribe()
    this.subDelete = null
  }

  letterNavigate(id: number | undefined){
    this.router.navigate(['my-woordbook',`letters`,`${id}`], {})
    this.activeId = id!=undefined? id: null

    if(this.activeSub == null){
      this.activeSub = this.route.children[0]?.paramMap.pipe(
        switchMap(params => {
          return params.getAll('id')
        })
      )
      .subscribe(data=> {
        this.activeId = +data
      })
    }
  }
  
  woordbookGet(){
    this.isLoading = true
    this.woordbook.setWoordBook()
  }

  woordBookSet(woordBooks: Array<IWoordBook>){
    this.woordBooks = woordBooks
    this.isLoading = false
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent)
    modalRef.componentInstance.option = modalOption.CREATE
    // modalRef.result
  }

  edit(language: string, title: string, author: string, id: number) {

    let book: IWoordBook = {language, title, author, id}

    const modalRef = this.modalService.open(NgbdModalContent)
    modalRef.componentInstance.option = modalOption.UPDATE
    modalRef.componentInstance.wordInput = book
   
  }

  del(id: number){
    const modelRef = this.modalService.open(NgbdModalSucces)
    this.subDelete = modelRef.componentInstance.isSucces.subscribe ((el: boolean)=>{
      el? this.woordbook.delWoordBook(id): ''
    }
    )
  }
}
