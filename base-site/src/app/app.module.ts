import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from "./modules/main-page/main-page.module";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from "@angular/common/http";
import { AuthInterceptor } from "./guards/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(),
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
