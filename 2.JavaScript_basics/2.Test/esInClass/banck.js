var Clients = new Map();
var ClientsS = window.sessionStorage;
var cb = document.forms[0].elements['check'].checked;

function bank(){
    var fm = document.forms[0];
    var str = fm.elements['text_field'].value;
    
    
    if (str.substring(0,3) == "pay")
        Pay(str);
    else if (str.indexOf(';') !== -1){
        addAccount(str);}
    else if(str !== "") {
        addClient(str);
    }

}

// Expected output: The fourth item is free!!
function addClient(str){
    if(cb)  ClientsS.setItem(str,"");
    else{
         Clients.set(str,[]);
    }    
}

function addAccount(str){
    var cl_name = str.substring(0,str.indexOf('\('));
    console.log(cl_name);
    var cl_type = str.substring(str.indexOf('\(')+1,str.indexOf(';'));
    console.log(cl_type);
    var cl_balance = str.substring(str.indexOf(';')+1, str.length-1);
    console.log(cl_balance);

    if(cb){ 
        var client = ClientsS.getItem(cl_name);
        if(cl_type == "usd")
            client = client + `1,${cl_balance}`
        else
            client = client + `2,${cl_balance}`
        ClientsS.setItem(cl_name,client);
    }
    else{
        var client = Clients.get(cl_name);
        client.push([cl_type,cl_balance]);
    } 

    
}

function Pay(str){
    var cl1_name = str.substring(str.indexOf('-')+1,str.indexOf('&'));
    var cl2_name = str.substring(str.indexOf('&')+1,str.indexOf('\('));
    var cl_type = str.substring(str.indexOf('\(')+1,str.indexOf(';'));
    var cl_amount = str.substring(str.indexOf(';')+1, str.length-1);

    if(cb) {
        var client1 = ClientsS.getItem(cl1_name);
        var client2 = ClientsS.getItem(cl2_name);
        client1 = JSON.parse("[" + client1 + "]");
        client2 = JSON.parse("[" + client2 + "]");

        if(cl_type == "usd"){ var ty = 1;}
        else var ty = 2;

        var flag = false;
        for(var i = 0; i < client1.length; i = i+2){

            if (client1[i] == ty) {
                if(cl_amount <= client1[i+1] ){
                    client1[i+1] = client1[i+1] - cl_amount;
                    ClientsS.setItem(cl1_name,`${client1[i+1]}`);
                    flag = true;
                }
                else{
                    window.alert('transaction refused');
                }
            }
         }

        if(flag == true){
            for(i = 0; i < client2.length; i = i+2){
                if (client2[i] == ty) {
                        client2[i+1] = client2[i+1] + cl_amount;
                        ClientsS.setItem(cl2_name,`${client2[i+1]}`);
                    }
            }
        }

    }
    else{
        var client1 = Clients.get(cl1_name);
        var client2 = Clients.get(cl2_name);
        
        var flag = false;
        for(var i = 0; i < client1.length; i++){

            if (client1[i][0] == cl_type) {
                if(cl_amount <= client1[i][1] ){
                    client1[i][1] = client1[i][1] - cl_amount;
                    flag = true;
                }
                else{
                    window.alert('transaction refused');
                }
            }
         }

        if(flag == true){
            for(i = 0; i < client2.length; i++){
                if (client2[i][0] == cl_type) {
                        client2[i][1] = client2[i][1] + cl_amount;
                    }
            }
        }
    }
        
    

}

function logout(str){
    var fm = document.forms[0];
    var str = fm.elements['text_field'].value;
    var cl_name = str.substring(str.indexOf('-')+1,str.length);
    var client = Clients.get(cl_name);
    if(client !== undefined){
        for(var i = 0; i < client.length; i++){
            document.write("Map/Set =>> type: " + client[i][0] + ", balance: " + client[i][1]+"\n");
        }
    }
    client = ClientsS.getItem(cl_name);
    if(client !== null){
        client = JSON.parse("[" + client + "]");
        for(var i = 0; i < client.length; i = i + 2){
            if(client[i] == 1) var ty = "usd";
            else var ty = "eur"
            document.write("Storage =>> type: " + ty + ", balance: " + client[i+1] +"\n"); 
        }
    }
}

//AddClient name = > add to the map (cl,[])
//AddAccount name(type;balance) => add to the value of name [type,balance]
//Payment pay-name1&name2(type;amount) 
//logOut log-name
//usd = 1 ; eur = 2

