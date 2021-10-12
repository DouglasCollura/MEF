
Vue.component('principal',
{
  template:`
    <div class="grid" >
 
        <div class="card grid justify-self-center card-presupuesto" style="margin:40px;">
            <h2 class="titulo justify-self-center">Datos del Presupuesto Público</h2>
            <h4 class="titulo justify-self-center" style="font-weight:500">Al cierre del mes anterior</h4>

            <div class="grid grid-col-3x grid-col-3x-lg grid-col-3x-sm " style="padding-top:20px">


                <div class="content-card-presupuesto">
                    
                    <div class="justify-self-end">
                        <img src="public/img/coin-pia.svg" alt="">
                    </div>
                    <div class="justify-self-start titulo">
                        <h4>Presupuesto institucional de Apertura</h4>
                        <h4 style="color:#707988">S/ {{pia}}</h4>
                    </div>

                </div>


                <div class="content-card-presupuesto" style="min-width:200px">
                    
                    <div class="justify-self-end">
                        <img src="public/img/coin-pim.svg" alt="">
                    </div>
                    <div class="justify-self-start titulo">
                        <h4>Presupuesto institucional Modificado</h4>
                        <h4 style="color:#707988">S/ {{pim}}</h4>
                    </div>

                </div>


                <div class="content-card-presupuesto justify-self-end">
                    
                    <div class="justify-self-end align-self-center">
                        <h1 style="color:#F4BB47;font-weight:700"> {{avance}}%</h1>
                    </div>
                    <div class="justify-self-start titulo">
                        <h4>Presupuesto Ejecutado</h4>
                        <h4 style="color:#707988">S/ {{devengado}}</h4>
                    </div>

                </div>

            </div>
        </div>

    </div>
    
  `,
  created(){
    this.GetPresupuesto();
  },
  data() {
    return {
      //CARGA DE DATOS
      pia:'',
      pim:'',
      devengado:'',
      avance:'',

      //GESTION DE DATOS


      //VARIABLES DE CONTROL

    }
  },
  methods:{
    //CARGA DE DATOS================================================
    GetPresupuesto:function(){


        axios.get(getApiURL() + '/GetPresupuesto').then(response => {
            this.pia = this.Decimales(response.data[0].monto_pia);
            this.pim = this.Decimales(response.data[0].monto_pim);
            this.devengado = this.Decimales(response.data[0].devengado);
            this.avance = response.data[0].avance;
        });

    },

    //FUNCIONES=====================================================
    
  
    //FUNCIONES DE CONTROL========================================================
    Decimales:function(val){
      var valu = val.toString();
      var IndexVal = valu.indexOf(".");

      if(IndexVal <=0){
        IndexVal = valu.length;
      }
      var SubString =valu.substr(0,IndexVal);
      var restante = valu.substr(IndexVal, valu.length);
      restante = restante.replace(".",".");
      var i = 1;
      while(true){
        if((IndexVal - (3*i)) <= 0 ){
          break;
        }
        SubString = SubString.slice(0,IndexVal-(3*i))+","+ (SubString).slice(IndexVal-(3*i));
        i++;
      }
      SubString = SubString+restante;
      return SubString;
    }
  },
  mounted(){
    var vue = this;
  


    }
});