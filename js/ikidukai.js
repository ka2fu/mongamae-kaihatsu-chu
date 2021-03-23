// タイトルの処理
$('.title').click(function(){
  $('.title-inner').addClass('title-vanish');
  $('.title-inner').delay(1000).queue(function(){
    $(this).css("display", "none");
  })
  $('.fadein').removeClass('hidden');
  $('.fadein').animate({
    opacity: 1
  },{
    duration: 1000,
    easing: "easeInQuad"
  });
});

// いろいろなスマホタッチ処理
$('.hovable-moya').on({ // ←innerじゃないよ
  'touchstart' : function(){
    $(this).off('mouseover mouseout');
  },
  'touchstart mouseover' : function(){
    $(this).css('filter', "saturate(0.7)");
  },
  'touchend mouseout' : function(){
    $(this).css('filter', "saturate(1.0)");
  }
});

// modalの開閉
$('nav').on('click', '#open', function (){
  if($('#modal').hasClass('hidden')){ // modalの顔一瞬出てくる現象抑制　
    $('#modal').hide();
    $('#modal').removeClass('hidden');
  }

  $('#open').fadeOut();
  $('#header-wrapper').addClass('border-inherit');
  $('#modal').slideDown();

  // modalを開く時背景色を変更
  $('#header-wrapper').animate({
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  }, {
    duration: 600,
    easing: "easeOutCubic",
    queue: false
  });
  $('#modal').animate({
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  }, {
    duration: 600,
    easing: "easeOutCubic",
    queue: false
  });
});
$('#modal').on('click', '#close', function (){

  // modalを閉じる時背景色を戻す
  if(!($('body').hasClass('index'))){ // トップページでない場合
    $('#header-wrapper').animate({
      backgroundColor: "transparent"
      // backgroundColor: "rgba(255, 255, 255, 0.5)"
    }, {
      duration: 600,
      easing: "easeInCubic",
      queue: false
    });
    $('#modal').animate({
      backgroundColor: "transparent"
      // backgroundColor: "rgba(255, 255, 255, 0.5)"
    }, {
      duration: 600,
      easing: "easeInCubic",
      queue: false
    });
  } else { // トップメージの場合
    $('#header-wrapper').animate({
      backgroundColor: "transparent"
    }, {
      duration: 600,
      easing: "easeInCubic",
      queue: false
    });
    $('#modal').animate({
      backgroundColor: "transparent"
    }, {
      duration: 600,
      easing: "easeInCubic",
      queue: false
    });
  }

  $('#modal').slideUp(function (){
    $('#header-wrapper').removeClass('border-inherit');
    $('#open').fadeIn();
  });
});

// むしめがねモーダルの開閉
$('#mushimegane').on('click', '.moya', function(){
  if($('#mushi-modal').hasClass('hidden')){
    $('#mushi-modal').hide();
    $('#mushi-modal').removeClass('hidden');
  }
  $('#mushi-modal').fadeIn();
});
$('#mushi-modal').on('click', '#close', function(){
  $('#mushi-modal').fadeOut();
});

// クリックでいい感じの位置にいくための
let header_height = $('#header-wrapper').height();
let space = header_height * 2;
let a_height = header_height + space;
$('.mushi-link').click(function(){
  console.log('mushi-link clicked');
  let href = $(this).attr('href');
  $('#mushi-modal').fadeOut(); // 連続でクリックするとなんかバグるし、ui的にも消したい
  let target = $(href == "#" || href == "" ? "body" : href);
  let position = target.offset().top - a_height;
  $('html, body').animate({ scrollTop:position }, 500, "swing");
  return false;
});

// info-outerの中のfooterの位置を整える
let is_index = $('body').hasClass('index');
if(!is_index){
  let title_height = $('.info-inner').offset().top - $('#info-outer').offset().top;
  let footer_pos = $('.info-inner').height() + title_height;
  let footer = $('#info-outer').find('footer');
  let min_info_height = $('#wrapper').height() - $('#info-outer').offset().top - footer.height();
  if(footer_pos < min_info_height){ // info-innerが小さい時は底に固定
    $(footer).css('top', min_info_height);
  } else { // footerが画面のしたからスタートする場合
    $(footer).css('top', footer_pos);
  }
  $(footer).removeClass('hidden'); // リフレッシュで一瞬現れるの防止で隠す
  $(document).scroll(function(){ // 一応画面幅が途中で変わっとトキのために
    let title_height = $('.info-inner').offset().top - $('#info-outer').offset().top;
    let footer_pos = $('.info-inner').height() + title_height;
    let footer = $('#info-outer').find('footer');
    if(footer_pos < min_info_height){ // info-innerが小さい時は底に固定
      $(footer).css('top', min_info_height);
    } else { // footerが画面のしたからスタートする場合
      $(footer).css('top', footer_pos);
    }
  });
}

// pplの変化
let katsu_moza = 'img-ikidukai/katsu1.png';
let katsu_moji = 'img-ikidukai/katsu1_moji.png';
let hira_moza = 'img-ikidukai/hira1.png';
let hira_moji = 'img-ikidukai/hira1_moji.png';
let hoshi_moza = 'img-ikidukai/hoshi1.png';
let hoshi_moji = 'img-ikidukai/hoshi1_moji.png';
let yuka_moza = 'img-ikidukai/yuka1.png';
let yuka_moji = 'img-ikidukai/yuka1_moji.png';
if(isSmartPhone()){ //スマホはずっと文字
  $('#katsu1').find('img').attr('src', katsu_moji);
  $('#hira1').find('img').attr('src', hira_moji);
  $('#hoshi1').find('img').attr('src', hoshi_moji);
  $('#yuka1').find('img').attr('src', yuka_moji);
} else { // パソコンの変化の処理
  $('.ppl').hover(
    function(){
      if($(this).attr('id') === 'katsu1'){
        $(this).find('img').attr('src', katsu_moji);
      }
      else if($(this).attr('id') === 'hira1'){
        $(this).find('img').attr('src', hira_moji);
      }
      else if($(this).attr('id') === 'yuka1'){
        $(this).find('img').attr('src', yuka_moji);
      }
      else if($(this).attr('id') === 'hoshi1'){
        $(this).find('img').attr('src', hoshi_moji);
      }
    },
    function(){
      if($(this).attr('id') === 'katsu1'){
        $(this).find('img').attr('src', katsu_moza);
      }
      else if($(this).attr('id') === 'hira1'){
        $(this).find('img').attr('src', hira_moza);
      }
      else if($(this).attr('id') === 'yuka1'){
        $(this).find('img').attr('src', yuka_moza);
      }
      else if($(this).attr('id') === 'hoshi1'){
        $(this).find('img').attr('src', hoshi_moza);
      }
    }
  );
}

// vanimoyaの動き
// $('.vanimoya').on({
//   'touchstart' : function(){
//     $(this).off('mouseover mouseout');
//   },
//   'touchstart mouseover' : function(){
//     console.log("on");
//     $(this).addClass('vani-henka');
//   }
// });
