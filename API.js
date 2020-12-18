    const campo_nome = document.getElementById('nome_pokemon');
    const img_pokemon= document.getElementById('img_pokemon');
    const campo_tipo = document.getElementById('tipo_pokemon');
    const campo_peso = document.getElementById('peso_pokemon');
    const campo_status = document.getElementsByClassName('stats');

function getDadosPokemon(){
    let pokemon = document.getElementById('pokemon').value;
    pokemon = pokemon.toLocaleLowerCase();
    
    let url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemon;
    let xmlHttp = new XMLHttpRequest();
    
    xmlHttp.open('GET', url);
    
    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState != 4 && !document.getElementById('loading')){
            document.getElementById('carta').className += ' d-none'
            let imgLoading = document.createElement('img')
				imgLoading.id = 'loading'
				imgLoading.src = 'loading.gif'
				imgLoading.className = 'rounded mx-auto d-block'
                document.getElementById('conteudo').appendChild(imgLoading)
        }
        
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let dadosJSONText = xmlHttp.responseText;
            let dadosJsonObj = JSON.parse(dadosJSONText);
            console.log(dadosJsonObj)
            let nome = dadosJsonObj.name.replace(/^./, dadosJsonObj.name[0].toUpperCase());
            let sprite_1 = dadosJsonObj.sprites.other['official-artwork'].front_default;
            let sprite_2 = dadosJsonObj.sprites.front_default;
            
            let types = '';
            
            for (i in dadosJsonObj.types){
                if(i >= 1){
                    types += '/';
                }
                types += dadosJsonObj.types[i].type.name.replace(/^./, dadosJsonObj.types[i].type.name[0].toUpperCase());
            }
            
            let peso = parseInt(dadosJsonObj.weight, 10) / 10;
            peso = peso.toString().replace('.',',');
            
            let status = [];
            
            for (i in dadosJsonObj.stats){
                 status[i]= dadosJsonObj.stats[i].stat.name.replace(/^./,dadosJsonObj.stats[i].stat.name[0].toLocaleUpperCase())+': ';
                
                if(status[i] == 'Special-attack: ' ||                              status[i] == 'Special-defense: '){
                   status[i] =  status[i].replace('Special-','Sp. ');
                }

                status[i] += dadosJsonObj.stats[i].base_stat;
            }
             preencheCampos(nome, sprite_1, sprite_2, types, peso, status);
        }else if (xmlHttp.readyState == 4 && xmlHttp.status == 404){
            alert("404: Pokemon not founded");
        }
    }
    xmlHttp.send()
}

function preencheCampos(nome, sprite1, sprite2 , tipo, peso, stats){
    if(sprite1 != null){
        img_pokemon.src = sprite1;      
    } else {
        img_pokemon.src = sprite2;
    }
    
    campo_nome.innerHTML = nome;    
    campo_tipo.innerHTML = 'Type: ' + tipo;
    campo_peso.innerHTML = 'Weight: ' + peso +'KG';
    
    for (i in stats){
        campo_status[i].innerHTML = stats[i];
    }
    
    document.getElementById('loading').remove();
    document.getElementById('carta').className = 'card m-auto shadow-lg';
}