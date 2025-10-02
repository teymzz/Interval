class Interval {

    constructor(){
        this.data = Object.create(null),
        this.id = 0;
    }

    start(func, time) {

        let interval = this;
        interval.id++;
        let currentID = interval.id;

        let obj = {
            id: currentID,
            nativeID: setTimeout(func, time),
            func: func,
            time: time,
            wait: false,
            clear: function () {
                if(!this.nativeID) return false;
                clearTimeout(this.nativeID);
                delete this.nativeID;
            },
            pause: function () {
                if(!this.nativeID) return false;
                this.wait = true;
            },
            resume: function(time) {
               if(!this.nativeID) return false;
               this.wait = false;
               this.recall(time);
            }, 
            recall: function(time) {
               if(!this.nativeID || (this.wait === true)) return false;
               time = time || this.time || 0;
               this.nativeID = setTimeout(func, time);
            },
            onvisible: function(callback){
                if(!this.nativeID) return false;
                document.addEventListener('visibilitychange', function(){ 
                    if(document.visibilityState === 'visible') callback()
                })
            },
            invisible: function(callback){
                if(!this.nativeID) return false;
                document.addEventListener('visibilitychange', function(){ 
                    if(document.visibilityState !== 'visible') callback()
                }) 
            },
            visibility: function(callback){
                if(!this.nativeID) return false;
                document.addEventListener('visibilitychange', function(){ 
                    callback(document.visibilityState === 'visible')
                })
            },
            monitor: function(){
                if(!this.nativeID) return false;
                let interval = this;
                document.addEventListener('visibilitychange', function(){ 
                    if(document.visibilityState === 'visible'){
                        interval.resume();
                    }else{
                        interval.pause();
                    }
                })
            },
        } 

        interval.data[currentID] = obj;
        return obj;

    }

}