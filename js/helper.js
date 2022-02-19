

function getRadius(w, sw) {
    return ((w / 2) - (sw / 2))
}
console.log(getRadius(300, 5))


// const circle = document.querySelector('.progress-front__circle');
// const radius = circle.r.baseVal.value;
// const circumference = 2 * Math.PI * radius;


// circle.style.strokeDasharray = `${circumference} ${circumference}`;
// circle.style.strokeDashoffset = circumference;


// function setProgress(persent) {
//     const offset = circumference - persent / 100 * circumference;
//     circle.style.strokeDashoffset = offset;
// }
// setProgress(50)