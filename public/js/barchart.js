
		var canvas = "";
	 	var canvas = "";
	 	var ctx = "";
	 	var maxWidth = "";
	 	var maxHeight = "";
		var maxValue ="";

	 function GeneradorBarra(lienzo, montos, labels, data ){
	 	canvas = $('#'+lienzo);
	 	canvas = canvas[0];
	 	ctx = canvas.getContext("2d");
	 	maxWidth = $(canvas).width();
	 	maxHeight = $(canvas).height();
	 	/*============	====================================
									CUSTOM 
		================================================*/
		var arr_a = montos;
		var arr_a_label = labels;
		maxValue = Math.max.apply(Math, arr_a);
		var maxCant = $(arr_a).length;
		var maxWidthContent = (maxWidth/maxCant);
	 	maxWidthContent = maxWidthContent-(maxWidthContent/100*42); //
		var xPosition = (maxWidth/100*20);
	 	var margen = 40;
	 	var cont= 1;
	 	var objetos=[];



 	/*==========================
				ESTRUCTURA
	==========================*/

	 	ctx.font="12px Verdana";
	 	ctx.fillStyle = 'rgba(112, 121, 136, 0.5)';
	 	
	 	ctx.fillRect(xPosition,10,0.5,maxHeight);
	 	
	 	ctx.fillRect(0,maxHeight -Porcentaje(maxValue),maxWidth,0.5);
	 	ctx.fillText(Lateral(maxValue),0,maxHeight -Porcentaje(maxValue));

	 	ctx.fillRect(0,maxHeight -Porcentaje((maxValue/2) + (maxValue/4)),maxWidth,0.5);
	 	ctx.fillText(Lateral((maxValue/2) + (maxValue/4)),0,maxHeight -Porcentaje((maxValue/2) + (maxValue/4)));

	 	ctx.fillRect(0,maxHeight -Porcentaje(maxValue)/2,maxWidth,0.5);
	 	ctx.fillText(Lateral(maxValue/2),0,maxHeight -Porcentaje(maxValue)/2);

	 	ctx.fillRect(0,maxHeight -Porcentaje(maxValue)/4,maxWidth,0.5);
	 	ctx.fillText(Lateral(maxValue/4),0,maxHeight -Porcentaje(maxValue)/4);

	 	ctx.fillRect(0,maxHeight -1,maxWidth,0.5);
	 	ctx.fillText("0",0,maxHeight -1);

 	/*==========================
				ESTRUCTURA
	==========================*/
		var cont_data = 0;
		console.log(",maxCant");
		console.log(maxCant);
		console.log("data");
		console.log(data);
		console.log("arr_a");
		console.log(arr_a);


	 	for(var i= 0; i < maxCant; i ++){

	 		if(cont < 2){
	 			margen = (maxWidthContent/100*15) * cont;
	 			ctx.fillStyle = 'rgba(112, 121, 136, 0.8)';
	 			ctx.fillText(data[cont_data],xPosition-margen,maxHeight -Porcentaje(maxValue));
	 			cont_data++;
	 			ctx.fillStyle = '#98BD1F';
	 			cont++;
	 		}else{
	 			cont = 1;
	 			margen = (maxWidthContent/100*60) * cont;
	 			ctx.fillStyle = 'rgba(112, 121, 136, 0.5)';
	 	 		ctx.fillRect(xPosition+margen+10,10,0.5,maxHeight);

	 			ctx.fillStyle = '#0094F8';
	 		}
	 		if( (maxCant % 2) == 1 && i == (maxCant-1) ){
	 			ctx.fillStyle = '#0094F8';
	 		}
	 	 		ctx.fillRect(xPosition,maxHeight -Porcentaje(arr_a[i]),maxWidthContent,Porcentaje(arr_a[i]));
	 	 		objetos.push({ x:xPosition, width:maxWidthContent, labels: arr_a_label[i] });	 			
	 		xPosition = xPosition + maxWidthContent + margen;

	 	}

	 	var objetoOver;
	 	var limitLabel;
	 	$(canvas).mouseenter(function(){
	 		$(".barchart").append("<span class='seguir'></span>");
	 	});

	 	$(canvas).mousemove(function( event ) {
	 		//console.log( event.pageX - $(canvas).offset().left );
	 		$(".seguir").css("top",parseInt(window.event.pageY -10) + "px");
	 		$(".seguir").css("left",parseInt(window.event.pageX + 5) + "px");
	 		for(var i = 0; i < objetos.length; i++){
	 			if(objetos[i].x < (event.pageX - $(canvas).offset().left) && (objetos[i].width + objetos[i].x) > (event.pageX - $(canvas).offset().left) ){
	 				objetoOver = objetos[i];
	 				break;
	 			}else{
	 				objetoOver = "n";
	 			}
	 		}
	 		if(objetoOver != "n"){

	 			for (var i = 0; i < objetoOver.labels.labels.length; i++) {
	 				if(limitLabel == 1){
	 					
	 					break;
	 				}
	 				$(".seguir").css("display","");
	 				$(".seguir").append("<p>"+objetoOver.labels.labels[i]+Decimales(objetoOver.labels.value[i])+"</p>");
	 				if(i == objetoOver.labels.labels.length-1){
	 					limitLabel = 1;
	 				}
	 			}
	 		}else{
	 			limitLabel = 0;
	 			$(".seguir").css("display","none");
	 			$(".seguir").empty();
	 		}

	 	});
		$(canvas).mouseout(function(){
		 	$(".seguir").remove();
		 	limitLabel = 0;

		});

	}
 	
 	/*==========================
				PORCENTAJE
	==========================*/
 	function Porcentaje(val){
		var porcentaje =(val*100/maxValue);
		var porcentaje_trans = ((maxHeight-10)/100*porcentaje);
		return porcentaje_trans;
 	}
  /*==========================
				PORCENTAJE
	==========================*/

 	/*==========================
				DECIMALES
	==========================*/

 	function Decimales(val){
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

	/*==========================
				DECIMALES
	==========================*/

	/*==========================
				LATERAL
	==========================*/

 	function Lateral(val){
 		var valu = val.toString();
 		var IndexVal = valu.indexOf(".");
 		if(IndexVal <=0){
 			IndexVal = valu.length;
 		}
 		var SubString = valu.substr(0,IndexVal);
 		var res;
 		if((IndexVal) >=3 && IndexVal <=6){
 			SubString = valu.substr(0,IndexVal-3)+'K';
 			console.log(SubString);

 		}else if((IndexVal+1) >6){
 			SubString = valu.substr(0,IndexVal-6);
 			SubString = Decimales(SubString)+"M";
 		}

		return SubString;
 	}


	/*==========================
				LATERAL
	==========================*/