let Request = require("request");
let config = require('../config/Env');

exports.Add = function (rqUID, ipAddr, channel, sesion, categoria, producto, moduloAplicacion, tipoAccion, data) {
    
    var requestAddAudit = {
        "FechaCreacion": new Date().toISOString(),      
        "IdSesion": rqUID,      
        "IdUsuario": channel,      
        "TipoAccion": tipoAccion,      
        "DescripcionAccion": tipoAccion,      
        "ModuloAplicacion": moduloAplicacion,      
        "IdProducto": producto,      
        "IdCategoria": categoria,      
        "MessageData": data      
      };
    
    Request.post({
        "headers": { 
            "content-type": "application/json",
            "X-RqUID": rqUID,
            "X-IPAddr": ipAddr,
            "X-Channel": channel,
            "X-Sesion": sesion,
            "X-haveToken": true
     },
        "url": "http://" + config.auditHost + ":" +config.auditPort + "/api/actividad/add/",        
        "body": JSON.stringify(requestAddAudit) 
    }, (error, response, body) => {
        if (error) {
            console.log("error: " + error);
        }else{
            console.log("response: " + JSON.stringify(response));
        }        
    });
};