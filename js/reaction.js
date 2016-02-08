var cations = [["NH4",1],["H3O",1],["Hg2",2],["NO2",1],["Hg",2],["K",1],["Ag",1],["Na",1],["Sr",2],["Sn",2],["Sn",4],["Zn",2],["Mn",2],["Mn",3],["Mg",2],["Pb",2],["Li",1],["H",1],["Ba",2],["Ca",2],["Cr",2],["Cr",3],["Cu",1],["Cu",2],["Fe",2],["Fe",3],["Al",3]];


	var anions = [["NO3",-1],["NO2",-1],["Cl04",-1],["ClO3",-1],["ClO2",-1],["CN",-1],["OCl",-1],["OCN",-1],["IO3",-1],["SCN",-1],["BrO3",-1],["OH",-1],["OBr",-1],["NH2",-1],["MnO4",-1],["CH3COO",-1],["H2PO4",-1],["HCOO",-1],["HSO4",-1],["HCO3",-1],["HPO4",-2],["CrO4",-2],["SO4",-2],["Cr2O7",-2],["S2O3",-2],["CO3",-2],["C2O4",-2],["O2",-2],["AsO4",-3],["PO4",-3],["AsO3",-3],["H",-1],["F",-1],["Cl",-1],["Br",-1],["I",-1],["O",-2],["S",-2],["S",-2]];
$(document).ready(function() {	
	$('#reactionpredictor > input').keydown(function(event) {
		if(event.which == 13) {
			predictProduct($('#reactionpredictor #reactionInput').val());
		}
	});
});

