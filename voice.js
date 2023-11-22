let hearself = false;
let previousID = "";

let audioContext = new (window.AudioContext || window.webkitAudioContext)();

let filter1Frequency = 2910;
let filter1Gain = .1;
let filter1Q = 15;

let filter2Frequency = 1701;
let filter2Gain = .5;
let filter2Q = 15;


let filter1 = audioContext.createBiquadFilter();
filter1.type = "lowpass";
filter1.frequency.value = filter1Frequency;
filter1.gain.value = filter1Gain;
filter1.Q.value = filter1Q;

let filter2 = audioContext.createBiquadFilter();
filter2.type = "highpass";
filter2.frequency.value = filter2Frequency;
filter2.gain.value = filter2Gain;
filter2.Q.value = filter2Q;

let compressor = audioContext.createDynamicsCompressor();
compressor.attack.value = .001


let gainNode = audioContext.createGain();
gainNode.gain.value = currentVolume/1.5;


voice = {
    queuedPackets: [],
    alive : false,
    currentChannel:undefined,
    recorder:undefined,
    _socket:undefined,
    pttDown:false,
    playing:false,
    lastPacket:false,
    onData : function(data) {
        if(!this.pttDown)
        {
            this.lastPacket = false;
        }
        try {
            _socket.emit("vc_packet", data);
        }
        catch(e)
        {
            console.info(e)
        }
    },
    playSinglePacket:function(packet)
    {
        let source = audioContext.createBufferSource();
        source.buffer = packet.buffer;
        source.connect(gainNode)
        gainNode.connect(filter2);
        filter2.connect(filter1)
        // Chains WebAudio nodes together to return processed audio buffer
        filter1.connect(compressor)
        compressor.connect(audioContext.destination)
        source.start();
        setTimeout(()=>{
            if(this.queuedPackets.length>0)
                this.playSinglePacket(this.queuedPackets.shift())
            else
                voice.playing = false;
        },packet.duration*1000)
    },
    init : function(socket)
    {
        try {
            _socket = socket;
            _socket.on('connect_error', function (m) {
                console.info("error");
            });
            setInterval(() => {
                let array = new Array();
                if (voice.playing === false) {
                    for(let i=0; i<= voice.queuedPackets.length - 1; i++){
                        var packet = voice.queuedPackets[i];
                        voice.playSinglePacket(packet)
                        array.push(i);
                    }
                    for(let x = 0; x <= array.length -1; x++){
                        voice.queuedPackets.splice(x, 1);
                    }
                    array.pop();
                }
            }, 500)
            navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                this.recorder = new MediaRecorder(stream, {
                    mimeType: "audio/webm;codecs:vorbis"
                });
                this.recorder.ondataavailable = e => {
                    this.onData(e.data);
                }
            });
            _socket.on('vc_packet', function (id, packet) {
                let i = String(id);
                let p = _socket.id;
                if(hearself){
                    voice.handleVoicePacket(packet);
                }else{
                    if(i.includes(p)){
                        previousID = p;
                    }else{
                        if(!i.includes(previousID)) {
                            voice.handleVoicePacket(packet);
                        }
                    }
                }
            });
        }catch (e) {
            console.info(e.message);
        }
    },
    queuePacketForPlay : function(voicePacket){
        this.queuedPackets.push(voicePacket)
    },
    handleVoicePacket : async function(packet)
    {
        try {
            let result = await audioContext.decodeAudioData(packet);
            voice.queuePacketForPlay({
                buffer:result,
                duration:result.duration
            });

        }
        catch(e)
        {
            console.info(e);
        }
    },
    setPTT : function(pttValue) {
        try {
            this.pttDown = pttValue;
            if (this.pttDown) {
                switch (this.recorder.state) {
                    case "inactive":
                        this.recorder.start();

                    case "recording":
                        // console.info("Already Active recorder");
                }
            }

            if (!this.pttDown) {
                if (this.recorder.state.includes("recording")) {
                    this.recorder.stop();
                }
            }
        } catch (e) {
            console.info(e.message);
        }
    }


}
