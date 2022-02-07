<template>
<v-container>
  <div>
     PERFIL DE USUARIO
      <br>
      <br>
    <div>
     
      <v-card>
        <div class="mx-4">
          <div><h3>Email:</h3> {{user.email}}</div>
          <div><h3>Nombre:</h3> {{user.nombre}}</div>
          <div><h3>Apellido:</h3> {{user.apellido}}</div>
          <div><h3>Curso: </h3>{{user.curso}}</div>
          <div><h3>Parelelo:</h3> {{user.parelelo}}</div>
          <div><h3>Turno:</h3> {{user.turno}}</div>
          <div><h3>Nivel:</h3> {{user.nivel}}</div>
          <div><h3>Direccion:</h3> {{user.direccion}}</div>
          <div><h3>Telefono:</h3>{{user.telefono}}</div>
           <div><h3 style="text-color:red">estado de PAGO:</h3>{{user.statePago}}</div>
          
        </div>
      </v-card>
    </div>
    <br>
 <v-row >
   <v-col align="right" >
        <v-btn top style="margin-top:34px"
        absolute
           right
           fab color="pink lighten-3" @click="logout">out</v-btn>
   </v-col>
 </v-row>
 <div>TAREAS</div>
 <br>
 <div>
   <v-card >
       <v-row class="mx-4">
          <v-col md="4" cols="12">
            <div>
              <v-text-field v-model="tarea.contenido" placeholder="agregar nueva tarea"> </v-text-field>
                <v-btn @click="agregarTareas">agregar tarea</v-btn>
            </div>
          </v-col>
          <v-col md="8" cols="12">
            <div>
              tabla de tareas
              <tareaslist/>
            </div>
          </v-col>
        </v-row>
   </v-card>
 </div>
  </div>
</v-container>
</template>
<script>
import { mapState } from 'vuex'
import tareaslist from '../components/tareaslist.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default ({
  name:'about',
  components:{
    tareaslist
  },
  data(){
    return{
      db:firebase.firestore(),
      tarea:{
        completado:false,
        contenido:'',
        fecha_vencimiento:new Date(),
        userID:''
      }
    }
  },
  computed:{
        ...mapState([
            'user'
            ])
    },
  methods:{
    logout(){
     // console.log("salir de la aplicacion");
      firebase.auth().signOut().then(()=>{
        console.log("saliendo de la aplicacion")
      }).catch((err)=>{
        console.log(err);
      });
    },
    agregarTareas(){
      // el json que entra en las tareas
      // const tare={
      //   completado:false,
      //   contenido:"DFSDF",
      //   fecha_vencimiento:new Date(),
      //   userID:"SDFSDF"
      // }

      
      const user=firebase.auth().currentUser;
     // console.log(user.uid);
      this.tarea.userID=user.email
      this.db.collection("tareas").add(this.tarea).then((data)=>{
        console.log(data);
        this.tarea.contenido=''
      }).catch((err)=>{
        console.log(err);
      });
      //this.tarea=''
    }
  }
  
})
</script>
