function citymodel(name){
	this.name = name;			//上海	
	//接通率
	this.throughrate = 0; 		
	this.servicelevel = 0;  	//服务级别
	this.totalincallnum = 0;	//每日累计人工呼入量
	this.totalcustomer = 0; 	//客服工作人数
	this.totalonduty = 0;		//当前值班人数
	this.quenewaitnum = 0; 		//队列等待通数
	this.maxwaittime = 0;		//最长等候时间
}

exports.citymodel = citymodel;