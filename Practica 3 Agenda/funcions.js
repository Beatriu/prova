//En aquesta funció s'agafa la llista que està guardada en el localStorage i es pasa a string.
function carregarlocalStorage() {
  var llistaJSON = localStorage.getItem('contactes');
  if (llistaJSON !== null) {
    llista = JSON.parse(llistaJSON);
  } else {
    //En el cas de que no hi hagi res guardat es crea una llista nova.
    llistaJSON = '{ "persones" : []}';
    localStorage.setItem('contactes', llistaJSON);
    llista = JSON.parse(llistaJSON);
  }

}
//Aquesta funció es per imprimir el que hi ha guardats al LocalStorage.
function renderitzarLlista() {
  //Creem el objecte llista que es el div
  var objLlista = document.getElementById('llista');
  //Buido tot el que hi ha dins del div perque cada cop que torna a cridar a la funció vull que es torni a imprimir tot de nou.
  objLlista.innerHTML = "";
  //El seu fill que serà la llista desordenada
  var objUL = document.createElement("ul");
  //i li fiquem un id
  objUL.id = "llistaCompra";
  //El for per a recorrer tots els elements de l'Array.
  for (var i = 0; i < llista.persones.length; i++) {
    //Per cada element es crea la seva fila.
    var obj = document.createElement('li');
    obj.id = "fila";
    //S'omplen tots els atributs de l'objecte.
    objNom = llista.persones[i].Nom;
    objCognom = llista.persones[i].Cognom;
    objTelefon = llista.persones[i].Telefon;
    objAdresa = llista.persones[i].Adresa;
    objLocalitat = llista.persones[i].Localitat;
    //I aqui s'imprimeix com vulguem.
    obj.innerHTML = "<b> " + objNom + " " + objCognom + "</b>" + " (tlfn: " + objTelefon + ")<br/>" + objAdresa + ". " + objLocalitat + " ";

    //També creem els seus 2 botons amb les seves funcions
    var botoEliminar = document.createElement("button");
    botoEliminar.innerHTML = "Borrar";

    //Aquesta es la funció del botó eliminar. 
    botoEliminar.addEventListener('click', function (event) {
      //mirem quina es la fila on s'executa l'acció
      var li = event.target.parentElement;
      //Creem un array d'element html per a que identifiqui el index ja que l'array d'element html tindrà els mateixos index que l'array de la impresió de l'objecte.
      var index = Array.from(li.parentElement.children).indexOf(li);
      //preguntem per un alert si el vol eliminar o no
      var text = "Vols eliminar el registre de " + llista.persones[index].Nom + " " + llista.persones[index].Cognom + "?";
      if (confirm(text) == true) {
        //llavors l'eliminem del array, del html i del localstorage.
        llista.persones.splice(index, 1);
        li.remove();
        llistaJSON = JSON.stringify(llista);
        localStorage.setItem('contactes', llistaJSON);
      }
    });
    //Afegeixo el botó a la fila corresponent.
    obj.appendChild(botoEliminar);

    //Creo el botó de editar 
    var botoEditar = document.createElement("button");
    botoEditar.innerHTML = "Editar";
    //Li fico la instrucció addEventListener per a que quan el cliquis faci la funció que indica
    botoEditar.addEventListener('click', function (event) {
      //creem la variable per identificar el botó i li canviem el seu valor html
      var boto = document.getElementById('sboto');
      boto.innerHTML = "Modificar";

      //Amb el event.target.parentElement indico quin <li> es al que pertany el botó que ha activat l'event.
      var li = event.target.parentElement;

      //Creo el array de elements html <li>  
      var array = Array.from(objUL.children);
      //I creo una variable on indico quin es el index de aquell element html
      var index = array.indexOf(li);

      //dins dels inputs fico les dades de l'element seleccionat
      document.getElementById("sNom").value = llista.persones[index].Nom;
      document.getElementById('sCognom').value = llista.persones[index].Cognom;
      document.getElementById('sTelefon').value = llista.persones[index].Telefon;
      document.getElementById('sAdresa').value = llista.persones[index].Adresa;
      document.getElementById('sLocalitat').value = llista.persones[index].Localitat;

      //Faig que quan es torni a polsar el botó d'afegir ja no faci al funció afegir sino la modificar.
      boto.onclick = function onclick() {
        modificar(index, boto)
      };

    });
    //Afegeixo el botó a la fila.
    obj.appendChild(botoEditar);

    //Afegeixo la fila a la llista
    objUL.appendChild(obj);
  }
  //Afegeixo la llista al div.
  objLlista.appendChild(objUL);
}

