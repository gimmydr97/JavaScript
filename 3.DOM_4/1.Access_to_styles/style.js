function AddStyle(){
    var header = document.getElementById( "header");
    header.style.border = "4px solid";
    header.style.borderColor = "#A8A8A8";
    header.style.textAlign = "center";
    header.style.width = "100%";
    header.style.backgroundColor ="#EFF";

    var footer1 = document.getElementById( "footer1");
    footer1.style.textAlign = "center";
	footer1.style.fontWeight ="bold";
	footer1.style.border = "4px solid";
 	footer1.style.borderColor = "#000";

     var footer2 = document.getElementById( "footer2");
    footer2.style.textAlign = "center";
	footer2.style.fontWeight ="bold";
	footer2.style.border = "4px solid";
 	footer2.style.borderColor = "#000";


    var aside = document.getElementById( "aside");
    aside.style.float = 'right';
    aside.style.width = "50%";
    aside.style.border ="1px solid";
    aside.style.borderColor = "#A8A8A8";
    aside.style.paddingLeft = "5px";
    aside.style.backgroundColor ="#EFF";

    var main = document.getElementById( "main");
    main.style.width ="30%";
	main.style.height = "100%";
	main.style.border = "1px solid";
	main.style.borderColor = "#A8A8A8";
	main.style.padding = "5px 10px 5px 10px";
    main.style.backgroundColor ="#EFF";

    var nav = document.getElementById( "nav");
    nav.style.marginLeft = "25px";
	nav.style.marginRight = "25px";
	nav.style.border = "5px solid";
 	nav.style.borderColor = "#000";
	nav.style.textAlign = "center";

    var ul = document.getElementById( "ul");
    ul.style.listStyle = "none";
	ul.style.marginLeft = "auto";
	ul.style.marginRight = "auto";

    var li1 = document.getElementById( "li1");
    li1.style.display = "inline";
	li1.style.textDecoration = "none";

    var li2 = document.getElementById( "li2");
    li2.style.display = "inline";
	li2.style.textDecoration = "none";

    var pre = document.getElementById( "pre");
    pre.style.whiteSpace = "pre-line";
    pre.style.wordWrap ="break-word";
    pre.style.fontSize ="1em";
    pre.style.fontFamily = "Cambria, Hoefler Text, Liberation Serif, Times, Times New Roman, serif";
    pre.style.marginLeft = "20%";

}

function DeleteStyle(){
    var header = document.getElementById( "header");
    header.style.border = "";
    header.style.borderColor = "";
    header.style.textAlign = "";
    header.style.width = "";
    header.style.backgroundColor ="";

    var footer1 = document.getElementById( "footer1");
    footer1.style.textAlign = "";
	footer1.style.fontWeight ="";
	footer1.style.border = "";
 	footer1.style.borderColor = "";

     var footer2 = document.getElementById( "footer2");
    footer2.style.textAlign = "";
	footer2.style.fontWeight ="";
	footer2.style.border = "";
 	footer2.style.borderColor = "";


    var aside = document.getElementById( "aside");
    aside.style.float = '';
    aside.style.width = "";
    aside.style.border ="";
    aside.style.borderColor = "";
    aside.style.paddingLeft = "";
    aside.style.backgroundColor ="";

    var main = document.getElementById( "main");
    main.style.width ="";
	main.style.height = "";
	main.style.border = "";
	main.style.borderColor = "";
	main.style.padding = "";
    main.style.backgroundColor ="";

    var nav = document.getElementById( "nav");
    nav.style.marginLeft = "";
	nav.style.marginRight = "";
	nav.style.border = "";
 	nav.style.borderColor = "";
	nav.style.textAlign = "";

    var ul = document.getElementById( "ul");
    ul.style.listStyle = "";
	ul.style.marginLeft = "";
	ul.style.marginRight = "";

    var li1 = document.getElementById( "l1");
    li1.style.display = "";
	li1.style.textDecoration = "";

    var li2 = document.getElementById( "l2");
    li2.style.display = "";
	li2.style.textDecoration = "";

    var pre = document.getElementById( "pre");
    pre.style.whiteSpace = "";
    pre.style.wordWrap ="";
    pre.style.fontSize ="";
    pre.style.fontFamily = "";
    pre.style.marginLeft = "";

}
