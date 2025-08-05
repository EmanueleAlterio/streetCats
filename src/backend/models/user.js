class User {
	constructor(data = {}) {
		const { id, username, email, password, data_registrazione, foto_profilo} = data;
		this.id = id;
		this.username = username;
		this.email = email;
		this.passwordHash = password;
		this.dataRegistrazione = data_registrazione;
		this.fotoProfilo = foto_profilo;
	}
}

module.exports = User;
