$(document).ready(function() {
  console.log('jQuery готов к работе!');

  // Темная тема
  if(localStorage.getItem('theme')==='dark') $('body').addClass('dark');
  $('#themeToggle').click(function(){
    $('body').toggleClass('dark');
    localStorage.setItem('theme',$('body').hasClass('dark')?'dark':'light');
  });

  // Tabs
  $('.tab-btn').click(function(){
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#'+$(this).data('tab')).addClass('active');
  });

  // Плавная прокрутка
  $('nav a').click(function(e){
    e.preventDefault();
    const target = $($(this).attr('href'));
    $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700);
  });

  // AJAX цитаты
  const reviewBox = $('#reviews');
  async function loadReview(){
    reviewBox.html('Загрузка...');
    try {
      const data = await $.get('https://dummyjson.com/quotes/random');
      reviewBox.html(`<p><i>"${data.quote}"</i></p><p><b>— ${data.author}</b></p>`);
    } catch {
      reviewBox.html('Ошибка загрузки...');
    }
  }
  $('#newReviewsBtn').click(loadReview);
  loadReview();

  // Галерея API
  const imagesDiv = $('#images');
  async function loadImages(){
    imagesDiv.html('Загрузка...');
    let html='';
    for(let i=0;i<6;i++){
      html+=`<img src="https://picsum.photos/300?random=${Math.random()}">`;
    }
    imagesDiv.html(html);

    // Модалка
    imagesDiv.find('img').click(function(){
      $('#modalImg').attr('src',$(this).attr('src'));
      $('#modal').fadeIn();
    });
  }
  $('#loadImagesBtn').click(loadImages);
  loadImages();

  $('.close').click(function(){ $('#modal').fadeOut(); });

  // jQuery UI
  $('#draggable').draggable();
  $('#datepicker').datepicker({ dateFormat:'dd.mm.yy', changeMonth:true, changeYear:true, yearRange:'1950:2025' });

  // Scroll top
  $(window).scroll(function(){ $('#scrollTopBtn').toggle($(window).scrollTop() > 300); });
  $('#scrollTopBtn').click(function(){ $('html, body').animate({ scrollTop:0 },500); });
});
