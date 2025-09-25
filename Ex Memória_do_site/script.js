  const salvarEstilo = () => {
            localStorage.setItem("bgcolor", document.getElementById('bgcolor').value)
            localStorage.setItem("font", document.getElementById('font').value)
            localStorage.setItem("image", document.getElementById('img').value)
        }

        const pegarEstilo = () => {
            document.body.style.backgroundColor = localStorage.getItem("bgcolor")
            document.querySelector("p").style.fontFamily = localStorage.getItem("font")
            document.querySelector("img").setAttribute("src", localStorage.getItem("image"))
        }

        const botaotop = () => {
            pegarEstilo()
            salvarEstilo()
        }
        
        const p = document.getElementById("p")
        p.textContent += ` Fonte: ${localStorage.getItem("font")} Cor: ${localStorage.getItem("bgcolor")}`
        
        const btn = document.getElementById("btn")
        btn.addEventListener("click", botaotop)
        pegarEstilo()