//Aquesta funció es la que s'executa quan es polsa el botó afegir.
function afegir() {
  //es guarda l'objecte que introdueix el usuari
  if (Obj !== null) {
    var Obj = {
      Nom: document.getElementById('sNom').value,
      Cognom: document.getElementById('sCognom').value,
      Telefon: document.getElementById('sTelefon').value,
      Adresa: document.getElementById('sAdresa').value,
      Localitat: document.getElementById('sLocalitat').value,
    };

    //es fica en el ultim element de la llista
    llista.persones[llista.persones.length] = Obj;
    
    //Es netegen els nputs
    document.getElementById('sNom').value = '';
    document.getElementById('sCognom').value = '';
    document.getElementById('sTelefon').value = '';
    document.getElementById('sAdresa').value = '';
    document.getElementById('sLocalitat').value = '';

    //passo la nova llista a JSON i el pujo al LocalStorage
    llistaJSON = JSON.stringify(llista);
    localStorage.setItem('contactes', llistaJSON);
    //Llavors crido a la funció que m'ho imprimirà al HTML, passant per paràmetre el que s'ha de imprimir.
    renderitzarLlista();
  } else {
    alert("Has de introduir un contacte i punto!");
  }
}
//Aquesta es la funció que només s'activa amb el botó editar.
function modificar(index, boto) {
  var Obj = {
    Nom: document.getElementById('sNom').value,
    Cognom: document.getElementById('sCognom').value,
    Telefon: document.getElementById('sTelefon').value,
    Adresa: document.getElementById('sAdresa').value,
    Localitat: document.getElementById('sLocalitat').value,
  };
//La unica diferencia amb la funció afegir es que aqui ho canvio per un element que ja existia en comptes de crear-lo.
  llista.persones.splice(index, 1, Obj);

  //Ho guardo al LocalStorage
  llistaJSON = JSON.stringify(llista);
  localStorage.setItem('contactes', llistaJSON);
  //Es netegen els inputs
  document.getElementById('sNom').value = '';
  document.getElementById('sCognom').value = '';
  document.getElementById('sTelefon').value = '';
  document.getElementById('sAdresa').value = '';
  document.getElementById('sLocalitat').value = '';

  //Torno a canviar el nom del botó
  boto.innerHTML = "Afegir";
  // I torno a canviar la seva funció al fer click.
  boto.onclick = function onclick() {
    afegir()
  };
  //Torno a carregar la llista perquè en la primera impresió es quan em surt bé.
  renderitzarLlista();
}
//Funcionalitat de cercar per nom
function cercadorNoms() {
  //Identifiquem el valor que s'introdueix al input i tot el que es fiqui el posem en majúscules per a que sigui més facil de detectar.
  var input = document.getElementById("sCercador");
  filter = input.value.toUpperCase();
  //Creem un for per a que iteri sobre totes les files.
  for (i = 0; i < llista.persones.length; i++) {
    var li = document.getElementById('llistaCompra').getElementsByTagName('li')[i];
    //En aquesta variable guardem el nom de la llista que esta iterant
    var txtValue = llista.persones[i].Nom;

    //Aqui es comprova si apareix en el valor en el index. Si no apareix el toUpperCase retornara un -1.
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  }
}

function cercadorLocalitat() {
  input = document.getElementById("sCercador");
  filter = input.value.toUpperCase();
  for (i = 0; i < llista.persones.length; i++) {
    var li = document.getElementById('llistaCompra').getElementsByTagName('li')[i];

    //L'unica diferencia amb la de cercar per nom es aquesta linia. Canvia el valor del text que evalua per el de Localitat.
    var txtValue = llista.persones[i].Localitat;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  }
}
//Aquesta funció es la que salta quan es selecciona una de les opcions del seleccionador
function funciocercadora() {
  var opcio_check = document.getElementById("sSeleccionador").value;
  var input = document.getElementById("sCercador");
  //Quan l'opció es 1 l'input te la funcionalitat de cercar pel nom
  if (opcio_check == "1") {
    input.onkeyup = cercadorNoms;
  //Quan l'opció es 2 l'input te la funcionalitat de cercar per Localitat.  
  } else if (opcio_check == "2") {
    input.onkeyup = cercadorLocalitat;
  }
}
