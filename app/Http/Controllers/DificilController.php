<?php

namespace App\Http\Controllers;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data as Data;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DB;

class DificilController extends Controller
{
   use ApiController;

  public function GetAnios(){

    $datos = DB::select("SELECT DISTINCT(ANO_EJE) ANO_EJE FROM UGI_AFSP.ptaf_dgpp_gasto_general order by ANO_EJE ASC");
    return $this->sendResponse($datos);

  }

  public function CargarDepartamentoEjecutora(Request $request){
    $datos = request();

    $sql = "";

    if(!empty($datos->tipo_gobierno)){
      $sql = $sql." AND TIPO_GOBIERNO = '".$datos->tipo_gobierno."'";
    }

    if(!empty($datos->departamento) ){
      $sql = $sql." AND DEPARTAMENTO_EJECUTORA_NOMBRE = '".$datos->departamento."'";
    }
    if(!empty($datos->provincias)){
      $sql = $sql." AND PROVINCIA_EJECUTORA_NOMBRE= '".$datos->provincia."'";

    }
    if(!empty($datos->municipalidad)){
      $sql = $sql." AND DISTRITO_EJECUTORA_NOMBRE= '".$datos->municipalidad."'";
    }  

    if(!empty($datos->sector)){
      $sql = $sql." AND SECTOR_NOMBRE= '".$datos->sector."'";
    }
    if(!empty($datos->pliego)){
      $sql = $sql." AND PLIEGO_NOMBRE= '".$datos->pliego."'";
    }
    if(!empty($datos->ejecutora)){
      $sql = $sql." AND EJECUTORA_NOMBRE= '".$datos->ejecutora."'";
    }


    $departamentos = DB::select("SELECT DISTINCT DEPARTAMENTO_META_NOMBRE, DEPARTAMENTO_META FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE ANO_EJE=".$datos->anio." ".$sql." order by DEPARTAMENTO_META ASC");
    return $this->sendResponse($departamentos);

  }

