<template>

    <v-app >
      <div>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      app
      color="blue lighten-2"
      dense
      elevation="2"
      dark
      
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title>Page title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn top style="margin-top:34px"
        absolute
           right
           fab color="pink lighten-3" @click="logout">out</v-btn>
       </v-app-bar>
      <v-navigation-drawer
          mini-variant
          expand-on-hover 
          app
          v-model="drawer"
        
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shared with me</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    
  </div>
    <v-main app>
      <v-container fluid>
          <router-view/>
      </v-container>
    </v-main>

  </v-app>

</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    db:firebase.firestore()
  }),
  methods:{
    logout(){
     // console.log("salir de la aplicacion");
      firebase.auth().signOut().then(()=>{
        console.log("saliendo de la aplicacion")
          this.$ability.update([
              {
                action: 'read',
                subject: 'Auth',
              },
            ]
            )
          this.$store.commit('cargarUser',{});
          localStorage.clear();
          this.$router.push('/login');
      }).catch((err)=>{
        console.log(err);
      });
    },
  },
  mounted(){
    const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //    // console.log(user);
    //     this.db.collection('users').doc(user.email).get().then((doc)=>{
    //       //console.log(doc.data());
    //       this.$store.commit('cargarUser',doc.data());
    //     });
    //     console.log("logueado");
    //     //console.log(user.uid);
    //     // this.db.collection('tareas').where("userID","==",user.uid).get().then((doc)=>{
    //     //     doc.forEach((doc) => {
    //     //             // doc.data() is never undefined for query doc snapshots
    //     //             console.log( doc.data()); //doc.id, " => ",
    //     //         });
    //     // }).catch((err)=>{
    //     //   console.log(err);
    //     // });
    //      this.db.collection('tareas').where("userID","==",user.email).onSnapshot((doc)=>{
    //      var tareas=[];  
    //        doc.forEach((doc) => {
             
    //                 // doc.data() is never undefined for query doc snapshots
    //                // console.log( doc.data()); //doc.id, " => ",
    //                var tarea=doc.data();
    //                 tarea.id=doc.id;
    //                 tarea.fecha_vencimiento=tarea.fecha_vencimiento.toDate();
    //                 tareas.push(tarea);
    //             });
    //              this.$store.commit('cargarTareas',tareas)
    //            // console.log(tareas);
    //     })

    //    // this.$router.push('/about').catch(err=>console.log());
    //     // ...
    //   } else {
    //     console.log("no logueado");
    //     //this.$router.push('/');
    //   }
    // });
  }
};
</script>
