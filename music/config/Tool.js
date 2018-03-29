class Tool {
	static get_local_ip() {
		const os = require('os')
		let netdev_list = os.networkInterfaces();
		for (let netdev in netdev_list) {
			let net_list = netdev_list[netdev];
			for (let i = 0; i < net_list.length; i++) {
				if (net_list[i].family != 'IPv6' && !net_list[i].internal) {
					return net_list[i].address;
				}
			}
		}
	}
}

module.exports = Tool