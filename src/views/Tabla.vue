<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="usuarios"
    >
      <template v-slot:[`usuario.accion`]='{usuario }'>
        <div class="text-truncate">
                          <v-icon
                            small
                            class="mr-2"
                            @click="showEditDialog(usuario)"
                            color="primary" 
                          >
                            mdi-pencil
                          </v-icon>
                          <v-icon
                            small
                            @click="de(usuario)"
                            color="pink" 
                          >
                            mdi-delete
                          </v-icon>
                      </div>
      </template>
      
        
      
      
    </v-data-table>
    <!-- Dialog para updatear y dar de alta -->
    <v-dialog v-model="dialog">
                  <template v-slot:activator="{ on }">
                    <div class="d-flex">
                        <v-btn color="primary" dark v-on="on">
                            New 
                        </v-btn>
                    </div>
                  </template>
                  <v-card>
                    <v-card-title>
                        <span v-if="usuarioAEditar.usuario">Edit {{usuarioAEditar.usuario}}</span>
                        <span v-else>Create</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="4">
                            <v-text-field v-model="usuarioAEditar.nombre" label="Nombre"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="usuarioAEditar.apellido" label="Apellido"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <v-text-field v-model="usuarioAEditar.Dni" label="Dni"></v-text-field>
                          </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue" text @click="showEditDialog()">Cancel</v-btn>
                      <v-btn color="blue" text @click="guardarUsuario(usua)">Save</v-btn>
                    </v-card-actions>
                  </v-card>
    </v-dialog>
  </v-card>
  
    
  
</template>
<script>

import service from "../service/ApiService"
export default{

  
   
   name:"lista-usuarios",
   
   data: () => ({ 
        dialogDelete: false,
        usuarios:[],
      
        headers: [
                   
                    {
                        text:"Usuario",
                        value:"usuario",
                        sortable:false
                    },
                    {
                        text:"Nombre",
                        value:"nombre",
                        sortable:false
                    },
                    {
                        text:"Apellido",
                        value:"apellido",
                        sortable:false
                    },
                    {
                        text:"Dni",
                        value:"dni",
                        sortable:false
                    },
                    {
                        text:"Accion",
                        value:"acciones",
                        sortable:false
                    }
                ],
        
        dialog: false, 
        usuarioAEditar:{}


   }),
    mounted() {
    this.obtenerUsuarios()
  },
    methods:{
      showEditDialog(usuario) {
        this.usuarioAEditar = usuario||{}
        this.dialog = !this.dialog
    },
       closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      guardarUsuario(usuario) {
        /* this is used for both creating and updating API records
         the default method is POST for creating a new item */
        
          service.altaUsuario(usuario);
        
        
      },
      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
        obtenerUsuarios(){
            service.getListaUsuarios().then((response)=>{
              
                this.usuarios = response;
                console.log(response)
            }).catch((e)=>{
                console.log(e);
            });
        },
        
        refreshTable(){
            this.obtenerUsuarios();
        },
       

    }
    
       
        

    
}

</script>
