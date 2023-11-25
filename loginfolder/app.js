const openeye= document.getElementById('openeye')
const closedeye=document.getElementById('closedeye')
pinput=document.getElementById('passwordinput');
openeye.addEventListener('click', function(){
     closedeye.classList.toggle('inactive')
     openeye.classList.toggle('inactive')
     if(pinput.type == 'password'){
         pinput.type='text';
     }
     else{
         pinput.type='password'
     }
 })
closedeye.addEventListener('click', function(){
     openeye.classList.toggle('inactive')
     closedeye.classList.toggle('inactive')
     if(pinput.type == 'password'){
         pinput.type='text';
     }
     else{
         pinput.type='password'
     } 
 })
