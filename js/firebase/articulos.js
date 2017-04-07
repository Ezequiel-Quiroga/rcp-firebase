(function(){
  	//referencia al objeto
  	const preObject=document.getElementById('revista');
  	const ulList=document.getElementById('art');
  	//referencia al la bd
  	const dbRefObject=firebase.database().ref().child('revistaposadas');
  	const dbRefList=dbRefObject.child('articulos');
	//sincronizo cambios de objeto
  	/*dbRefObject.on('value',snap=> {
  		preObject.innerText=JSON.stringify(snap.val(),null,3);
  	});*/
  	//sincronizarlos cambios en la lista
  	dbRefList.on('child_added',snap=>{
  		const li=document.createElement('li');
  		const data=snap.val();
  		//li.innerText=" Titulo: "+data.titulo + " Numero:" +data.numero;
  		li.innerHTML=data.textofull;
  		li.id=snap.key;
  		ulList.appendChild(li);
  	});
	//si se produce algun cambio lo detecta	
  	dbRefList.on('child_changed',snap=>{
  		const liChanged=document.getElementById(snap.key);
  		liChanged.innerText="";

  		const data=snap.val();
  		liChanged.innerText=" Titulo: "+data.titulo + " Numero:" +data.numero;
  		liChanged.id=snap.key;

  	});

  	//si se produce la eliminacion de un objeto lo detecta	
  	dbRefList.on('child_removed',snap=>{
  		const liRemoved=document.getElementById(snap.key);
  		liRemoved.remove();
  	});
} ());