<?php

namespace App\Http\Controllers;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data as Data;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use DB;

class PresupuestoController extends Controller
{
   use ApiController;

  public function GetPresupuesto(){

    $datos = DB::select("SELECT ANO_EJE,SUM(MONTO_PIA) MONTO_PIA,SUM(MONTO_PIM) MONTO_PIM,SUM(MONTO_DEVENGADO) DEVENGADO,ROUND((SUM(MONTO_DEVENGADO)*100)/SUM(MONTO_PIM),2) AVANCE FROM UGI_AFSP.PTAF_DGPP_GASTO_GENERAL
      WHERE ANO_EJE = EXTRACT(YEAR FROM SYSDATE)
      GROUP BY ANO_EJE");
    return $this->sendResponse($datos);

  }


}

