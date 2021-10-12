<!DOCTYPE html>
<html>
<head>
	<title>MEF</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/grid.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/custom.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/Mycustom.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/templates.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/chart.css') }}">
	@yield('head')
</head>
<body class="grid-container">
	<main id="app" >
		@yield('content')
	</main>
</body>
<input type="hidden" name="url" id="url" value="{{url('/')}}">
<script src="{{ asset('js/jquery.js') }}"></script>
<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('js/sweetalert.js') }}"></script>
<script src="{{ asset('js/easypiechart.js') }}"></script>
<script src="{{ asset('js/Chart.js') }}"></script>
@yield('script')
<script src="{{ asset('js/components.js') }}"></script>
</body>
</html>