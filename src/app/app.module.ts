import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {PatientPage} from '../pages/patient/patient';
import {AssessmentPage} from '../pages/assessment/assessment';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from "@angular/common/http";
import { RestProvider } from '../providers/rest/rest';
import {PatientSelectorPage} from "../pages/patient-selector/patient-selector";
import {PatientAssessmentsPage} from "../pages/patient-assessments/patient-assessments";

@NgModule({
  declarations: [
    MyApp,
    PatientPage,
    AssessmentPage,
    TabsPage,
    PatientSelectorPage,
    PatientAssessmentsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PatientPage,
    AssessmentPage,
    TabsPage,
    PatientSelectorPage,
    PatientAssessmentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
