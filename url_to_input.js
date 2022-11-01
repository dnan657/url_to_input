function url_to_input(arr_url=[], el_input_file){
	if(typeof(arr_url) != 'object'){
		arr_url = [arr_url];
	}
	if(arr_url.length == 0){
		return;
	}
	
	let url = arr_url[0];
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		let file_blob = xhr.response;
		let name_file = url.split('/').slice(-1)[0] || 'noname';
		let file = new File([file_blob], name_file, {type:file_blob['type'], lastModified:new Date().getTime()});
		let container = new DataTransfer();
		for(let i_1=0; i_1<el_input_file.files.length; i_1++){
			container.items.add(el_input_file.files[i_1]);
		}
		
		let indx_item = arr_url.indexOf(url);
		while(indx_item > -1){
			container.items.add(file);
			arr_url.splice(indx_item,1);
			indx_item = arr_url.indexOf(url);
		}
		el_input_file.files = container.files;
		
		if(arr_url.length == 0){
			gl_images_load = 2;
		}else{
			url_to_input(arr_url, el_input_file);
		}
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}
