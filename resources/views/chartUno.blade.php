 @extends('layouts.main')

@section('content')
<principal/>
@endsection
@section('script')
<script src="{{ asset('js/barchart.js') }}"></script>
<script src="{{ asset('js/componentes/chartUno.js') }}"></script>
@endsection