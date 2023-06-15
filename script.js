//comprobamos si el navegador soporta la File API y Filereader
if(window.File && window.FileReader && window.FileList && window.Blob) {
    function handleFileSelect(evt) {
        let file = evt.target.files[0];

        if (file.type.match('video.*')) {
            
        

            let reader = new FileReader();

            window.alert('Cargando...');

            reader.onload = (function (theFile) {
                return function (e) {
                    let videoDiv = document.getElementsByClassName('video-container');

                    if(videoDiv[0] != null) {
                        videoDiv[0].parentNode.removeChild(videoDiv[0]);
                    }
                        
                    let div = document.createElement('div');
                    div.id = "video-div";
                    div.className = "video-container";
                    div.innerHTML = '<video controls id="video" class="thumb" src="' + e.target.result + '" title="'+ theFile.name + '"/>';

                    document.getElementById('video-output').insertBefore(div, null);

                    let playButton = document.getElementById('play');
                    let pauseButton = document.getElementById('pause');
                    let volumeUp = document.getElementById('up');
                    let volumeDown = document.getElementById('down');
                    
                    playButton.addEventListener('click', () => {
                        document.getElementById('video').play();
                    });
                    
                    pauseButton.addEventListener('click', () => {
                        document.getElementById('video').pause();
                    })

                    volumeUp.addEventListener('click', () => {
                        document.getElementById('video').volume += 0.1;
                    })

                    volumeDown.addEventListener('click', () => {
                        document.getElementById('video').volume -= 0.1;
                    })

                    document.getElementById('video').addEventListener('canplay', () => {

                        document.getElementById('video').style.visibility = "visible";

                        playButton.style.visibility = "visible";
                        pauseButton.style.visibility = "visible";
                        volumeUp.style.visibility = "visible";
                        volumeDown.style.visibility = "visible"; 
                    });
                }
            }) (file);

            reader.readAsDataURL(file);
        } else {
            window.alert('Debes seleccionar un archivo de formato vídeo');
        }
    } 

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {
    alert('File APIs no están soportadas por este navegador.')
}