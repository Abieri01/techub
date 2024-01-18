import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serv-tecnico',
  templateUrl: './serv-tecnico.page.html',
  styleUrls: ['./serv-tecnico.page.scss'],
})
export class ServTecnicoPage implements OnInit {
  darkMode = false;
  isAlertOpen = false;
  alertButtons = ['Fechar'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  constructor() { }

  ngOnInit() {
  }

  checkAppMode(){

    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    checkIsDarkMode == 'true'
    ? (this.darkMode = true)
    : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      localStorage.setItem('darkModeActivated', 'true');
    } else{
      localStorage.setItem('darkModeActivated', 'false');
    }
    }

}