//direct combo --> A + B

	function predictProduct(productList) {
		var equation = productList + " = ";
//		productList = productList.toUpperCase();
		productList = productList.split(" ");
		if(productList.length == 1) {
			//is a decomposition reaction
			for(var i = 0; i<cations.length; i++) {
				if(productList[0].indexOf(cations[i][0])!= -1) {
					equation += cations[i][0];
					break;
				}
				if(productList[0].indexOf(cations[i][0] + cations[i][1])!= -1) {
					equation += cations[i][0];
					break;
				}
			}
			for(var i = 0; i<anions.length; i++) {
				if(productList[0].indexOf(anions[i][0]) != -1) {
					equation += " + " + anions[i][0];
					break;
				}
			}
 		} else if(productList.length==3) {
			for(var i = 0; i<cations.length; i++) {
				if(productList[0] == cations[i][0]) {
					equation += cations[i][0];
					break;
				} else if(productList[2] == cations[i][0]) {
					equation +=cations[i][0];
					break;
				}
 			}
			for(var i = 0; i<anions.length; i++) {
				if(productList[0] == anions[i][0]) {
					equation += anions[i][0];
					break;
				} else if (productList[2] == anions[i][0]) {
					equation += anions[i][0];
					break;
				}
 			}
 			for(var i = 0; i<productList.length; i++) {
 				var comp;
 				var sing;
 				for (var k = 0; k < cations.length; k++) {
 					if(productList[i].indexOf(cations[k][0]) != -1 && productList[i]!=cations[k][0]) {
 						//console.log(cations[k][0]);
 						comp = productList[0];
 						if(productList[i].indexOf(anions[k][0]) != -1 && productList[i]!=anions[k][0]) {
 							sing += anions[k][0];
							equation += doubleReplacement(sing, comp);
							break;
						} 		
						sing = productList[2];
						//console.log(sing);
//						console.log('s');
						//console.log(comp);
						equation += singleReplacement(comp,sing);					
						break;
					} else if(productList[i].indexOf(anions[k][0]) != -1 && productList[i]!=anions[k][0]) {
						console.log('r');
						sing = anions[k][0];
						equation += singleReplacement(comp,sing);
						break;
					}
 				} 		
 			}
 		}
 		//alert(equation);
 		$('#reactionpredictor #realTxt').text(equation);
	}

		function singleReplacement(compound, single) {
			var cation = "";
			var anion = "";
			var third = single;
			var isCation = false;

			for(var i = 0; i<anions.length; i++) {
				//console.log("hi");
				anion = anions[i][0];
				if(compound.indexOf(anion) != -1) {
					if(anion != compound.substring(compound.indexOf(anion))) {
						cation += compound.substring(compound.indexOf(anion) + anion.length);
						break;
					} else {
						cation += compound.substring(0,compound.indexOf(anion))
						break;
					}
					break;
				}
			}
			for(var i = 0; i<cation.length; i++) {
				if(third==cation[i][0]) {
					isCation = true;
					break;
				}
			}
			var reactantSide = cation + anion + " + " + third;
			var productSide = "";
			var actual;
			//console.log(cation);
			if(isCation == false) {
					actual = {
	                url: 'http://www.chemicalaid.com/tools/equationbalancer.php?equation=' + cation + anion + "%2B" + third + "%3D" +	 cation + third + "%2B" + anion,
                	type: 'html',
                	selector: "div.chemical-formula",
                	extract: 'text'
            	};			
			} else {
					actual = {
	                url: 'http://www.chemicalaid.com/tools/equationbalancer.php?equation=' + cation + anion + "%2B" + third + "%3D" +	 thid + anion + "%2B" + cation,
                	type: 'html',
                	selector: 'div::before',
                	extract: 'text'
            	};			
        	}

			//console.log(single);
			//console.log(compound);
			//console.log(third);
 			//console.log(cation);

            var gdata = "";

            var query = actual ,
            uriQuery = encodeURIComponent(JSON.stringify(query)),
            request  = 'http://example.noodlejs.com/?q=' +
                     uriQuery + '&callback=?';

//            window.open(query.url);
            console.log("uriQuery:" + uriQuery);
            // Make Ajax request to Noodle server
            jQuery.getJSON(request, function (data) {
                gdata = data[0].results;
                //confirm(data[0].results[0]);
                //window.open("http://" + data[0].results[0]);                
                //alert(gdata);
                $('#reactionpredictor #realTxt').text(gdata);
            }); 
		}

		function doubleReplacement(compound1,compound2) {
			var anion1, anion2, cation1,cation2;
			for(var i = 0; i<anions.length; i++) {
				//console.log("hi");
				anion1 = anions[i][0];
				if(compound1.indexOf(anion1) != -1) {
					if(anion1 != compound1.substring(compound1.indexOf(anion1))) {
						cation1 += compound1.substring(compound1.indexOf(anion1) + anion1.length);
						break;
					} else {
						cation1 += compound1.substring(0,compound1.indexOf(anion1))
						break;
					}
					break;
				}
			}			
			for(var i = 0; i<anions.length; i++) {
				//console.log("hi");
				anion2 = anions[i][0];
				if(compound2.indexOf(anion2) != -2) {
					if(anion2 != compound2.substring(compound2.indexOf(anion2))) {
						cation2 += compound2.substring(compound2.indexOf(anion2) + anion2.length);
						break;
					} else {
						cation2 += compound2.substring(0,compound2.indexOf(anion2))
						break;
					}
					break;
				}
			}
			
			var gdata = "";

            var query = {
            url: 'http://www.chemicalaid.com/tools/equationbalancer.php?equation=' + cation1 + anion1 + "			%2B" + cation2 + anion2 + "%3D" + cation1 + anion2 + "%2B" + cation2 + anion1,
                	type: 'html',
                	selector: "div.chemical-formula",
                	extract: 'text'
            	},
            uriQuery = encodeURIComponent(JSON.stringify(query)),
            request  = 'http://example.noodlejs.com/?q=' +
                     uriQuery + '&callback=?';

            //window.open(query.url);
            //console.log("uriQuery:" + uriQuery);
            // Make Ajax request to Noodle server
            jQuery.getJSON(request, function (data) {
                gdata = data[0].results;
                //confirm(data[0].results[0]);
                //window.open("http://" + data[0].results[0]);                
                //alert(gdata);
                $('#reactionpredictor #realTxt').text(gdata);
            });				
		}