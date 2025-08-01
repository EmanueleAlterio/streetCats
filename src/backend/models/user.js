class User {
    constructor({ id, username, email, password_hash, data_registrazione }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = password_hash;
        this.dataRegistrazione = data_registrazione;
    }
}

module.exports = User;
