import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientSelectorPage } from './patient-selector';

@NgModule({
  declarations: [
    PatientSelectorPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientSelectorPage),
  ],
})
export class PatientSelectorPageModule {}
