<template>
<v-container>
  <div>
      <v-btn @click="insertDoc">insertar documentos</v-btn>
      <br>
      <br>
         <div>
            
                <div class="excel-wrap" id="excelWrap">
                  <!-- Subir entrada -->
                  <input type="file" accept=".xlsx, .xls" @change="changeFile" id="fileInput" />
                  <!--  Área de visualización de la hoja de Excel -->
                  <div id="result" contenteditable></div>
                  <!--  Botón para mostrar la hoja de trabajo -->
                  <div id="buttons"></div>
                </div>
          </div>

          <v-btn @click="deleteUser">Eliminar usuarios</v-btn>

           <v-btn @click="getUsers">Obtener usuarios</v-btn>
  </div>
</v-container>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import XLSX from "xlsx";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default ({
  name:'insertdoc',

  data(){
    return{
      db:firebase.firestore(),

    }
  },
  
  methods:{
    async getUsers(){
      this.db.collection("usuarios").get().then((querySnapshot) => {
        console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc);
    // });
  });
    },
    async deleteUser(){
   const user = firebase.auth().currentUser;
    //   //console.log(this.$store.state.correos);
    //  await this.db.collection('users').delete("nodeseradadver.iot@gmail.com").then(() => {
    //     console.log("user borrado");
    //   }).catch((error) => {
    //     console.log("no se borro nada");
    //   });
  
    },
      async changeFile(ev) { 
      // console.log('file: ', ev.target.files[0]);
      let f = ev.target.files[0],
      reader = new FileReader();
      reader.onload =async  e => {
        let data = e.target.result;
        //console.log("data: ", data);
        let workbook = XLSX.read(data, { type: "array" });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        //console.log(sheet[1]);
        const db=firebase.firestore();
        sheet.forEach(async  function(valor, indice, array) {
        
           const usuario={
                email:valor[4],
                username:valor[2],
                fullName: valor[2],
                apellido:valor[3],
                curso:'curso',
                ability: [
                    {
                      action: 'manage',
                      subject: 'all',
                    },
                  ],
                  extras: {
                    eCommerceCartItemsCount: 5,
                  },
                paralelo:'paralelo',
                turno:valor[9],
                nivel:'nivel',
                direccion:'direccion',
                telefono:'telefono',
                role:valor[8],
                statePago:1
          }

           await db.collection("usuarios").doc(valor[4]).set(usuario)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            console.log(valor);
        });


        // let dataset = await this.parseFileContent(sheet);
        // this.setState({ 
        //     dataset: dataset,
        //     fileLoaded: true,
        //     fileName: file.name,
        //     operationInProgress: false
        // });
       
      };
      reader.readAsArrayBuffer(f);
    },
      async insertDoc(){
          const usuario={
                email:'nodeserver.iot@gmail.com',
                nombre:'Josue',
                apellido:'Jimenez',
                curso:'5A',
                parelelo:'Segundo',
                turno:'Tarde',
                nivel:'octavo a',
                direccion:'Barrio salvador',
                telefono:'88934243',
                rol:'estudiante',
                statePago:1
          }
          this.db.collection("users").doc("nodeserver.iot@gmail.com").set(usuario)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
      }
  }
  
})
</script>
