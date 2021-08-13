const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
const random = (len) => {
    const response = [];
    const counts = {};
    for(let i=0; i<len.lenRandoms; i++) {
        response.push(Number(getRandomNumber(1, 1000)))
    }
    
    for (const num of response) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts
}

process.on('message', msg => {
    const ran = random(msg)
    process.send(ran)
})


