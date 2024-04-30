import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  public register(id: string) {
    this.modals.push({ id, visible: false });
    console.log(this.modals);
  }
  public unregister(id: string) {
    this.modals = this.modals.filter((element) => element.id !== id);
  }

  public isModalOpen(id: string): boolean {
    return !!this.modals.find((element) => element.id == id)?.visible;
  }

  public toggleModal(id: string) {
    const modal = this.modals.find((element) => element.id == id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }
}
