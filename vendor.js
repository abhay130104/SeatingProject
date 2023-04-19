document.querySelector('.container').addEventListener('click', loadPopUp);

const number = document.querySelector('#count')
const seats = document.querySelectorAll('.rectangle');
const sqseats = document.querySelectorAll('.square');
const modal = document.querySelector("#mod"),
overlay = document.querySelector("#overlay"),
closeBtn = document.querySelector(".close-btn").addEventListener('click', closePopUp);

populateUI();

function loadPopUp(e){

    if(e.target.className === 'rectangle'){
      
      let obj = e.target;
      modal.classList.add('active');
      modal.classList.remove('hide');
      overlay.classList.add('active');

      input1 = document.getElementById('inp1');
      input2 = document.getElementById('inp2');
      okButton = document.getElementById('okbtn').addEventListener('click', colorChange);

      if(input1.value === "" || input2.value === ""){
        okButton.disabled = true;
      }

      else{
        okButton.disabled = false;
      }

      function colorChange(){
      
        obj.classList.remove('rectangle');
        obj.classList.add('rect-color-change');
        const tables = document.querySelectorAll('.rect-color-change');
        
        const seatsIndex = [...tables].map((seat) => [...seats].indexOf(seat));
        const num = document.querySelectorAll('.rectangle .square');
        const tablecount = num.length;
        number.innerText = tablecount;

        localStorage.setItem('tables', JSON.stringify(seatsIndex));
          
      }
    }

    if(e.target.className === 'square'){
      
      let obj = e.target;
      modal.classList.add('active');
      modal.classList.remove('hide');
      overlay.classList.add('active');

      okButton = document.getElementById('okbtn').addEventListener('click', colorChange2);

      function colorChange2(){
      
        obj.classList.remove('square');
        obj.classList.add('square-color-change');
        const sqtables = document.querySelectorAll('.square-color-change');
        console.log(sqtables);
        const sqseatsIndex = [...sqtables].map((seat) => [...sqseats].indexOf(seat));

        const num = document.querySelectorAll('.rectangle .square');
        const tablecount = num.length;
        number.innerText = tablecount;

        localStorage.setItem('sqtables', JSON.stringify(sqseatsIndex));
          
      }
    }

}

function populateUI(){

  const selectedSeats = JSON.parse(localStorage.getItem('tables'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('rect-color-change');
        seat.classList.remove('rectangle');
      }
    });
  }

  const sqselectedSeats = JSON.parse(localStorage.getItem('sqtables'));
  if (sqselectedSeats !== null && sqselectedSeats.length > 0) {
    sqseats.forEach((seat, index) => {
      if (sqselectedSeats.indexOf(index) > -1) {
        seat.classList.add('square-color-change');
        seat.classList.remove('square');
      }
    });
  }

  const num1 = document.querySelectorAll('.rectangle');
  const num2 = document.querySelectorAll('.square');
  const tablecount1 = num1.length;
  const tablecount2 = num2.length;
  number.innerText = tablecount1+tablecount2;
}

function closePopUp(){
  modal.classList.remove('active');
  modal.classList.add('hide');
  overlay.classList.remove('active');
}


//Disable custDetails submit button
okButton = document.getElementById('okbtn');

