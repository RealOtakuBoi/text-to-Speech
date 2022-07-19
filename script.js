

const textArea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector(".speech");

let speeches = speechSynthesis;
let isSpeaking = true;



speechBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(textArea.value !== ''){
        if(!speeches.speaking){
            speakText(textArea.value);
        }

        if(textArea.value.length > 80){
            if(isSpeaking){
                speeches.pause();
                isSpeaking = false;
                speechBtn.innerText = 'Pause';
            }
            else{
                speeches.resume();
                isSpeaking = true;
                speechBtn.innerText = 'Resume';
            }
        }
        
    }
}); 

speeches.addEventListener("voiceschanged",voice);




function speakText(text){
    let speech = new SpeechSynthesisUtterance(text);
    for(let voice of speeches.getVoices()){
        if(voice.name === voiceList.value){
            speech.voice = voice;
        }
    }
    speechSynthesis.speak(speech);
}

function voice(){
    for(let voice of speeches.getVoices()){
        let selected = voice.name === 'Google US English' ? 'selected':'';
        let option = `<option value = "${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML('beforeend',option);
    };
};

