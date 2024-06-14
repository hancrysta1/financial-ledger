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
        <a class="tm-site-title mb-0">소비 기록<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspX북</a>
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
      >
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link active" href="/">Home<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="accountlog">거래내역</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="mypage">마이페이지</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="create">거래내역 저장</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link d-flex" href="signin"><span>Login</span></a>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
.tm-site-title.mb-0 {
  font-family: 'BlackHanSans';
  font-size: 80px;
  line-height: 80%
}
#navbarSupportedContent {
  font-family: 'NanumSquareRoundEB';
}

.nav-item, .nav-link, .nav-link.active{
  border-radius: 50%;
  background-color: rgb(255, 218, 6)
}

  </style>
  