(function(){
	// Initialize Firebase
  	var config = {
    	apiKey: "AIzaSyDJReM1rt35GyQgo4239ZJIg2nbTGGEAAM",
    	authDomain: "appshp-9462a.firebaseapp.com",
    	databaseURL: "https://appshp-9462a.firebaseio.com",
    	projectId: "appshp-9462a",
    	storageBucket: "appshp-9462a.appspot.com",
    	messagingSenderId: "341376675736"
	};
	firebase.initializeApp(config);

  	//referencia al objeto
  	const preObject=document.getElementById('revistaposadas');
  	const ulList=document.getElementById('articulos');
  	//referencia al la bd
  	const dbRefObject=firebase.database().ref().child('revistaposadas');
  	const dbRefList=dbRefObject.child('articulos');
	//sincronizo cambios de objeto
  	dbRefObject.on('value',snap=> {
  		preObject.innerText=JSON.stringify(snap.val(),null,3);
  	});
  	//sincronizarlos cambios en la lista
  	dbRefList.on('child_added',snap=>{
  		const li=document.createElement('li');
  		li.innerText=snap.val();
  		li.id=snap.key;
  		ulList.appendChild(li);
  	});
	//si se produce algun cambio lo detecta	
  	dbRefList.on('child_changed',snap=>{
  		const liChanged=document.getElementById(snap.key);
  		liChanged.innerText=snap.val();
  	});

  	//si se produce la eliminacion de un objeto lo detecta	
  	dbRefList.on('child_removed',snap=>{
  		const liRemoved=document.getElementById(snap.key);
  		liRemoved.remove();
  	});

} ());