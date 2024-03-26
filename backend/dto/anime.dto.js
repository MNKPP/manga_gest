export class AnimeDto {

    constructor({id, title, studio, genre, image, score, synopsis, trailer}) {
        this.id = id;
        this.title = title;
        this.studio = studio;
        this.genre = genre;
        this.image = image;
        this.score = score;
        this.synopsis = synopsis;
        this.trailer = trailer;
    }
}