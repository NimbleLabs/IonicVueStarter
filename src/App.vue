<template>
  <ion-app>

    <ion-menu contentId="main-content" type="overlay">
      <ion-content>

        <ion-list id="inbox-list">

          <ion-menu-toggle auto-hide="true">
            <ion-item @click="onAboutClick" lines="none" detail="false" class="hydrated pointer">
              <ion-icon slot="start" :ios="aboutItem.iosIcon" :md="aboutItem.mdIcon"></ion-icon>
              <ion-label>About</ion-label>
            </ion-item>
          </ion-menu-toggle>

          <ion-menu-toggle auto-hide="true">
            <ion-item @click="onLogoutClick" detail="false" class="hydrated pointer">
              <ion-icon slot="start" :ios="logoutMenu.iosIcon" :md="logoutMenu.mdIcon"></ion-icon>
              <ion-label>Logout</ion-label>
            </ion-item>
          </ion-menu-toggle>

        </ion-list>

      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { informationCircleOutline, logOutOutline} from 'ionicons/icons';
import About from "./screens/About";
import UserService from "./services/UserService";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet
  },
  computed: {
    logoutMenu() {
      return {
        iosIcon: logOutOutline,
        mdIcon: logOutOutline,
      }
    },
    aboutItem() {
      return {
        iosIcon: informationCircleOutline,
        mdIcon: informationCircleOutline,
      }
    },
  },

  methods: {
    async onAboutClick() {
      this.modal = await modalController
          .create({
            component: About,
            cssClass: 'my-custom-class',
            componentProps: {
              title: 'About Title Here',
              close: () => this.closeModal()
            },
          })
      return this.modal.present();
    },
    closeModal() {
      this.modal.dismiss().then(() => {
        this.modal = null;
      });
    },
    onLogoutClick() {
      let service = new UserService()

      service.logout().then((response) => {
        window.localStorage.removeItem('STARTER_SYSTEM_ID')
        console.log(response)
        this.$router.push({name: 'sign-in' })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
});
</script>