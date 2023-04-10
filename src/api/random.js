const randoms = (cantidad) => {
    let valor = []
    

    for (let i = 0; i < cantidad; i++) {
        const element = Math.floor(Math.random() * 1000);
        valor.push(element)
    }
    return valor
}

process.on('message', cantidad => {
    // console.log(cantidad)
    const random = randoms(cantidad)
    // console.log(sum)
    process.send(random)
    process.exit(1)
})

process.send("listo")