import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ModalService } from '../../_services/modal.service';
import { FormControl, Validators } from '@angular/forms';
import IClip from '../../models/clip.model';
import { ClipService } from '../../_services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  insubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Waiting';

  clipId = new FormControl('', { nonNullable: true });
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editForm = new FormControl({ title: this.title }, { nonNullable: true });

  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  public async submit() {
    this.insubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait..';

    try {
      await this.clipService.updateClip(
        this.clipId.value,
        this.title.value as string
      );
    } catch (e) {
      this.insubmission = false;
      this.showAlert = true;
      this.alertColor = 'red';
      this.alertMsg = 'Error handling the request. try again';
      return;
    }
    this.insubmission = false;
    this.showAlert = true;
    this.alertColor = 'green';
    this.alertMsg = 'Success';
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    this.clipId.setValue(this.activeClip.docId as string);
    this.title.setValue(this.activeClip.title);
  }
}
