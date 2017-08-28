import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';//IMPORTANT::
import { FormsModule, FormBuilder,ReactiveFormsModule } from '@angular/forms'; //IMPORTANT::
import { RouterModule, Routes } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdListModule,
  MdToolbarModule,
  MdDialogModule,
  MdInputModule
} from '@angular/material';
import 'hammerjs';

// Services
import { ContactsService } from './services/contacts.service';

//Components
import { AppComponent } from './app.component';
import { ListContactsComponent } from './Components/contacts/list-contacts/list-contacts.component';
import { ContactsComponent } from './Components/contacts/contacts.component';
import { CreateContactComponent } from './Components/contacts/create-contact/create-contact.component';

//
const appRoutes:Routes = [
  {path:'', component:ContactsComponent},
  {path:'create', component:CreateContactComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ListContactsComponent,
    ContactsComponent,
    CreateContactComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    // Material Design
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdListModule,
    MdToolbarModule,
    MdDialogModule,
    MdInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdListModule,
    MdToolbarModule,
    MdDialogModule,
    MdInputModule
  ],
  providers: [ContactsService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
