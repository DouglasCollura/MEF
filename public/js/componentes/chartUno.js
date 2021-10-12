
Vue.component('principal',
{
  template:`
  <div class="temp-chartUno">

    <div class="chartUnoTop">
      <div class="text-center grid grid-col-1x grid-col-1x-sm grid-col-1x-xs">
        <div>
          <h3 class="titulo">Ejecución histórica de gastos</h3>
        </div>

        <div>
          <select v-model="mes" id="mes" >
            <option value="1"> Enero </option> 
            <option value="2"> Febrero </option>  
            <option value="3"> Marzo </option>  
            <option value="4"> Abril </option>  
            <option value="5"> Mayo </option>  
            <option value="6"> Junio </option>  
            <option value="7"> Julio </option>  
            <option value="8"> Agosto </option>  
            <option value="9"> Septiembre </option>  
            <option value="10"> Octubre </option>  
            <option value="11"> Noviembre </option>  
            <option value="12"> Diciembre </option>  

          </select>
        </div>
        <div>
          <div class="separator"></div>
        </div>

      </div>
    </div>

    <div class="chartUnoLeft grid grid-col-1x grid-col-1x-sm grid-col-1x-xs" v-if ="fase != 0">
      <div class="grid justify-items-center" style="width:400px; height:100px">
        
        <div class="justify-self-center">
          <h4 class="titulo">Selecciona el nivel de gobierno a consultar</h4>
        </div>

        <div class="content-barra">
              <div id="niv_gob_1" class="img-left img-content-dis"></div>

              <div id="niv_gob_2"  class="img-center img-content-dis" ></div>

              <div id="niv_gob_3" class="img-right img-content-dis" ></div>

              <div class="line"></div>
        </div>

        <div style="width:100%" class="grid grid-col-3x-lg grid-col-3x grid-col-3x-sm grid-col-3x-xs">
          <div >
            <h4 id="title_niv_gob_1" class="text-left">Gobierno Nacional</h4>
          </div>

          <div>
            <h4 id="title_niv_gob_2" class="text-center" >Gobierno Regional</h4>
          </div>

          <div >
            <h4 class="text-right" id="title_niv_gob_3" >Gobierno Local</h4>
          </div>

        </div>
      </div>
        <div style="min-width: 100%" class="grid grid-col-1x text-left " v-if="nivel_gobierno == 'E' || nivel_gobierno == 'R' ">
          <label for="">Sector</label>
          <select v-model="sector" @change="CargarPliego">
            <option value="0" disabled>Seleccione un sector</option>  
            <option v-for="sector in sectores"> {{sector.sector_nombre}} </option>  
          </select>

          <label for="">Pliego</label>
          <select v-model="pliego" @change="CargarEjecutora">
            <option value="0" disabled>Seleccione un pliego</option>  
            <option v-for="pliego in pliegos"> {{pliego.pliego_nombre}} </option>  
          </select>

          <label for="">Ejecutora</label>
          <select v-model="ejecutora"  id="ejecutora">
            <option value="0" disabled>Seleccione una ejecutora</option>  
            <option v-for="ejecutora in ejecutoras"> {{ejecutora.ejecutora_nombre}} </option>  
          </select>
        </div>

        <div style="min-width: 100%" class="grid grid-col-1x text-left "  v-if="nivel_gobierno == 'M' ">
          <label for="">Departamento</label>
          <select v-model="departamento" @change="CargarProvincia">
            <option value="0" disabled>Seleccione un departamento</option>
            <option v-for="departamento in departamentos"> {{departamento.departamento_ejecutora_nombre}} </option>  
          </select>             

          <label for="">Provincia</label>
          <select v-model="provincia" @change="CargarMunicipalidad">
            <option value="0" disabled>Seleccione una provincia</option>
            <option v-for="provincia in provincias"> {{provincia.provincia_ejecutora_nombre}} </option>  
          </select>
          <label for="">Municipalidad</label>
          <select v-model="municipalidad" id="municipalidad">
            <option value="0" disabled>Seleccione una municipalidad</option>
            <option v-for="municipalidad in municipalidades"> {{municipalidad.distrito_ejecutora_nombre}} </option>  
          </select>
        </div>

    </div>

    <div class="chartUnoRight justify-start" >

      <div class="grid grid-col-1x text-center" >

        <div class="grid justify-center ">
          <div class="barchart" style="width: 500px;">
            <canvas id="mybarChart2" ></canvas>
          </div>

        </div>

      </div>

          <div class="grid text-center justify-center">
            <div>
              <div style="width:20px;height:20px;background-color:#98BD1F;display:inline-block"></div> <p class="align-center" style="display:inline-block">Ejecución Histórica de solo {{mes_val}}</p>
            </div> 
            <div>
              <div style="width:20px;height:20px;background-color:#0094F8;display:inline-block"></div> <p class="align-center" style="display:inline-block">Ejecución Histórica Acumulada desde Enero a {{mes_val}}</p>
            </div> 

          </div> 

    </div>
    
  </div>
  `,
  created(){
    Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
    });
    swal.close();
    this.CargarBarra();
  },
  data() {
    return {
      //CARGA DE DATOS
      
      sectores:'',
      pliegos:'',
      ejecutoras:'',


      departamentos:'',
      provincias:'',
      municipalidades:'',


      //GESTION DE DATOS
      mes:'1',
      mes_val:'',

      sector:'0',
      pliego:'0',
      ejecutora:'0',

      departamento:'0',
      provincia:'0',
      municipalidad:'0',

      //GRAFICAS

      anios_grap:[],
      presupuestado:[],
      ejecutado: [],

      PIM:[],
      ejecutado_acum:[],
      tasa:[],

      //VARIABLES DE CONTROL
      nivel_gobierno:'',
      fase: 1,
    }
  },
  methods:{
    //CARGA DE DATOS================================================

    CargarSector:function(){
      if(this.anio == 'Año'){
        this.fase = 0;
      }else{
        this.fase = 1;
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
        const params = {
          anio: this.anio,
          tipo_gobierno: this.nivel_gobierno,
          departamento_ejec: this.departamento_ejec
        }

        this.sector="0";
        axios.post(getApiURL() + '/CargarSector',params).then(response => {
          this.sectores = response.data;
        });
      }

    },

    CargarPliego:function(){

      const params = {
        tipo_gobierno: this.nivel_gobierno,
        sector: this.sector
      }
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
      this.pliego='0';
      this.ejecutora='';
      
      axios.post(getApiURL() + '/CargarPliego',params).then(response => {
        this.pliegos = response.data;
        this.CargarBarra();
      });
    },

    CargarEjecutora:function(){

      const params = {
        tipo_gobierno: this.nivel_gobierno,
        pliego: this.pliego
      }
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
      this.ejecutora='0';

      
      axios.post(getApiURL() + '/CargarEjecutora',params).then(response => {
        this.ejecutoras = response.data;
        this.CargarBarra();
      });
    },

    CargarDepartamento:function(){
      if(this.anio == 'Año'){
        this.fase = 0;
      }else{
        this.fase = 1;
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
        const params = {
          anio: this.anio,
          tipo_gobierno: this.nivel_gobierno,
          departamento_ejec: this.departamento_ejec
        }
        this.departamento="0";

        axios.post(getApiURL() + '/CargarDepartamento',params).then(response => {
          this.departamentos = response.data;
        });
      }

    },

    CargarProvincia:function(){
      const params = {
        anio: this.anio,
        tipo_gobierno: this.nivel_gobierno,
        departamento: this.departamento
      }
      Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
      });
      this.provincia="0";
      this.municipalidad="";
      this.provincias='';
      this.municipalidades='';

      axios.post(getApiURL() + '/CargarProvincia',params).then(response => {
        this.provincias = response.data;
        this.CargarBarra();
      });
    },

    CargarMunicipalidad:function(){
      const params = {
        anio: this.anio,
        tipo_gobierno: this.nivel_gobierno,
        departamento: this.departamento,
        provincia: this.provincia
      }
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
        this.municipalidad="0";
      this.municipalidades='';
      
      axios.post(getApiURL() + '/CargarMunicipalidad',params).then(response => {
        this.municipalidades = response.data;
        this.CargarBarra();
        
      });
    },

    CargarBarra:function(){
      this.presupuestado=[];
      this.ejecutado = [];
      const params = {
        mes: this.mes,
        tipo_gobierno: this.nivel_gobierno,
        departamento: this.departamento,
        provincia: this.provincia,
        municipalidad: this.municipalidad,
        sector:this.sector,
        pliego:this.pliego,
        ejecutora:this.ejecutora

      } 

      axios.post(getApiURL() + '/CargarBarra',params).then(response => {
   
        for(var i=0; i< response.data.length; i++){
          this.presupuestado.push(response.data[i].monto_pim);
          this.ejecutado.push(response.data[i].monto_devengado);

        }
        this.CargarBarraAcumulado();
      });
    },

    CargarBarraAcumulado:function(){
      this.anios_grap=[];
      this.PIM=[];
      this.ejecutado_acum=[];
      this.tasa = [];
      const params = {
        mes: this.mes,
        tipo_gobierno: this.nivel_gobierno,
        departamento: this.departamento,
        provincia: this.provincia,
        municipalidad: this.municipalidad,
        sector:this.sector,
        pliego:this.pliego,
        ejecutora:this.ejecutora

      } 



      axios.post(getApiURL() + '/CargarBarraAcumulado',params).then(response => {
        swal.close();
        var labels=[];
        var montos = [];

        for(var i=0; i< response.data.length; i++){   
          this.anios_grap.push(response.data[i].ano_eje);
          this.PIM.push(response.data[i].monto_pim);
          this.ejecutado_acum.push(response.data[i].monto_devengado);
          this.tasa.push(response.data[i].tasa);

          var label_e = +response.data[i].tasa+"%";
          if(this.presupuestado[i]){
              labels.push({
                labels:["Presupuestado: ","Ejecutado: "],
                value:[this.presupuestado[i],this.ejecutado[i]]
              });        
          }


          labels.push({
              labels:["PIM: ", "Ejecutado: ", "Tasa de ejecución: "],
              value:[response.data[i].monto_pim, response.data[i].monto_devengado, response.data[i].tasa]
            });

          if(this.ejecutado[i]){
            montos.push(this.ejecutado[i]);
          }
          if(response.data[i].monto_devengado){
            montos.push(response.data[i].monto_devengado);
          }
        }
        console.log(montos);
        $("#mybarChart2").remove();
        $(".barchart").prepend("<canvas id='mybarChart2' width='400'></canvas>");

        GeneradorBarra("mybarChart2", montos, labels,this.anios_grap);

      });
    },

    //FUNCIONES=====================================================
    
  
    //FUNCIONES DE CONTROL========================================================
    Limpiar:function(){
      this.sectores='';
      this.pliegos='';
      this.ejecutoras='';
      this.sector='';
      this.pliego='';
      this.ejecutora='';

      this.departamentos='';
      this.provincias='';
      this.municipalidades='';
      this.departamento='';
      this.provincia='';
      this.municipalidad='';

      this.asignado='';
      this.tasa_ejec='';
      this.distribucion_gasto='';
    }
  },
  mounted(){
    var vue = this;
    vue.mes_val = $("#mes option:selected").text();
    $("#mes").on("change",function(){
      vue.fase= 1;
       vue.mes_val = $("#mes option:selected").text();
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
      vue.CargarBarra();

    });

    $(document).on("change","#municipalidad",function(){

        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
      vue.CargarBarra();
    });

    $(document).on("change","#ejecutora",function(){

        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
      vue.CargarBarra();
    });

    $(document).on('click', '#niv_gob_1', function() {
      if(vue.nivel_gobierno == 'E'){
        vue.nivel_gobierno = '';
        $('#niv_gob_1').removeClass('img-content').addClass('img-content-dis');
        $(".title-red").removeClass('title-red');
        vue.Limpiar();
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
        vue.CargarBarra();

      }else{
        vue.nivel_gobierno = 'E';
        $('.img-content').removeClass("img-content").addClass("img-content-dis");
        $('#niv_gob_1').removeClass('img-content-dis').addClass('img-content');

        $(".title-red").removeClass('title-red');
        $("#title_niv_gob_1").addClass('title-red');   
        vue.Limpiar();
        vue.CargarBarra();
        vue.CargarSector();
      }

    });

    $(document).on('click', '#niv_gob_2', function() {
      if(vue.nivel_gobierno == 'R'){

        vue.nivel_gobierno = '';
        $('#niv_gob_2').removeClass('img-content').addClass('img-content-dis');
        $(".title-red").removeClass('title-red');
        vue.Limpiar();
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
        vue.CargarBarra();
      }else{
        vue.nivel_gobierno = 'R';
        var sel_niv = $('.img-content').removeClass("img-content").addClass("img-content-dis");
        $('.img-content').removeClass('img-content').addClass('img-content-dis');
        $('#niv_gob_2').removeClass('img-content-dis').addClass('img-content');

        $(".title-red").removeClass('title-red');
        $("#title_niv_gob_2").addClass('title-red');

        vue.Limpiar();
        vue.CargarBarra();
        vue.CargarSector();
      }

    });

    $(document).on('click', '#niv_gob_3', function() {

      if(vue.nivel_gobierno == 'M'){

        vue.nivel_gobierno = '';
        $('#niv_gob_3').removeClass('img-content').addClass('img-content-dis');
        $(".title-red").removeClass('title-red');
        
        vue.Limpiar();
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });
        vue.CargarBarra();
      }else{
        vue.nivel_gobierno = 'M';

        $('.img-content').removeClass("img-content").addClass("img-content-dis");
        $('#niv_gob_3').removeClass('img-content-dis').addClass('img-content');


        $(".title-red").removeClass('title-red');
        $("#title_niv_gob_3").addClass('title-red');

        vue.Limpiar();
        vue.CargarBarra();
        vue.CargarDepartamento();
      }
      
    });


  }
});