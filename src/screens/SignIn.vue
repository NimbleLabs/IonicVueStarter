<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form @submit.prevent="onSigninClick">
        <ion-grid>
          <ion-row color="primary">
            <ion-col size-md="6" size-lg="5" size-xs="12">
              <div>
                <h3>Login</h3>
              </div>
              <div>
                <ion-item>
                  <ion-input v-model="user.email" name="email" type="email"
                             placeholder="your@email.com" required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input v-model="user.password" name="password" type="password"
                             placeholder="Password" required></ion-input>
                </ion-item>
              </div>
              <div>
                <ion-button size="large" type="submit" expand="block">Login</ion-button>
              </div>

<!--              <div class="ion-padding-top">-->
<!--                <router-link :to="signupRoute">-->
<!--                  New here? Create a free account.-->
<!--                </router-link>-->
<!--              </div>-->
            </ion-col>

          </ion-row>
        </ion-grid>
      </form>
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
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonButton,
  IonInput,
  toastController
} from '@ionic/vue';
import UserService from "../services/UserService";

export default {
  name: 'SignIn',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonButton,
    IonInput
  },
  data() {
    return {
      // model: webase.model,
      user: {
        email: '',
        password: '',
        rememberMe: false
      },
      errorMessage: null,
      appId: null
    }
  },
  computed: {
    signupRoute() {
      if(this.appId) {
        return { name: 'sign-up', params: {app_id: this.appId}}
      }

      return { name: 'sign-up'}
    }
  },
  methods: {
    async openToast() {
      console.log('openToast')
      const toast = await toastController
          .create({
            message: this.errorMessage,
            duration: 2000,
            color: "danger"
          })
      return toast.present();
    },
    onSigninClick() {
      this.errorMessage = null
      let service = new UserService()

      service.login(this.user.email, this.user.password).then((response) => {
        //webase.model.auth_token = response.auth_token
        //webase.model.user_id = response.id
        console.log(response)
        window.localStorage.setItem('STARTER_SYSTEM_ID', response.auth_token)
        this.$router.push({name: 'tab1'})

      }).catch((error) => {
        console.log(error)
        this.errorMessage = error['error']
        this.openToast()
      })
    }
  }
}
</script>