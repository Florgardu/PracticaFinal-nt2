<template>

    <section class="src-components-formulario">
        <div class="jumbotron">
            <h2> Formulario Gastos</h2>
          <form novalidate autocomplete="off">

                <!-- ingreso de dato texto  -->
                <div class="form-group">
                    <label for="nombre"> Ingrese un Texto </label>
                    <input type="text" id="nombre" class="form-control" v-model="v.f.texto.$model">
                </div>

                <!-- cartel de validación nombre -->
                <div v-if="v.f.texto.$error && v.f.texto.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.f.texto.required.$invalid">Este campo es requerido</div>
                </div>
      </form>

      <h3>{{codificar(v.f.texto.$model)}}</h3>
    </div>
    </section>

</template>

<script>

import { required, } from '@vuelidate/validators'

import {useVuelidate} from '@vuelidate/core'

import filtros from '../filtros.js'


export default {
  name: 'src-components-formulario',
  mixins: [filtros],
  props: [],
  mounted() {
  },

  created(){

// acá valido los campos de f (formulario)
  const rules= {
    f: {
  texto: {
        required,
   
      },
  
    }
  }
        const f = this.f
        this.v = useVuelidate(rules, {f})

  },
   components: {
  },
  data() {
    return {
      f: {
        texto: '',
      },
      v:null, 
      url: 'https://5f789e6d66d4960016c49ded.mockapi.io/datosform'

    }
  },
  
  methods: {

    //Envio los datos del formulario al backend con AXIOS- POST
    async sendDatosForm(datos) {
      try {
        let response = await this.axios.post(this.url, datos, {
          'content-type': 'application/json'
        })
        console.log(response.data)
      } catch (error) {
          console.log('HTTP POST ERROR', error)
      }
    },

    // SUBMIT DEL FORMULARIO
    async enviar() {
        this.v.$touch();
        if(!this.v.$invalid) {
          let form = this.f;
          try{
            await this.sendDatosForm(form);
            this.resetCasillas();
            this.v.$reset();            
          }catch(err){
            console.err(err);
          }

        } else {
          this.resetCasillas()
          this.v.$reset()
        }
    },

    // REINICIO DE LOS DATOS- PONE EN BLANCO LAS CASILLAS COMPLETADAS 
    resetCasillas() {
      this.v.f.nombre.$model = ''
      this.v.f.descripcion.$model = ''
      this.v.f.importe.$model = ''
    }

  },
  computed: {

  }
}

</script>

<style scoped lang="css">

  .jumbotron {
    background-color: rgb(25, 184, 144);
    color: white;
  }

  hr {
    background-color: #ddd;
  }

  .btn {
    border: none;
    background-color: white;
    font-family: "Montserrat", "Avenir";
    text-transform: uppercase;
    height: 100%;
    font-weight: 700;
    letter-spacing: 1px;
    color: steelblue;
    transition: all 0.3s;
    outline: none;
  }
  .btn:hover {
    color: white;
    background-color: rgb(216, 95, 15);
  }

</style>
