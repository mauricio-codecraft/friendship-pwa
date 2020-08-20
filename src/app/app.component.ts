import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import Amplify from 'aws-amplify';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    // Custom Home
    {
      title: 'Home',
      url: '/',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    },
    // Custom User
    {
      title: 'User',
      url: '/user',
      icon: 'person-circle'
    } 
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('environment.aws = ', environment.aws)  // FIXME: remove
      let amplifyConfig = {
        /*
        Auth: {
          mandatorySignIn: true,
          region: environment.aws.cognito.REGION,
          userPoolId: environment.aws.cognito.USER_POOL_ID,
          identityPoolId: environment.aws.cognito.IDENTITY_POOL_ID,
          userPoolWebClientId: environment.aws.cognito.APP_CLIENT_ID
        },
        Storage: {
          region: environment.aws.s3.REGION,
          bucket: environment.aws.s3.BUCKET,
          identityPoolId: environment.aws.cognito.IDENTITY_POOL_ID
        },
        */
        API: {
          endpoints: [
            {
              name: "friendship",
              endpoint: environment.aws.apiGateway.URL,
              region: environment.aws.apiGateway.REGION
            },
          ]
        }
      };
      console.log('amplifyConfig = ', amplifyConfig)  // FIXME: remove
      Amplify.configure(amplifyConfig);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
