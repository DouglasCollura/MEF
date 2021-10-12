<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/grid.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/custom.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/icons/style.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/Swal2.css') }}">
	@yield('head')
</head>
<body class="grid-container-login ">

	<header class="header-login">
		<img src="../public/img/Logo.png" width="175" alt="">
	</header><!-- /header -->
	
	<main class="main-login  img-fondo" id="app">
		@yield('content')
	</main>

<input type="hidden" name="url" id="url" value="{{url('/')}}">
<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/jquery.js') }}"></script>
<script src="{{ asset('js/sweetalert.js') }}"></script>
@yield('script')
<script src="{{ asset('js/components.js') }}"></script>
</body>
</html>