(function(){

	//para subida de archivos
	var uploades=document.getElementById('uploader');
	var fileButton=document.getElementById('fileButton');
	var namefile=document.getElementById('namearchive');

	fileButton.addEventListener('change',function(e){
		var files=e.target.files;
		//si se seleccionan varios archivos capturar cada uno y subirlo
		for(var i=0;i< files.length ;i++){
			var file=e.target.files[i];
			namefile.innerText="Subiendo "+ file.name;
			//crear el storage en firebase
			var storageRef=firebase.storage().ref('revistaposadas/'+file.name);

			//subir el archivo
			var task=storageRef.put(file);

			task.on('state_changed',
				function progress(snapshot){
					var percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
					uploader.value=percentage;
				},
				function error(err){
					namefile.innerText="Error al subir";
					return false;
				},
				function complete(){
					//muestro el archivo a subir
					
					//capturo las imagenes
					var storage = firebase.storage();

					$scope.getImgUrl = function(file) {
        				storage.child("revistaposadas/").getDownloadURL().then(function(url) {
          				namefile.innerText=file.name +" ok "+ url;
        			}).catch(function(error) {
          // Handle any errors here
        });
 }

					namefile.innerText="Archivos subidos" + JSON.stringify(storageRef.getDownloadURL(),null,3);
				}
			)
		}
		

	});
} ());