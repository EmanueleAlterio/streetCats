class Comment{
    constructor({ id, testo, data_pubblicazione, id_utente, id_gatto }) {
        this.id = id;
        this.testo = testo;
        this.data_pubblicazione = data_pubblicazione;
        this.id_utente = id_utente;
        this.id_gatto = id_gatto;
    }
}

module.exports = Comment