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
            <v-btn @click="Register" :color="color" dark>  Registrarse</v-btn>
 
        </v-form>
   </v-container>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
  export default {
    name: 'register',
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
     async Register(){
         
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.userEmail, this.password)
        .then(async () => {
           var user=firebase.auth().currentUser;
           user.updateProfile({
               displayName:"Jeziel Guiev"
           }).then(()=>{
               resolve();
           }).catch((err)=>{
               console.log("error al actualizar usuario");
           });
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
