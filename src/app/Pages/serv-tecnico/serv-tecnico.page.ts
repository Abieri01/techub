import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serv-tecnico',
  templateUrl: './serv-tecnico.page.html',
  styleUrls: ['./serv-tecnico.page.scss'],
})
export class ServTecnicoPage implements OnInit {

  isAlertOpen = false;
  alertButtons = ['Fechar'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  constructor() { }

  ngOnInit() {
  }

}
