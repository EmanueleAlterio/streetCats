class Cats {
    constructor(data = {}) {
        const {id, titolo, descrizione, data_inserimento, foto_url, latitudine, longitudine, id_utente} = data;

        this.id = id;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.dataInserimento = data_inserimento;
        this.fotoUrl = foto_url;
        this.latitudine = latitudine;
        this.longitudine = longitudine;
        this.idUtente = id_utente;
    }
}

module.exports = Cats;
