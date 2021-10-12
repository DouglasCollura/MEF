
Vue.component('principal',
{
  template:`
  <div class="temp-chartDos">

    <div class="chartDosTop">

      <div class=" text-center grid grid-col-1x">
          <h3 class="titulo">Seguimiento de ejecución de gastos</h3>
        <div>
          <select v-model="anio" @change="CargarDepartamentoEjecutora" style="margin-left:2%">
            <option v-for="anio in anios"> {{anio.ano_eje}} </option>  
          </select>
        </div>
      </div> 

      <div class="separator"></div>
    </div> 

    <!-- ######### START CHART DOS LEFT ############ -->

    <div class="chartDosLeft grid grid-col-1x grid-col-1x-sm grid-col-1x-xs" v-if="fase != 0" >
        <div>
          <h4 class="titulo">Selecciona el nivel de gobierno a consultar</h4>
        </div>

        <div class="content-barra">
          <div id="niv_gob_1" class="img-left img-content-dis niv_gob_1"></div>

          <div id="niv_gob_2" class="img-center img-content-dis niv_gob_2" ></div>

          <div id="niv_gob_3" class="img-right img-content-dis niv_gob_3" ></div>

          <div class="line"></div>
        </div>

        <div style="width:100%" class="grid grid-col-3x-lg grid-col-3x grid-col-3x-sm grid-col-3x-xs">
          <div >
            <h4 id="title_niv_gob_1" style="cursor:pointer" class="text-left niv_gob_1">Gobierno Nacional</h4>
          </div>

          <div>
            <h4 id="title_niv_gob_2" style="cursor:pointer" class="text-center niv_gob_2" >Gobierno Regional</h4>
          </div>

          <div >
            <h4 class="text-right niv_gob_3" style="cursor:pointer" id="title_niv_gob_3" >Gobierno Local</h4>
          </div>

        </div>

        <div style="min-width: 100%" class="grid grid-col-1x text-left" v-if="nivel_gobierno == 'E' || nivel_gobierno == 'R' ">
          <label for="">Sector</label>
          <select v-model="sector" @change="CargarPliego">
            <option value="0">Seleccione un sector</option>  
            <option v-for="sector in sectores"> {{sector.sector_nombre}} </option>  
          </select>

          <label for="">Pliego</label>
          <select v-model="pliego" @change="CargarEjecutora">
            <option value="0">Seleccione un pliego</option>  
            <option v-for="pliego in pliegos"> {{pliego.pliego_nombre}} </option>  
          </select>

          <label for="">Ejecutora</label>
          <select v-model="ejecutora" @change="SelectEjecutora">
          
            <option value="0">Seleccione una ejecutora</option>  
            <option v-for="ejecutora in ejecutoras"> {{ejecutora.ejecutora_nombre}} </option>  
          </select>
        </div>

        <div  style="min-width: 100%" class="grid grid-col-1x text-left "  v-if="nivel_gobierno == 'M' ">
          <label for="">Departamento</label>
          <select v-model="departamento" @change="CargarProvincia">
            <option value="0" >Seleccione un departamento</option>
            <option v-for="departamento in departamentos"> {{departamento.departamento_ejecutora_nombre}} </option>  
          </select>             

          <label for="">Provincia</label>
          <select v-model="provincia" @change="CargarMunicipalidad">
            <option value="0" >Seleccione una provincia</option>
            <option v-for="provincia in provincias"> {{provincia.provincia_ejecutora_nombre}} </option>  
          </select>
          <label for="">Municipalidad</label>
          <select v-model="municipalidad" id="municipalidad" @change="SelectMunicipalidad">
            <option value="0">Seleccione una municipalidad</option>
            <option v-for="municipalidad in municipalidades"> {{municipalidad.distrito_ejecutora_nombre}} </option>  
          </select>
        </div>

    </div> 

    <!-- ######### END CHART DOS LEFT ############ -->


    <!-- ######### START CHART DOS RIGHT ############ -->

    <div class="chartDosTopRight justify-items-start align-self-start grid grid-col-1x" v-if="fase != 0">

        <div>
          <h4 class="titulo">¿Dónde se gastó?</h4>
        </div>

        <div>
          <select v-model="departamento_ejec" id="select_depat_ejec" style="margin-left:40px">
            <option value="0">Seleccione un Departamento</option>
            <option v-for="departamento_ejec in departamentos_ejec"> {{departamento_ejec.departamento_meta_nombre}} </option>  
          </select>
        </div>

        <div>
          <h4 class="titulo">¿Cuánto hay de presupuesto disponible?</h4>
        </div>

        <div>
          <div class="card-vista2" style="max-height: 70px" >
            <span class="card-number" style="font-weight: 800; font-size: 14px">S/ {{pim}} </span>
          </div>
        </div>


        <div>
          <h4 class="titulo">¿Cuánto se gastó?</h4>
        </div>

        <div>
          <div class="card-vista2" style="max-height: 70px" @mouseover="MostrarModal1(avance, monto_pim, 'a')" @mouseout="MostrarModal1(0, 0, 'none')"  >
            <span class="card-number" style="font-weight: 800; font-size: 14px">S/ {{totales}} </span>
          </div>
          <div class="seguir1" style="display:none" >
            <label>Avance: </label> <h5 style="display: inline-block" > {{modal_porcentaje}} </h5>
          </div>
        </div>

    </div>

    <!-- ######### END CHART DOS RIGHT ############ -->

    <!-- ######### START CHART DOS MIDDLE ############ -->

    <div class="chartDosMiddle" v-if="fase != 0">

        <div class="grid grid-col-1x text-center" >
          <div>
           <h3 class="titulo">¿Para qué se gastó?</h3>
           <h4 >Selecciona una opción</h4>

          </div> 
        </div> 

        <div class="grid grid-col-3x-lg grid-col-3x grid-col-2x-sm grid-col-1x-xs">

          <div class="select-pliegue1" @mouseover="MostrarModal( funcion.funcion_nombre ,funcion.porcentaje, funcion.pim, funcion.devengado, 'a')" @mouseout="MostrarModal('', '' , 0, 0, 'none')" @click="CargarEstadisticas(funcion)" v-for="funcion in funciones">
            <h5> {{funcion.funcion_nombre}} </h5>
            <div style="width: 250px;" id="cont_barra">
              <div class="barra" :data-bar_percent="funcion.porcentaje" style="max-width: 150px;"></div>

              <span class="porcentaje">{{funcion.porcentaje}}%</span>
            </div>   

             
          </div>


        </div> 
          <div class="seguir" style="display:none" >
            <label>PIM: </label> <h5 style="display: inline-block" > S/.{{modal_pim}} </h5> <br>
            <label>Gastado: </label> <h5 style="display: inline-block" > S/.{{modal_devengado}} </h5>
          </div> 
    </div>

    <!-- ######### END CHART DOS MIDDLE ############ -->

    <!-- ######### START CHART DOS BOTTOM ############ -->

    <div class="chartDosBottom" v-if="fase == 3">

      <div style="margin: 20px 0px">
          <h2 class="titulo text-center">Distribución del gasto en {{funcion}}</h2>
        </div>

          
        <div class="grid grid-col-3x-lg grid-col-2x grid-col-2x-sm grid-col-1x-xs"  style="max-width:1200px" >

            <div class="grid grid-col-2x-lg grid-col-2x grid-col-2x-sm grid-col-2x-xs card-chart-center"  v-for="distribucion in distribucion_gasto">
              <div class="justify-self-start align-self-center">
                <h5>{{distribucion.generica_nombre}}</h5>
                <h4>S/ {{distribucion.sum_devengado}} </h4>
              </div>
              <div style="padding:0px; margin:10px;" class=" grid text-right justify-self-end">
                  <div class="chart" :data-percent="distribucion.percent">
                    <span class="percent">{{distribucion.percent}}</span>
                  </div>
                
              </div>  
            </div>

        </div>

      </div>

    </div>
    <!-- ######### END CHART DOS BOTTOM ############ -->

  </div>
  `,
  created(){
    this.CargarAnios();
  },
  data() {
    return {

    	//CARGA DE DATOS
      anios:'',
      
      departamentos_ejec:'',

      pim:'',

      sectores:'',
      pliegos:'',
      ejecutoras:'',


      departamentos:'',
      provincias:'',
      municipalidades:'',


      funciones:'',
      totales:'',
      monto_pim:'',
      avance:'',

    	//GESTION DE DATOS
      anio:'0',

      departamento_ejec:'0',

      sector:'0',
      pliego:'0',
      ejecutora:'0',

      departamento:'',
      provincia:'',
      municipalidad:'',
      funcion:'',
      asignado:'',
      tasa_ejec:'',
      distribucion_gasto:'',
      porcentaje_presupuesto:'',
    	//VARIABLES DE CONTROL
      nivel_gobierno:'',
      fase: 0,
      modal_nombre:'',
      modal_porcentaje:'',
      modal_pim:'',
      modal_devengado:''
    }
  },
  methods:{
    //CARGA DE DATOS================================================
    CargarAnios:function(){
      this.Limpiar();

      Swal.fire({
        title:'Cargando Datos...',
        allowOutsideClick: false,
        width: 400,
        onOpen: () => {
          Swal.showLoading() 
        },
      });

      axios.get(getApiURL() + '/GetAnios').then(response => {
        swal.close();
        this.anios = response.data;
        this.anio=response.data[response.data.length-1].ano_eje;
        this.fase= 1;
        this.Limpiar();
        this.CargarDepartamentoEjecutora();
      });
    },

    CargarDepartamentoEjecutora:function(){
      if(this.anio == 'Año'){
        this.fase = 0;
      }else{
        this.fase = 1;
        this.departamentos_ejec = '';
        const params = {
          anio:this.anio,
          departamento_ejec:this.departamento_ejec,
          departamento:this.departamento,
          tipo_gobierno:this.nivel_gobierno,
          sector:this.sector,
          pliego:this.pliego,
          ejecutora:this.ejecutora,
          provincia:this.provincia,
          municipalidad:this.municipalidad
        }

        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });

        axios.post(getApiURL() + '/CargarDepartamentoEjecutora',params).then(response => {
          swal.close();
          this.departamentos_ejec = response.data;
          this.CargarBarraGastos();

        });

      }
    },

    CargarSector:function(){
      if(this.anio == 'Año'){
        this.fase = 0;
      }else{
        this.fase = 1;
        this.sectores = '';
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
      this.pliego="0";
      this.pliegos = '';
      this.ejecutora="";

      if(this.sector == 0){
        this.CargarDepartamentoEjecutora();
        this.CargarSector();
        return;
      }

      const params = {
        anio: this.anio,
        tipo_gobierno: this.nivel_gobierno,
        sector: this.sector,
        departamento_ejec: this.departamento_ejec

      }
      Swal.fire({
        title:'Cargando Datos...',
        allowOutsideClick: false,
        width: 400,
        onOpen: () => {
          Swal.showLoading() 
        },
      });


      axios.post(getApiURL() + '/CargarPliego',params).then(response => {
        this.CargarDepartamentoEjecutora();
        this.pliegos = response.data;
      });
    },

    CargarEjecutora:function(){
      this.ejecutora="0";
      this.ejecutoras = ''; 

      if(this.pliego == 0){
        this.CargarPliego();
        return;
      }

      const params = {
        anio: this.anio,
        tipo_gobierno: this.nivel_gobierno,
        pliego: this.pliego,
        departamento_ejec: this.departamento_ejec
      }
      Swal.fire({
        title:'Cargando Datos...',
        allowOutsideClick: false,
        width: 400,
        onOpen: () => {
          Swal.showLoading() 
        },
      });

      axios.post(getApiURL() + '/CargarEjecutora',params).then(response => {
        this.CargarDepartamentoEjecutora();

        this.ejecutoras = response.data;
      });
    },

    CargarDepartamento:async function(){
      if(this.anio == 'Año'){
        this.fase = 0;
      }else{
        this.fase = 1;
        this.departamentos='';
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
        await axios.post(getApiURL() + '/CargarDepartamento',params).then(response => {
          this.departamentos = response.data;
        });
        

      }

    },

    CargarProvincia:function(){
      this.provincia ="0";
      this.municipalidad="";

      this.provincias='';
        if(this.departamento == 0){
          this.CargarDepartamentoEjecutora();
          this.CargarDepartamento();
          return;
        }

      const params = {
        anio: this.anio,
        tipo_gobierno: this.nivel_gobierno,
        departamento: this.departamento,
        departamento_ejec: this.departamento_ejec

      }
      Swal.fire({
        title:'Cargando Datos...',
        allowOutsideClick: false,
        width: 400,
        onOpen: () => {
          Swal.showLoading() 
        },
      });

      axios.post(getApiURL() + '/CargarProvincia',params).then(response => {
        this.CargarDepartamentoEjecutora();
        this.provincias = response.data;
      });
    },

    CargarMunicipalidad:function(){
      this.municipalidad="0";
      this.municipalidades = '';

      if(this.provincia == 0){
        this.CargarProvincia();
        return;
      }

      const params = {
        anio: this.anio,
        tipo_gobierno: this.nivel_gobierno,
        departamento: this.departamento,
        provincia: this.provincia,
        departamento_ejec: this.departamento_ejec
      }
        Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });


      axios.post(getApiURL() + '/CargarMunicipalidad',params).then(response => {
        this.CargarDepartamentoEjecutora();
        this.municipalidades = response.data;
      });
    },

    CargarBarraGastos:function(){
      this.funciones="";
      this.totales="";
      
      const params = {
        anio:this.anio,
        departamento_ejec:this.departamento_ejec,
        departamento:this.departamento,
        tipo_gobierno:this.nivel_gobierno,
        sector:this.sector,
        pliego:this.pliego,
        ejecutora:this.ejecutora,
        provincia:this.provincia,
        municipalidad:this.municipalidad
      }

      Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
      });
      axios.post(getApiURL() + '/CargarBarraGastos',params).then(response => {
        swal.close();
        swal.close();
        this.funciones = response.data['funciones'];
        this.totales = this.Decimales(response.data['totales'][0].total);
        this.monto_pim = this.Decimales(response.data['totales'][0].monto_pim);
        this.pim = this.Decimales(response.data['totales'][0].monto_pim);
        this.avance = this.Decimales(response.data['totales'][0].avance);

        $(document).ready(function() {

          var bar=$("*[data-bar_percent]");
          $(bar).each(function(){
            $(this).css("width",$(this).data('bar_percent')+'%');

          });
        });
      });
    },

    CargarEstadisticas: function(funcion){
      this.funcion = funcion.funcion_nombre;
      this.distribucion_gasto="";
      this.tasa_ejec="";
      this.asignado="";
      this.porcentaje_presupuesto="";
      const params={
        anio: this.anio,
        funcion: funcion.funcion_nombre,
        departamento_ejec:this.departamento_ejec,
        departamento:this.departamento,
        tipo_gobierno:this.nivel_gobierno,
        sector:this.sector,
        pliego:this.pliego,
        ejecutora:this.ejecutora,
        provincia:this.provincia,
        municipalidad:this.municipalidad
      }
      Swal.fire({
          title:'Cargando Datos...',
          allowOutsideClick: false,
          width: 400,
          onOpen: () => {
            Swal.showLoading() 
          },
        });

      axios.post(getApiURL() + '/CargarEstadisticas',params).then(response => {
        swal.close();
        this.distribucion_gasto = response.data.distribucion_gasto;

        for (var i = 0; i < this.distribucion_gasto.length; i++) {
         this.distribucion_gasto[i].sum_devengado = this.Decimales(this.distribucion_gasto[i].sum_devengado);
        }
        this.tasa_ejec = response.data.tasa_ejecucion[0].percent;
        this.asignado = this.Decimales(response.data.presupuesto[0].asignado);
        this.porcentaje_presupuesto = response.data.porcentaje_presupuesto[0].percent;
        if(this.porcentaje_presupuesto.indexOf(".") == 0){
          this.porcentaje_presupuesto = "0"+this.porcentaje_presupuesto;
        }
        $(document).ready(function() {

          var chars = document.querySelectorAll('.chart');
          chars.forEach(element => {
                EasyPieChart(element, {
                easing: 'easeOutElastic',
                delay: 500,
                barColor: '#F4BB47',
                trackColor: '#E2E4E7',
                scaleColor: false,
                lineWidth:20,
                trackWidth: 20,
                lineCap: 'butt'
                  });
          });
        });

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
      this.municipalidade='';

      this.asignado='';
      this.tasa_ejec='';
      this.distribucion_gasto='';
    },
    SelectEjecutora:function(){
      if(this.ejecutora == 0){
        this.CargarEjecutora();
      }else{
        this.CargarDepartamentoEjecutora();
      }
    },
    SelectMunicipalidad:function(){
      if(this.municipalidad == 0){
        this.CargarMunicipalidad();
      }else{
        this.CargarDepartamentoEjecutora();
      }
    },
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
      if(restante == ''){
        restante = '.00';
      }
      SubString = SubString+restante;
      return SubString;
    },
    MostrarModal:function(nombre, porcentaje, pim, devengado, display){
      if(display == 'a'){
        $(".seguir").css("display","");
        this.modal_nombre = nombre;
        this.modal_porcentaje = porcentaje+"%";
        this.modal_pim = this.Decimales(pim);
        this.modal_devengado = this.Decimales(devengado);
        $(".seguir").css("top",parseInt(window.event.pageY -10) + "px");
        $(".seguir").css("left",parseInt(window.event.pageX + 10) + "px");
      }else{
       $(".seguir").css("display",display);

      }
    },
    MostrarModal1:function(porcentaje, pim, display){
      if(display == 'a'){
        $(".seguir1").css("display","");
        this.modal_porcentaje = porcentaje+"%";
        $(".seguir1").css("top",parseInt(window.event.pageY -10) + "px");
        $(".seguir1").css("left",parseInt(window.event.pageX + 10) + "px");
      }else{
       $(".seguir1").css("display",display);

      }
    }
  },
  mounted(){

    var vue = this;
    $(document).on('click', '.select-pliegue1', function(e) {
      vue.fase = 3;
      $(document).find(".select-pliegue1-select").removeClass("select-pliegue1-select");
      $(document).find(".barra-select").removeClass("barra-select");
      $(this).addClass("select-pliegue1-select");
      $(this).find(".barra").addClass("barra-select");
    });

    $(document).on('change', '#select_depat_ejec', function() {
      vue.fase=2;
      $(document).find(".select-pliegue1-select").removeClass("select-pliegue1-select");
      $(document).find(".barra-select").removeClass("barra-select");
        vue.CargarBarraGastos();
    });

    $(document).on('click', '.niv_gob_1', function() {
    
      if(vue.nivel_gobierno == 'E'){
        vue.nivel_gobierno = '';
        $('#niv_gob_1').removeClass('img-content').addClass('img-content-dis');
        $(".title-red").removeClass('title-red');
        vue.Limpiar();
        vue.CargarDepartamentoEjecutora();
      }else{
        vue.nivel_gobierno = 'E';
        $('.img-content').removeClass("img-content").addClass("img-content-dis");
        $('#niv_gob_1').removeClass('img-content-dis').addClass('img-content');

        $(".title-red").removeClass('title-red');
        $("#title_niv_gob_1").addClass('title-red');
        vue.fase=2;
        $(document).find(".select-pliegue1-select").removeClass("select-pliegue1-select");
        $(document).find(".barra-select").removeClass("barra-select");
        vue.Limpiar();
        
        vue.CargarDepartamentoEjecutora();
        vue.CargarSector();
      }


    });

    $(document).on('click', '.niv_gob_2', function() {
      if(vue.nivel_gobierno == 'R'){
        vue.nivel_gobierno = '';
        $('#niv_gob_2').removeClass('img-content').addClass('img-content-dis');
        $(".title-red").removeClass('title-red');
        vue.Limpiar();
        vue.CargarDepartamentoEjecutora();
      }else{

        vue.nivel_gobierno = 'R';
        var sel_niv = $('.img-content').removeClass("img-content").addClass("img-content-dis");
        $('.img-content').removeClass('img-content').addClass('img-content-dis');
        $('#niv_gob_2').removeClass('img-content-dis').addClass('img-content');

        $(".title-red").removeClass('title-red');
        $("#title_niv_gob_2").addClass('title-red');
        vue.fase=2;
        $(document).find(".select-pliegue1-select").removeClass("select-pliegue1-select");
        $(document).find(".barra-select").removeClass("barra-select");
        vue.Limpiar();
        vue.CargarDepartamentoEjecutora();
        vue.CargarSector();
      }

    });

    $(document).on('click', '.niv_gob_3', async function() {

      if(vue.nivel_gobierno == 'M'){  
        vue.nivel_gobierno = '';
        $('#niv_gob_3').removeClass('img-content').addClass('img-content-dis');
        $(".title-red").removeClass('title-red');
        vue.Limpiar();
        vue.CargarDepartamentoEjecutora();

      }else{

        vue.nivel_gobierno = 'M';

        $('.img-content').removeClass("img-content").addClass("img-content-dis");
        $('#niv_gob_3').removeClass('img-content-dis').addClass('img-content');


        $(".title-red").removeClass('title-red');
        $("#title_niv_gob_3").addClass('title-red');
        vue.fase=2;
        $(document).find(".select-pliegue1-select").removeClass("select-pliegue1-select");
        $(document).find(".barra-select").removeClass("barra-select");
        vue.Limpiar();
        await vue.CargarDepartamento();
        await vue.CargarDepartamentoEjecutora();

      }

    });

  } 
});