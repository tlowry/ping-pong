var GameSite = GameSite || {};

GameSite.saveScore = function(score)
{
    $.ajax({
                url: "http://localhost:8080/GameCorral/resources/Persistence",
                type: "PUT",
                contentType: 'application/xml',
                processData: false,
                data: "<JaxBHashMap><pairs key=\"key2\" value=\"va2l\"/><pairs key=\"key1\" value=\"val1\"/><pairs key=\"key\" value=\"val\"/></JaxBHashMap>",
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    console.log("Error " + errorThrown);
                },
                success: function(data, textStatus, XMLHttpRequest)
                {
                    console.log("Succeeded: " + data);
                }
            });

};

GameSite.getLength = function()
{

}

GameSite.getItem = function(key)
{
    $.ajax({
                url: "http://localhost:8080/GameSite/resources/gameAPI/?score=10",
                type: "GET",
                contentType: 'application/json',
                processData: false,
                data: "The payload",
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    console.log("Error " + errorThrown);
                },
                success: function(data, textStatus, XMLHttpRequest)
                {
                    console.log("Succeeded: " + data);
                }
            });
};

GameSite.setItem = function(key, value)
{
    console.log("Sending" + key + " " + value);
    $.ajax({
                url: "http://localhost:8080/GameCorral/resources/Persistence",
                type: "PUT",
                contentType: "application/xml",
                processData: false,
                data: "<JaxBHashMap><pairs key=\"" + key + "\" value=\"" + value + "\"/></JaxBHashMap>",
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    console.log("Error " + errorThrown);
                },
                success: function(data, textStatus, XMLHttpRequest)
                {
                    console.log("Succeeded: " + data);
                }
            });
};

GameSite.removeItem = function(key)
{

};