<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbar-title-default ios in-toolbar hydrated">
        <ion-title class="ios title-default hydrated">About</ion-title>
        <ion-buttons slot="end" class="buttons-last-slot sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios hydrated">
          <ion-button @click="dismissModal" class="ios button button-clear in-toolbar ion-activatable ion-focusable hydrated ion-activated">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid style="height: 100%;">
        <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100%;">
          <div>
            <div>powered by</div>
            <div><strong>Your Mad Skillz!</strong></div>
          </div>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,

} from '@ionic/vue';

export default {
  name: 'About',
  props: {
    title: {
      type: String,
      default: 'Super Modal'
    },
    close: { type: Function }
  },
  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonButton, IonGrid, IonRow,
  },
  methods: {
    dismissModal() {
      this.close()
    }
  }
}
</script>