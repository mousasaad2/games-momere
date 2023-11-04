let user = document.querySelector(".name");
let filter = document.querySelector(".filter");
let games = document.querySelector(".games")
let error = document.querySelector(".error")
let alert = document.querySelector(".alert")
let fil = document.getElementById("fil")

games.classList.add("no-clicking"); // No click

fil.onclick = function () {
    let promp = prompt("what is your name")
    user.innerHTML += " " + promp;
    filter.style.filter = "none";
    fil.style.display = "none";
    games.classList.remove("no-clicking");
        boxs.map((e)=>{
            e.classList.add("is-flipped")
            setTimeout(()=>{
                e.classList.remove("is-flipped")
            },3000)
        })
}

let boxs = Array.from(games.children)
let orderRange = [...Array(boxs.length).keys()]
shuffie(orderRange) // random order flexBox css

function shuffie(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array
}



boxs.forEach((box, index) => {
    box.style.order = orderRange[index]
    box.addEventListener("click", function () {
        flipBlock(box) //rotate css
    })
})

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped")
    let allFlippedBlock = boxs.filter(flippedBock => flippedBock.classList.contains("is-flipped"))
    if (allFlippedBlock.length === 2) {
        stopClickink()
        checkMatchedBlocks(allFlippedBlock[0], allFlippedBlock[1])
    }
}

function stopClickink() {
    games.classList.add("no-clicking");
    setTimeout(() => {
        games.classList.remove("no-clicking");
    }, 1000)
}
function checkMatchedBlocks(firstBlock, secondBlock) {
    if (firstBlock.dataset.name === secondBlock.dataset.name) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("s").play();
    } else {
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, 1000)
        document.getElementById("f").play();
        error.innerHTML = parseInt(error.innerHTML) + 1;
        if (parseInt(error.innerHTML) === 3) {
            setTimeout(() => {
                location.reload();
            }, 2000)
            alert.style.display = "flex"
        }
    }
}