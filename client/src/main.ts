import Redis from "ioredis";

const redisClient = new Redis({
    sentinels: [
        { host: "172.20.0.5", port: 26379 },
        { host: "172.20.0.6", port: 26379 },
        { host: "172.20.0.7", port: 26379 }
    ],
    name: "redismaster",
    password: "redispassword"
});

redisClient.on('connect', () => {
    console.log('Redis Connected');
    redisClient.set("foo", "bar");
    redisClient.info((err, result) => {
        console.log(err,result)
    })
})

redisClient.on('error', (error) => {
    console.log(error)
})
