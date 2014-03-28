jQuery.fn.extend(
{
	deserializeJSON : function(json){
		var parseObjectIntoNameValuePairs =function(object,root){
			if(!root) root = "";
			if(_.isString(object) || _.isNumber(object))//Literal in array
			{
				var v = {};
				path = root;
				v[path] = object;
				return v;
			}
			var results = _.map(object, function(val,key){
				if(_.isString(val) || _.isNumber(val))//Literal
				{
					var v = {};
					if(root != "")
						path = root + "[" + key + "]";
					else
						path = key;
					v[path] = val;
					return v;
				}
				else if(_.isArray(val))//Array
				{
					return _.map(val, function(v,k)
					{
						var path;
						if(root == "")
							path = key + "[" + k + "]";
						else
							path = key;
						return parseObjectIntoNameValuePairs(v,path);
					});
				}
				else if(_.isObject(val))//Object
				{
					var path;
					if(root != "")
						path = root + "[" + key + "]";
					else
						path = key;
					return parseObjectIntoNameValuePairs(val,path);
				}
				else//We don't care about it
				{
					return undefined;
				}
			});
			//remove heirarchy and compactify
			return _.flatten(_.filter(results, function(val){return val != undefined}));
		};
		var valuePairs = parseObjectIntoNameValuePairs(json);
		_.each(valuePairs, function(val){
			var vK = _.first(_.keys(val));
			$('[name="'+vK+'"]').val(val[vK]);
		});
	}
});