var valore = document.getElementById("counter").value;

class Decrementor extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }

    get count() {
        return this.getAttribute("count");
    }

    set count(val){
        this.setAttribute("count", val);
    }

    static get observedAttributes(){
        return["count"];
    }

    observer(){ this.count = valore;}

    attributeChangedCallback(prop, oldVal, newVal){
        if (prop === "count"){
            this.render();
        }
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadow.innerHTML = 
        `<spam>${this.count}</spam>`;

    }
}

customElements.define("my-decr", Decrementor);

let intervalId;

if(!intervalId){
    intervalId = setInterval(dec, 1000);
 }

function dec(){
    if (valore != 0){
        valore  = (valore-1);
        if (valore == 0){
            document.getElementById("counter").value = 0;
        }
        var elements = document.getElementsByTagName("my-decr");
            for(var i=0 ; i<elements.length ; i++){
                elements[i].observer();
            }
        
    } 
    else{  
            console.log("nothing");
            valore = document.getElementById("counter").value;
             
    }
}