   public function CargarSector(Request $request){
    $datos = request();

    $sql = '';
    if( $datos->departamento_ejec !='0'  && isset($datos->departamento_ejec)){
      $sql = $sql." AND DEPARTAMENTO_META_NOMBRE='".$datos->departamento_ejec."' ";
    }
    if(!empty($datos->anio)){
      $sql = $sql." AND ANO_EJE='".$datos->anio."' ";
    }

    $consulta = DB::select("SELECT DISTINCT(SECTOR_NOMBRE) FROM UGI_AFSP.ptaf_dgpp_gasto_general
      WHERE tipo_gobierno='".$datos->tipo_gobierno."' ".$sql." order by SECTOR_NOMBRE ASC"); 

    return $this->sendResponse($consulta);

   }

   public function CargarPliego(Request $request){
    $datos = request();

    $sql = '';
    if(!empty($datos->anio)){
      $sql =$sql." AND ANO_EJE='".$datos->anio."' ";
    }
    if($datos->departamento_ejec !='0' && isset($datos->departamento_ejec)){
      $sql =$sql." AND DEPARTAMENTO_META_NOMBRE='".$datos->departamento_ejec."' ";
    }

    $consulta = DB::select("SELECT DISTINCT(PLIEGO_NOMBRE) FROM UGI_AFSP.ptaf_dgpp_gasto_general
                            WHERE tipo_gobierno='".$datos->tipo_gobierno."' AND SECTOR_NOMBRE='".$datos->sector."' ".$sql."");
    
    return $this->sendResponse($consulta);
   }

   public function CargarEjecutora(Request $request){
    $datos = request();

    $sql = '';
    if(!empty($datos->anio)){
      $sql =$sql." AND ANO_EJE='".$datos->anio."' ";
    }
    if($datos->departamento_ejec !='0' && isset($datos->departamento_ejec)){
      $sql =$sql." AND DEPARTAMENTO_META_NOMBRE='".$datos->departamento_ejec."' ";
    }

    $consulta = DB::select("SELECT DISTINCT(EJECUTORA_NOMBRE) FROM UGI_AFSP.ptaf_dgpp_gasto_general
                    WHERE tipo_gobierno='".$datos->tipo_gobierno."' 
                    AND PLIEGO_NOMBRE='".$datos->pliego."'");
    
    return $this->sendResponse($consulta);
   }

  public function CargarDepartamento(Request $request){
    $datos = request();

    $sql = '';
    if($datos->departamento_ejec !='0' && isset($datos->departamento_ejec)){
      $sql =$sql." AND DEPARTAMENTO_META_NOMBRE='".$datos->departamento_ejec."' ";
    }
    if(!empty($datos->anio)){
      $sql = $sql." AND ANO_EJE='".$datos->anio."' ";
    }

    $consulta = DB::select("SELECT DISTINCT(DEPARTAMENTO_EJECUTORA_NOMBRE) FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE TIPO_GOBIERNO='".$datos->tipo_gobierno."' ".$sql);
    
    return $this->sendResponse($consulta);
  }
 
  public function CargarProvincia(Request $request){
    $datos = request();

    $sql="";

    if(!empty($datos->anio)){
      $sql = $sql." AND ANO_EJE='".$datos->anio."' ";
    }
    if($datos->departamento_ejec !='0' && isset($datos->departamento_ejec)){
      $sql =$sql." AND DEPARTAMENTO_META_NOMBRE='".$datos->departamento_ejec."' ";
    }

    $consulta = DB::select("SELECT DISTINCT PROVINCIA_EJECUTORA_NOMBRE FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE  TIPO_GOBIERNO='".$datos->tipo_gobierno."' AND DEPARTAMENTO_EJECUTORA_NOMBRE ='".$datos->departamento."' ".$sql);
    
    return $this->sendResponse($consulta);
  }   

  public function CargarMunicipalidad(Request $request){
    $datos = request();
    
    $sql="";

    if(!empty($datos->anio)){
      $sql = $sql." AND ANO_EJE='".$datos->anio."' ";
    }
    if($datos->departamento_ejec !='0' && isset($datos->departamento_ejec)){
      $sql =$sql." AND DEPARTAMENTO_META_NOMBRE='".$datos->departamento_ejec."' ";
    }

    $consulta = DB::select("SELECT DISTINCT DISTRITO_EJECUTORA_NOMBRE FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE  TIPO_GOBIERNO='".$datos->tipo_gobierno."' AND DEPARTAMENTO_EJECUTORA_NOMBRE ='".$datos->departamento."' AND PROVINCIA_EJECUTORA_NOMBRE ='".$datos->provincia."' ".$sql);
    
    return $this->sendResponse($consulta);
  }   

  public function CargarBarraGastos(Request $request){
    
    $datos = request();

    $sql = '';
    if(!empty($datos->tipo_gobierno)){
      $sql = $sql." AND TIPO_GOBIERNO = '".$datos->tipo_gobierno."'";
    }
    if(!empty($datos->departamento) ){
      $sql = $sql." AND DEPARTAMENTO_EJECUTORA_NOMBRE = '".$datos->departamento."'";

    }else if($datos->departamento_ejec != '0' ){

      $sql = $sql." AND DEPARTAMENTO_META_NOMBRE = '".$datos->departamento_ejec."'";
    }
    if(!empty($datos->provincias)){
      $sql = $sql." AND PROVINCIA_EJECUTORA_NOMBRE= '".$datos->provincia."'";

    }
    if(!empty($datos->municipalidad)){
      $sql = $sql." AND DISTRITO_EJECUTORA_NOMBRE= '".$datos->municipalidad."'";
    }  

    if(!empty($datos->sector)){
      $sql = $sql." AND SECTOR_NOMBRE= '".$datos->sector."'";
    }
    if(!empty($datos->pliego)){
      $sql = $sql." AND PLIEGO_NOMBRE= '".$datos->pliego."'";
    }
    if(!empty($datos->ejecutora)){
      $sql = $sql." AND EJECUTORA_NOMBRE= '".$datos->ejecutora."'";
    }


      $funciones = DB::select("SELECT FUNCION_NOMBRE, 
        CASE WHEN MONTO_DEVENGADO IS NULL OR MONTO_DEVENGADO =0 THEN 0 ELSE MONTO_DEVENGADO END DEVENGADO,
        CASE WHEN MONTO_PIM IS NULL OR MONTO_PIM =0 THEN 0 ELSE MONTO_PIM END PIM, 
        CASE WHEN MONTO_PIM IS NULL OR MONTO_PIM =0 THEN 0 ELSE ROUND((MONTO_DEVENGADO/MONTO_PIM)*100,2) END PORCENTAJE 
        FROM 
        (SELECT FUNCION_NOMBRE, SUM(MONTO_PIM) MONTO_PIM, SUM(MONTO_DEVENGADO) MONTO_DEVENGADO FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL WHERE ANO_EJE=".$datos->anio." ".$sql."  GROUP BY FUNCION_NOMBRE)
        ORDER BY PORCENTAJE DESC");

      $totales = DB::select("SELECT SUM(MONTO_DEVENGADO) TOTAL,SUM(MONTO_PIM) MONTO_PIM, ROUND((SUM(MONTO_DEVENGADO)*100)/SUM(MONTO_PIM),2) AVANCE FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE ANO_EJE = ".$datos->anio." ".$sql);
    
    $arr= array(
      'funciones'=>$funciones,
      'totales'=>$totales
    );
    return $this->sendResponse($arr);
  }  


  public function CargarEstadisticas(Request $request){
   
    $datos = request();
    $sql = "";

    if(!empty($datos->tipo_gobierno)){
      $sql = $sql." AND TIPO_GOBIERNO = '".$datos->tipo_gobierno."'";
    }

    if(!empty($datos->departamento) ){
      $sql = $sql." AND DEPARTAMENTO_EJECUTORA_NOMBRE = '".$datos->departamento."'";

    }else if($datos->departamento_ejec != '0' ){

      $sql = $sql." AND DEPARTAMENTO_META_NOMBRE = '".$datos->departamento_ejec."'";
    }

    if(!empty($datos->provincias)){
      $sql = $sql." AND PROVINCIA_EJECUTORA_NOMBRE= '".$datos->provincia."'";

    }
    if(!empty($datos->municipalidad)){
      $sql = $sql." AND DISTRITO_EJECUTORA_NOMBRE= '".$datos->municipalidad."'";
    }  

    if(!empty($datos->sector)){
      $sql = $sql." AND SECTOR_NOMBRE= '".$datos->sector."'";
    }
    if(!empty($datos->pliego)){
      $sql = $sql." AND PLIEGO_NOMBRE= '".$datos->pliego."'";
    }
    if(!empty($datos->ejecutora)){
      $sql = $sql." AND EJECUTORA_NOMBRE= '".$datos->ejecutora."'";
    }

    $presupuesto =  DB::select("SELECT SUM(MONTO_PIM) ASIGNADO FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL WHERE ANO_EJE=".$datos->anio." AND FUNCION_NOMBRE='".$datos->funcion."'".$sql);
    
    $tasa_ejecucion = DB::select("SELECT ROUND((SUM_DEVENGADO/SUM_PIM)*100,2) PERCENT FROM (SELECT SUM(MONTO_PIM) SUM_PIM,SUM(MONTO_DEVENGADO) SUM_DEVENGADO FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL WHERE ANO_EJE=".$datos->anio." AND FUNCION_NOMBRE='".$datos->funcion."' ".$sql.")");

    $distribucion_gasto = DB::select("SELECT GENERICA_NOMBRE,SUM_DEVENGADO,SUM_PIM,CASE WHEN SUM_PIM =0 THEN 0 ELSE ROUND((SUM_DEVENGADO/SUM_PIM)*100,2) END PERCENT   FROM
      (SELECT GENERICA_NOMBRE,SUM(MONTO_PIM) SUM_PIM,SUM(MONTO_DEVENGADO) SUM_DEVENGADO FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE ANO_EJE=".$datos->anio." AND FUNCION_NOMBRE='".$datos->funcion."' ".$sql." 
      GROUP BY GENERICA_NOMBRE)
      ORDER BY PERCENT DESC");

    $porcentaje_presupuesto = DB::select("SELECT ROUND((A.SUM_PIM/B.PIM)*100,2) PERCENT FROM
      (SELECT ANO_EJE,SUM(MONTO_PIM) SUM_PIM FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE ANO_EJE =".$datos->anio." AND FUNCION_NOMBRE='".$datos->funcion."' ".$sql." 
      GROUP BY ANO_EJE) A
      LEFT JOIN
      (SELECT ANO_EJE,SUM(MONTO_PIM) PIM FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE ANO_EJE =".$datos->anio." ".$sql." 
      GROUP BY ANO_EJE) B
      ON A.ANO_EJE=B.ANO_EJE");
      
    $arr= array(
      'presupuesto'=>$presupuesto,
      'tasa_ejecucion'=>$tasa_ejecucion,
      'distribucion_gasto'=>$distribucion_gasto,
      'porcentaje_presupuesto'=>$porcentaje_presupuesto

    );
    
    return $this->sendResponse($arr);

  }

  public function CargarBarra(Request $request){
    $datos = request();
    $sql='';
    if(!empty($datos->tipo_gobierno)){
      $sql =$sql." AND tipo_gobierno='".$datos->tipo_gobierno."' "; 
    }

    if(!empty($datos->departamento)){
      $sql = $sql." AND DEPARTAMENTO_EJECUTORA_NOMBRE = '".$datos->departamento."'";

    }
    if(!empty($datos->provincias)){
      $sql = $sql." AND PROVINCIA_EJECUTORA_NOMBRE= '".$datos->provincia."'";

    }
    if(!empty($datos->municipalidad)){
      $sql = $sql." AND DISTRITO_EJECUTORA_NOMBRE= '".$datos->municipalidad."'";
    }  
    if(!empty($datos->sector)){
      $sql = $sql." AND SECTOR_NOMBRE= '".$datos->sector."'";
    }
    if(!empty($datos->pliego)){
      $sql = $sql." AND PLIEGO_NOMBRE= '".$datos->pliego."'";
    }
    if(!empty($datos->ejecutora)){
      $sql = $sql." AND EJECUTORA_NOMBRE= '".$datos->ejecutora."'";
    }
    
    $consulta = DB::select("SELECT A.ANO_EJE,CASE WHEN B.MONTO_PIA IS NULL THEN 0 ELSE B.MONTO_PIA END MONTO_PIA,
      CASE WHEN B.MONTO_PIM IS NULL THEN 0 ELSE B.MONTO_PIM END MONTO_PIM,
      CASE WHEN A.MONTO_DEVENGADO IS NULL THEN 0 ELSE A.MONTO_DEVENGADO END MONTO_DEVENGADO FROM 
      (SELECT ANO_EJE,SUM(MONTO_DEVENGADO) MONTO_DEVENGADO FROM UGI_AFSP.ptaf_dgpp_gasto_general A
      WHERE MES_EJE=".$datos->mes." ".$sql." 
        AND ANO_EJE >=EXTRACT(YEAR FROM SYSDATE)-5
      GROUP BY ANO_EJE) A
      LEFT JOIN 
      (SELECT ANO_EJE,SUM(MONTO_PIA) MONTO_PIA,SUM(MONTO_PIM) MONTO_PIM FROM UGI_AFSP.ptaf_dgpp_gasto_general
      WHERE  ANO_EJE >=EXTRACT(YEAR FROM SYSDATE)-5  ".$sql." AND (MES_EJE IS NULL OR MES_EJE = 0)
      GROUP BY ANO_EJE) B
      ON A.ANO_EJE=B.ANO_EJE
      ORDER BY A.ANO_EJE");

    return $this->sendResponse($consulta);


  }

  public function CargarBarraAcumulado(Request $request){
    $datos = request();
    
    $sql='';
    if(!empty($datos->tipo_gobierno)){
      $sql =$sql." AND tipo_gobierno='".$datos->tipo_gobierno."' "; 
    }

    if(!empty($datos->departamento)){
      $sql = $sql." AND DEPARTAMENTO_EJECUTORA_NOMBRE = '".$datos->departamento."'";

    }
    if(!empty($datos->provincias)){
      $sql = $sql." AND PROVINCIA_EJECUTORA_NOMBRE= '".$datos->provincia."'";

    }
    if(!empty($datos->municipalidad)){
      $sql = $sql." AND DISTRITO_EJECUTORA_NOMBRE= '".$datos->municipalidad."'";
    }  
    if(!empty($datos->sector)){
      $sql = $sql." AND SECTOR_NOMBRE= '".$datos->sector."'";
    }
    if(!empty($datos->pliego)){
      $sql = $sql." AND PLIEGO_NOMBRE= '".$datos->pliego."'";
    }
    if(!empty($datos->ejecutora)){
      $sql = $sql." AND EJECUTORA_NOMBRE= '".$datos->ejecutora."'";
    } 

    $consulta = DB::select("SELECT A.ANO_EJE,CASE WHEN B.MONTO_PIA IS NULL THEN 0 ELSE B.MONTO_PIA END MONTO_PIA,
      CASE WHEN B.MONTO_PIM IS NULL THEN 0 ELSE B.MONTO_PIM END MONTO_PIM,
      CASE WHEN A.MONTO_DEVENGADO IS NULL THEN 0 ELSE A.MONTO_DEVENGADO END MONTO_DEVENGADO,
      CASE WHEN B.MONTO_PIM IS NULL OR B.MONTO_PIM =0 THEN 0 ELSE ROUND((A.MONTO_DEVENGADO/B.MONTO_PIM)*100,2) END TASA FROM 
      (SELECT ANO_EJE,SUM(MONTO_DEVENGADO) MONTO_DEVENGADO FROM UGI_AFSP.ptaf_dgpp_gasto_general A
      WHERE (MES_EJE >=1 AND MES_EJE <=".$datos->mes.") ".$sql." AND ANO_EJE >=EXTRACT(YEAR FROM SYSDATE)-5
      GROUP BY ANO_EJE) A
      LEFT JOIN 
      (SELECT ANO_EJE,SUM(MONTO_PIA) MONTO_PIA,SUM(MONTO_PIM) MONTO_PIM FROM UGI_AFSP.ptaf_dgpp_gasto_general
      WHERE  ANO_EJE >=EXTRACT(YEAR FROM SYSDATE)-5 ".$sql." AND (MES_EJE IS NULL OR MES_EJE =0)
      GROUP BY ANO_EJE) B
      ON A.ANO_EJE=B.ANO_EJE
      ORDER BY A.ANO_EJE");

    return $this->sendResponse($consulta);

  }
  //AND SECTOR_NOMBRE='PRODUCCION'AND PLIEGO_NOMBRE='MINISTERIO DE LA PRODUCCION' AND EJECUTORA_NOMBRE='MINISTERIO DE LA PRODUCCION'
  //TIPO_GOBIERNO ='E' AND SECTOR_NOMBRE='PRODUCCION' AND PLIEGO_NOMBRE='MINISTERIO DE LA PRODUCCION' AND EJECUTORA_NOMBRE='MINISTERIO DE LA PRODUCCION'


  /*SELECT A.ANO_EJE,CASE WHEN B.MONTO_PIA IS NULL THEN 0 ELSE B.MONTO_PIA END MONTO_PIA,
CASE WHEN B.MONTO_PIM IS NULL THEN 0 ELSE B.MONTO_PIM END MONTO_PIM,
CASE WHEN A.MONTO_DEVENGADO IS NULL THEN 0 ELSE A.MONTO_DEVENGADO END MONTO_DEVENGADO FROM 
(SELECT ANO_EJE,SUM(MONTO_DEVENGADO) MONTO_DEVENGADO FROM UGI_AFSP.ptaf_dgpp_gasto_general A
WHERE tipo_gobierno='M' AND SEC_EJEC=301476
AND MES_EJE=1 AND ANO_EJE >=EXTRACT(YEAR FROM SYSDATE)-5
GROUP BY ANO_EJE) A
LEFT JOIN 
(SELECT ANO_EJE,SUM(MONTO_PIA) MONTO_PIA,SUM(MONTO_PIM) MONTO_PIM FROM UGI_AFSP.ptaf_dgpp_gasto_general
WHERE TIPO_GOBIERNO ='M' AND SEC_EJEC=301476 AND ANO_EJE >=EXTRACT(YEAR FROM SYSDATE)-5 AND (MES_EJE IS NULL OR MES_EJE = 0)
GROUP BY ANO_EJE) B
ON A.ANO_EJE=B.ANO_EJE
ORDER BY A.ANO_EJE*/

}

