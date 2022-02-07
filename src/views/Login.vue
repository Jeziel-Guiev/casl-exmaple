<template>
   <v-container>
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
   </v-container>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
  export default {
    name: 'login',
    data(){
        return{
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
            console.log(userCredential.user);
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
