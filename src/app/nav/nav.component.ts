import { Component } from '@angular/core';
import { ModalService } from '../_services/modal.service';
import { AuthService } from '../_services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private modal: ModalService, public auth: AuthService) {}

  public openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }
}
