 $(document).ready(function() {

  $('#incfont').click(function(){   

        curSize= parseInt($('#sim').css('font-size')) + 2;

  if(curSize<=84)
        $('#sim').css('font-size', curSize);

        }); 

  $('#decfont').click(function(){   

        curSize= parseInt($('#sim').css('font-size')) - 2;

  if(curSize>=10)

        $('#sim').css('font-size', curSize);

        });

 });