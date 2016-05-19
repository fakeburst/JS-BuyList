$(function(){
	var ITEM_TEMPLATE = $(".template").html();
    var LEFT_TEMPLATE = $(".left-template").html();
    
    var $text_field = $("#item-name");
    var $add_button = $(".form-button");
    var $list = $(".item-list");
    var leftList = $("#left");
    var boughtList = $("#bought");
    
    function isBlank(str) {
    	return (!str || /^\s*$/.test(str));
    }

    function addItem(name) {
    	if (isBlank(name)){
    		return;
    	}
        var $node = $(ITEM_TEMPLATE);
        $node.removeClass("hidden");
        var $delete = $node.find(".delete");
        var $title = $node.find(".item-name");
        
        $title.text(name);

        var left = $(LEFT_TEMPLATE);
        left.find(".left-name").text(name + " ");
        var bought = left.clone();
        
        $title.click(function() {
        	var previous = $title.html();
        	$title.html("<input id=\"edit\" placeholder=\"Edit name\"></input>");
        	edit = $("#edit");
        	edit.focus();
        	edit.keypress(function (e) {
				var key = e.which;
				if(key == 13)  // the enter key code
				{
					edit.focusout();    
				}
			});   
        	edit.focusout(function() {
        		if(!isBlank(edit.val())){
        			$title.html(edit.val());
        			left.find(".left-name").text(edit.val());
        		} else {
        			$title.html(previous);
        		}
        	});
        });

        $delete.click(function(){
           	$node.remove();
           	left.remove();
        });

        $node.find(".add").click(function(){
        	var amount = $node.find(".label");
        	var int = parseInt(amount.text()) + 1 + "";
    		amount.text(int);
    		left.find(".left").text(int);
    		$node.find(".rem").removeAttr("disabled").removeClass("disabled");
        });

        $node.find(".rem").click(function(){
        	var amount = $node.find(".label");
        	if(amount.text() != "1"){
        		var int = parseInt(amount.text()) - 1 + "";
    			amount.text(int);
    			left.find(".left").text(int);
    		} else {
    			$node.find(".rem").attr("disabled","disabled").addClass("disabled");
    		}
        });

        $node.find(".buy").click(function(){
        	if($(this).text() == "Buy"){
        		$node.find(".item-amount").addClass("hidden");
        		$title.css("text-decoration", "line-through");
        		$(this).text("Unbuy");
        		$node.find(".delete").addClass("hidden");
        		bought = left.clone();
        		bought.find(".left-name").css("text-decoration", "line-through");
        		bought.find(".left").css("text-decoration", "line-through");
        		boughtList.append(bought);
        		left.remove();
        		console.log("bought");
        	} else {
        		$node.find(".item-amount").removeClass("hidden");
        		$title.css("text-decoration", "");
        		$(this).text("Buy");
        		$node.find(".delete").removeClass("hidden");
        		left.find(".left-name").css("text-decoration", "");
        		bought.find(".left").css("text-decoration", "");
        		leftList.append(left);
        		bought.remove();
        		console.log("unbought");
        	}
        });

        $text_field.val("");
        $text_field.focus();
        leftList.append(left);
        $list.append($node);
        console.log("item added" + $text_field.val());
    }
    
    $add_button.click(function(){
        addItem($text_field.val());
    });

    $text_field.keypress(function (e) {
 		var key = e.which;
 		if(key == 13)  // the enter key code
  		{
  		  	$add_button.click();
    		return false;  
  		}
	});

	addItem("Pomidory");
	addItem("Pechivo");
	addItem("Syr");   
});