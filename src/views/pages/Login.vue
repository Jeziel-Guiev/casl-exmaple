<template>
   <v-container>
     <v-row>
       <v-col class="d-flex justify-center">
         <div>
           <v-card elevation="9" rounded style="padding:10px" class="">
                      <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
            v-model="userEmail"
            :counter="10"
            :rules="emailRules"
            label="Email"
            required
            ></v-text-field>

            <v-text-field
            v-model="password"
          
            label="Password"
            required
            ></v-text-field>
            <v-btn @click="login" :color="color" dark>  iniciar sesion</v-btn>
            <v-btn @click="logingoogle" class="mx-5" color="red" dark>  iniciar por google <v-icon color="dark" size="20">mdi-google</v-icon></v-btn>
        
        </v-form>
           </v-card>
         </div>
       </v-col>
     </v-row>
   </v-container>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
  export default {
    name: 'login',
    data(){
        return{
          db:firebase.firestore(),
                    color:"black",
                    valid: true,
                    name: '',
                    nameRules: [
                        v => !!v || 'Name is required',
                        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                    ],
                    email: '',
                    password:'',
                    emailRules: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    select: null,
                   userEmail:'',
                   //password:''
                   
        }
    },
       methods: {
     async logingoogle(){
         var proveedor= new firebase.auth.GoogleAuthProvider();
         return firebase.auth().signInWithPopup(proveedor);
     },
     async login(){
          console.log("iniciando sesion");
       firebase
        .auth()
        .signInWithEmailAndPassword(this.userEmail, this.password)
        .then(async (userCredential) => {

          this.db.collection('users').doc(userCredential.user._delegate.email).get().then((doc)=>{
          console.log(doc.data().ability[0].subject);
          this.$ability.update(doc.data().ability)
          this.$store.commit('cargarUser',doc.data()); //
          localStorage.setItem('Subject',doc.data().ability[0].subject)
          this.$store.commit('saveResource',doc.data().ability[0].subject); //
//    saveResource(state, subject) {

         // this.$store.commit('saveResource',doc.data().ability);
          localStorage.setItem('userData', JSON.stringify(doc.data()))
          this.$router.replace(getHomeRouteForLoggedInUser(doc.data().role))
        });
           // console.log(userCredential.user);
        })
        .catch(err => {
          this.error = err.message;
          console.log(this.error);
        });
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
