//idclass names
//h1#counter = counter 
//button#minus = minus
//button#plus = plus
//button#heart = heart



document.addEventListener("DOMContentLoaded", function() {
    let counterId;
    let zero = 0;
    let likes = {};
    let counter = document.querySelector('#counter');
    let pause = document.querySelector('#pause');
    let plus = document.querySelector('#plus')
    let minus = document.querySelector('#minus')
    let heart = document.querySelector('#heart')
    let likesBox = document.querySelector('.likes')
    let form = document.querySelector('form')
    let comments = document.querySelector('#list')
    
    console.log(counter); 
    console.log(pause);   

    function keepCounting() {
        zero++;
        counter.textContent = zero;
        console.log("Counter: " + zero); 
    }

    function pauseTheGame() {
        console.log("Pause button clicked"); 
        if (document.querySelector('#pause').textContent.trim() === 'pause') {
            clearInterval(counterId);
            counterId = null;
            pause.textContent = 'resume';
            plus.disabled = true;
            minus.disabled = true;
            heart.disabled = true;

            console.log("Paused the game"); 
        } else if (pause.textContent === 'resume') {
            counterId = setInterval(keepCounting, 1000);
            pause.textContent = 'pause';
            plus.disabled = false;
            minus.disabled = false;
            heart.disabled = false;
            console.log("Resumed the game"); 
        }
    }

    if (!counterId) {
        counterId = setInterval(keepCounting, 1000);
    }
    
    function addATick(){
        zero++;
        counter.textContent = zero;
        console.log("Plus has been Clicked!") 
    }
    function minusATick(){
        zero--;
        counter.textContent = zero;
        console.log('Minus has been clicked!')
    }
    function heartATick(){
        if (!likes[zero]) {
            likes[zero] = 0;
        }
        likes[zero]++;
        let existingLike = document.getElementById(`like-${zero}`);
        if (existingLike) {
            existingLike.remove();
        }

        let newHeart = document.createElement('li');
        newHeart.id = `like-${zero}`; 
        newHeart.textContent = `${zero} has been liked ${likes[zero]} ${likes[zero] === 1 ? 'time' : 'times'}`;

        likesBox.appendChild(newHeart);
        console.log('Heart Has been clicked')
    }
    function createComment(comment){
       let p = document.createElement('p')
       p.textContent = `${comment}`
       comments.appendChild(p)

    }

    

    pause.addEventListener("click", pauseTheGame);
    plus.addEventListener("click", addATick);
    minus.addEventListener("click", minusATick);
    heart.addEventListener("click", heartATick);
    form.addEventListener("submit",(e) => {
    e.preventDefault();
    createComment(e.target.elements['comment-input'].value)
    form.reset()
  } )
});