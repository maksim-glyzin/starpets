const request = () => new Promise(async res => {
    const r = await fetch('http://localhost:3000/balance/change?userId=1&amount=2')
    const json = await r.json();
    console.log(json);
    res(json);
})

const requests = [];
[...Array(100)].forEach(() => requests.push(request()));

console.log();

(async () => {
    await Promise.all(requests);
})();
