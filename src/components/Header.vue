<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600">
    <!-- https://fonts.google.com/specimen/Open+Sans -->
    <link rel="stylesheet" href="../../css/fontawesome.min.css">
    <!-- https://fontawesome.com/ -->
    <link rel="stylesheet" href="../../css/fullcalendar.min.css">
    <!-- https://fullcalendar.io/ -->
    <link rel="stylesheet" href="../../css/bootstrap.min.css">
    <!-- https://getbootstrap.com/ -->
    <link rel="stylesheet" href="../../css/tooplate.css">
    <nav class="navbar navbar-expand-xl navbar-light">
      <a class="navbar-brand" href="#">
        <h1 class="tm-site-title mb-0">소비 기록<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspX북</h1>
        <img src="../../img/logo.png" />
      </a>
      <button
        class="navbar-toggler ml-auto mr-0"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        style="background-color: rgb(255, 210, 10)"
      >
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#">Home<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="products.html">거래내역</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="accounts.html">마이페이지</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link d-flex" href="login.html"><span>Join</span></a>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
h1 {
  font-family: 'ChangwonDangamAsac';
}
#navbarSupportedContent {
  font-family: 'NanumSquareRoundEB';
}

#navbarSupportedContent{
  border-radius: 50%;
}
.nav-item, .nav-link, .nav-link.active{
  border-radius: 40%;
}
  </style>
  