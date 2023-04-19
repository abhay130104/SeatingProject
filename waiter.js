document.querySelector('.container').addEventListener('click', loadPopUp);

const seats = document.querySelectorAll('.rectangle');
const sqseats = document.querySelectorAll('.square');
const modal = document.querySelector("#mod"),
overlay = document.querySelector("#overlay"),
closeBtn = document.querySelector(".close-btn").addEventListener('click', closePopUp);

populateUI();

function loadPopUp(e){

    if(e.target.className === 'rect-color-change'){
      
      let obj = e.target;
      modal.classList.add('active');
      modal.classList.remove('hide');
      overlay.classList.add('active');

      okButton = document.getElementById('okbtn').addEventListener('click', colorChange);

      function colorChange(){

      obj.classList.add('rectangle');
      obj.classList.remove('rect-color-change');
      const tables = document.querySelectorAll('.rect-color-change');
      const seatsIndex = [...tables].map((seat) => [...seats].indexOf(seat));

      localStorage.setItem('tables', JSON.stringify(seatsIndex));
  
      }
    }

    if(e.target.className === 'square-color-change'){
      
      let obj = e.target;
      modal.classList.add('active');
      modal.classList.remove('hide');
      overlay.classList.add('active');

      okButton = document.getElementById('okbtn').addEventListener('click', colorChange2);

      function colorChange2(){
      
        obj.classList.add('square');
        obj.classList.remove('square-color-change');
        const sqtables = document.querySelectorAll('.square-color-change');
        const sqseatsIndex = [...sqtables].map((seat) => [...sqseats].indexOf(seat));

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
}

function closePopUp(){
  modal.classList.remove('active');
  modal.classList.add('hide');
  overlay.classList.remove('active');
}


