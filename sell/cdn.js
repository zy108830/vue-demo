var SiguoyaQiniu= require('./siguoya-qiniu')
var config=require('./env')
var glob= require("glob")
var sq=new SiguoyaQiniu(config.qiniu.ACCESS_KEY,config.qiniu.SECRET_KEY,'webres')
glob("dist/static/**/*", {nodir:true}, function (er, files) {
    if(!er){
        var file_list=files;
        file_list.forEach(function (value) {
            sq.uploadFile(value,'sgy/'+value)
        });
    }else {
        console.log(er);
    }
});

glob("static/**/*", {nodir:true}, function (er, files) {
    if(!er){
        var file_list=files;
        file_list.forEach(function (value) {
            sq.uploadFile(value,'sgy/'+value)
        });
    }else {
        console.log(er);
    }
});